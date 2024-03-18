$(document).ready(function () {

    // muestra el menu hambruguesa y quita scroll
    $("header>nav#menu-navegacion-movil>ul>li#icono-hamburguesa").on("click", function () {
        $("header>nav#menu-desplegable").stop().slideDown().css({ display: "flex", "flex-direction": "column" })
        $("header>nav#menu-desplegable picture").stop().slideDown().css({ display: "flex", "align-self": "center", "justify-self": "center" })
        $('body').css('overflow-y', 'hidden');
    })

    // cierra el menu cuando se le da a la X y pone el scroll
    $("header>nav#menu-desplegable picture").on("click", function () {
        $("header>nav#menu-desplegable").stop().slideUp();
        $('body').css('overflow-y', 'auto');
    });

  
    // cuando se redimensiona, se cierra el menu
    $(window).resize(function () {
        $("header>nav#menu-desplegable").slideUp()
        $('body').css('overflow-y', 'auto');
    })

    // slider
    $('.bxslider').bxSlider({
        infiniteLoop: true,
        hideControlOnEnd: true,
        slideWidth: 400,
        minSlides: 2,
        maxSlides: 2,
    });
})