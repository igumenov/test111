$(document).ready(function(){

    var screenWidth = $(window).width();

    if(screenWidth >= 768){
        var fontMpl = 1280 / 14,
            fontEm = screenWidth / fontMpl;
        $(".body").css({"font-size": +fontEm+"px"});
    };
    if(screenWidth < 768){
    };
    function toggleMenu(){
        $(".menu-btn").toggleClass("active");
        $(".menu").toggleClass("active");
        $(".menu-block").toggleClass("active");
        $(".section_main").toggleClass("active");
    };

    $(".menu-btn").click(function(){
        toggleMenu();
    });

    $(document).mouseup(function(e){
        var btn = $(".menu-block");
        if(btn.hasClass("active")) {
            if (!btn.is(e.target) && btn.has(e.target).length === 0){
                // btn.removeClass("active");
                toggleMenu();
            };
        };
    });

    $(".js-slider").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        loop: true,
    });
    $(".log-slider").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        loop: true,
        // autoWidth: true,
    });

    if($('#map').length>0){

        var mymap = L.map('map',{ zoomControl: true, dragging: true }).setView([40.349819, 27.970954], 16); 

        var greenIcon = L.icon({
            iconUrl: './img/style/map-marker.png',

            iconSize:     [59, 74], // size of the icon
            iconAnchor:   [28, 74], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        L.tileLayer('https://maps.omniscale.net/v2/{id}/style.grayscale/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '',
            id: 'mapchemiola-0c927add',

        }).addTo(mymap);
        mymap.scrollWheelZoom.disable();

        L.marker([40.349819, 27.970954], {icon: greenIcon}).addTo(mymap);
        new L.Control.Zoom({ position: 'bottomright' }).addTo(mymap);


        // L.marker([40.349819, 27.970954]).addTo(mymap);

    }


});

$(window).resize(function() {
    var screenWidth = $(window).width();

    if(screenWidth >= 768){
        var fontMpl = 1280 / 14,
            fontEm = screenWidth / fontMpl;
        $(".body").css({"font-size": +fontEm+"px"});
    };
    if(screenWidth < 768){
    };
});
