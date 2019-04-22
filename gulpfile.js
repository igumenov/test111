'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  svgsprite = require('gulp-svg-sprite'),
  concat = require('gulp-concat'),
  gcmq = require('gulp-group-css-media-queries'),
  browserSync = require('browser-sync'),
  sassGlob = require('gulp-sass-glob'),
  htmlPartial = require('gulp-html-partial'),
  fileinclude = require('gulp-file-include'),
  wait = require('gulp-wait');

var path = {
  src: {
    html: './_source/*.html',
    htmlpartial: './_source/html/',
    js: './_source/js/**/*.js',
    style: './_source/css/**/*\.scss',
    css: './_source/css/**/*\.css',
    img: './_source/img/**/*.*',
    svg: './_source/svg/**/*\.svg',
    font: './_source/font/**/*\.*',
    module: './_source/module/**/*.*',
    favicon: './_source/favicon/*.*'
  },
  build: {
    html: './_assets/',
    js: './_assets/js/',
    style: './_assets/css/',
    css: './_assets/css/',
    img: './_assets/img/',
    svg: './_assets/svg/',
    font: './_assets/font/',
    module: './_assets/module/',
    favicon: './_assets/favicon/'
  }
};

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: '_assets'
    },
    notify: false
  });
});

gulp.task('js:work:build', function () {
  return gulp.src(path.src.js)
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest(path.build.js));
});
gulp.task('js:build', function () {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style)
    .pipe(sassGlob())
    .pipe(wait(500))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(prefixer({ browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'], cascade: false }))
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(gulp.dest(path.build.style));
});

gulp.task('css:build', function () {
  return gulp.src(path.src.css)
    .pipe(prefixer({ browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'], cascade: false }))
    .pipe(cssnano())
    .pipe(gulp.dest(path.build.css));
});


gulp.task('img:build', function () {
  return gulp.src(path.src.img)
    //.pipe(imagemin())
    .pipe(rename(function (path) {
      path.extname = (path.extname + "").toLowerCase();
    }))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('img:work:build', function () {
  return gulp.src(path.src.img)
    .pipe(rename(function (path) {
      path.extname = (path.extname + "").toLowerCase();
    }))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('svg:build', function () {
  return gulp.src(path.src.svg)
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgsprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(path.build.svg));
});

gulp.task('font:build', function () {
  return gulp.src(path.src.font)
    .pipe(gulp.dest(path.build.font));
});

gulp.task('module:build', function () {
  return gulp.src(path.src.module)
    .pipe(gulp.dest(path.build.module));
});

gulp.task('favicon:build', function () {
  return gulp.src(path.src.favicon)
    .pipe(gulp.dest(path.build.favicon));
});

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(htmlPartial({
        basePath: path.src.htmlpartial,
        tagName: 'partial',
        variablePrefix: '@@'
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.build.html));
});


gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'css:build',
  'img:build',
  'svg:build',
  'font:build',
  'module:build',
  'favicon:build'
]);

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch([path.src.html], function () {
    gulp.start(browserSync.reload);
  });
  gulp.watch([path.src.js], function () {
    gulp.start('js:work:build', browserSync.reload);
  });
  gulp.watch([path.src.style], function () {
    gulp.start('style:build', browserSync.reload);
  });
  gulp.watch([path.src.css], function () {
    gulp.start('css:build', browserSync.reload);
  });
  gulp.watch([path.src.img], function () {
    gulp.start('img:work:build', browserSync.reload);
  });
  gulp.watch([path.src.svg], function () {
    gulp.start('svg:build', browserSync.reload);
  });
  gulp.watch([path.src.font], function () {
    gulp.start('font:build', browserSync.reload);
  });
  gulp.watch([path.src.module], function () {
    gulp.start('module:build', browserSync.reload);
  });
});

gulp.task('default', ['build', 'watch']);