$(document).ready(function(){
    $(" h2 > img").on("click",function(){
        if($("nav.menu-mi-cuenta , div.transparente").css("display") == "none"){
            console.log("entra")
            $("nav.menu-mi-cuenta").slideDown()
            $(" div.transparente").toggle()
        }else{
            $("nav.menu-mi-cuenta").slideUp()
            $(" div.transparente").toggle()
        }
       
    })

    $("div.transparente").on("click",function(){
        $("nav.menu-mi-cuenta").slideDown()
        $(" div.transparente").toggle()
    })
    
})