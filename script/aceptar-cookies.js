$(document).ready(function(){
    $("body").css("overflow-y","hidden")

    $("div#politica-cookies").fadeIn(1000).css("display","flex")

    $("div#politica-cookies div#botones-cookies button").on("click",function(){
        $("div#politica-cookies").fadeOut(1000)
        $("body").css("overflow-y","auto")
    })
})