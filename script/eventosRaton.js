$(document).ready(function () {

    // muestra el menu hambruguesa y quita scroll
    $("header>nav#menu-navegacion-movil>ul>li#icono-hamburguesa").on("click", function () {
        $("header>nav#menu-desplegable").css({ display: "flex", "flex-direction": "column" })
        $("header>nav#menu-desplegable img").css({ display: "flex", "align-self": "", "justify-self": "center" })
        $('*').css('overflow-y', 'hidden');
    })
    
    // cierra el menu cuando se le da a la X y pone el scroll
    $("header>nav#menu-desplegable img").on("click", function () {
        $("header>nav#menu-desplegable").toggle();
        $('*').css('overflow-y', 'auto');
    });


    // cuando se redimensiona, se cierra el menu
    $(window).on("resize", function () {
        $("header>nav#menu-desplegable").css({
            "display": "none",
        })
    })

})