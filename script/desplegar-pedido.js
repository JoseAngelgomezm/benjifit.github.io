$(document).ready(function(){
    $("article > img").on("click",function(){

        if($(this).siblings("div").children("div:nth-child(3)").css("display") == "none"){
            $("article div div:nth-child(3), div:nth-child(4)").slideUp()
            $(this).siblings("div").children("div:nth-child(3), div:nth-child(4)").slideDown()
            
        }else{
            $(this).siblings("div").children("div:nth-child(3), div:nth-child(4)").slideUp()
        }
        
    })
})