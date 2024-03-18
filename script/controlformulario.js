$(document).ready(function(){
    $("input.requerido").blur(function(){
        let valor = $(this).val()
        if(valor.length == 0){
            $(this).next("span").css("visibility","visible")
        }else if(valor.length > 0){
            $(this).next("span").css("visibility","hidden")
        }
    })
})