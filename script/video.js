// cuando la ventana se termine de cargar, empezar a obtener cada una de las propiedades
// para evitar que obtengamos el video antes de que este cargado en el html
window.addEventListener("load", function (event) {
    const video = document.getElementById("videoHTML")
    // cargar el video previamente para que podamos acceder a los tiempos y iniciarlos
    video.preload = true
    const TIEMPOSKIP = 5 // tiempo que avanza o retrasa al darle al boton atras o alante

    // obtener todos los botones
    const botonBackWard = document.getElementById("backward")
    const botonPlay = document.getElementById("play-pause")
    const botonStop = document.getElementById("stop")
    const botonForward = document.getElementById("forward")
    const botonMute = document.getElementById("mute-unmute")
    const barraProgreso = document.getElementById("barra-progreso")
    const controlVolumen = document.getElementById("barra-volumen")
    const textoTiempoTotal = document.getElementById("tiempo-total")
    const textoTiempoActual = document.getElementById("tiempo-actual")
    const botonFullscreen = document.getElementById("fullscreen")
    const botonVelocidad1 = document.getElementById("velocity-1")
    const botonVelocidad15 = document.getElementById("velocity-15")
    const botonVelocidad2 = document.getElementById("velocity-2")

    // asignar a la barra progreso el maximo de lo que dura la video
    barraProgreso.setAttribute("max", video.duration)

    // obtener el tiempo formateado del video
    // Obtener el tiempo actual en segundos
    let timepoTotal = video.duration;

    // Calcular minutos y segundos
    minutos = Math.floor(timepoTotal / 60)
    let segundos = Math.floor(timepoTotal % 60)

    // Asegurarse de que los minutos y los segundos tengan dos dígitos
    minutos = (minutos < 10) ? "0" + minutos : minutos
    segundos = (segundos < 10) ? "0" + segundos : segundos

    // Crear la cadena formateada
    let timepoTotalFormateado = minutos + ":" + segundos

    // asignar el tiempo al div de tiempo maximo
    textoTiempoTotal.innerHTML = timepoTotalFormateado


    // cuando cambie el tiempo del video, modificar la barra de progreso
    video.addEventListener("timeupdate", function (event) {
        // asignar a la barra de progreso el valor del video
        barraProgreso.value = video.currentTime

        // formatear el texto del tiempo actual
        // Obtener el tiempo actual en segundos
        let tiempoActual = video.currentTime;

        // Calcular minutos y segundos
        minutos = Math.floor(tiempoActual / 60)
        let segundos = Math.floor(tiempoActual % 60)

        // Asegurarse de que los minutos y los segundos tengan dos dígitos
        minutos = (minutos < 10) ? "0" + minutos : minutos
        segundos = (segundos < 10) ? "0" + segundos : segundos

        // Crear la cadena formateada
        let tiempoActualFormateado = minutos + ":" + segundos

        // asignar el tiempo al div de tiempo actual
        textoTiempoActual.innerHTML = tiempoActualFormateado + " / "
    })

    // cuando el video ha terminado
    video.addEventListener("ended", function () {
        // cambiar el path del svg y poner video a 0
        document.getElementById("svgPlay").innerHTML = '<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="m9 17 8-5-8-5z"/>'
        video.currentTime = 0
    })

    // cuando la barra de progreso cambia por el click del usuario
    barraProgreso.addEventListener("input", function () {
        // el video tiene el tiempo de la barra de progreso
        video.currentTime = barraProgreso.value
    })

    // cuando la barra de progreso cambia, cambia tambien el current time del video
    barraProgreso.addEventListener("change", function (event) {
        barraProgreso.value = video.currentTime
    })


    // boton hacia detras el tiempo definido en la constante de arriba
    botonBackWard.addEventListener("click", function () {
        // si es posible saltar y puedo saltar
        if ((video.readyState >= 3) && (video.currentTime - TIEMPOSKIP > 0)) {
            video.currentTime = video.currentTime - TIEMPOSKIP
            // si da menos que 0, ponerlo a 0
        } else if (video.currentTime - TIEMPOSKIP < 0) {
            video.currentTime = 0
        }
    })

    // boton play/pausa
    botonPlay.addEventListener("click", function () {
        // si el video esta parado, darle al play
        if (video.paused) {
            video.play()
            document.getElementById("svgPlay").innerHTML = '<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 9h2v6h-2zM9 9h2v6H9z"/>'
            // sino, pusarlo
        } else {
            video.pause()
            document.getElementById("svgPlay").innerHTML = '<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="m9 17 8-5-8-5z"/>'
        }
    })

    // boton stop que pone la video al principio y la para
    botonStop.addEventListener("click", function () {
        // si el video esta reproduciendo
        if (!video.paused) {
            // ponerlo al principio y pararlo cambiando el svg
            video.pause()
            video.currentTime = 0
            document.getElementById("svgPlay").innerHTML = '<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="m9 17 8-5-8-5z"/>'
        }
    })

    // boton hacia adelante el tiempo definido en la constante de arriba
    botonForward.addEventListener("click", function () {
        // si es posible saltar y puedo saltar
        if ((video.readyState >= 3) && (video.currentTime + TIEMPOSKIP < video.duration)) {
            video.currentTime = video.currentTime + TIEMPOSKIP
            // si da mayor de lo que dura, ponerla en el final
        } else if ((video.readyState >= 3) && (video.currentTime + TIEMPOSKIP > video.duration)) {
            video.currentTime = video.duration
        }
    })

    // boton que mutea la video
    botonMute.addEventListener("click", function () {
        // si esta muteado, desmutearlo
        if (video.muted) {
            video.muted = false
            document.getElementById("svgMute").innerHTML = '<path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"/><path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"/>'
            // si no esta muteado, mutear
        } else if (!video.muted) {
            video.muted = true
            document.getElementById("svgMute").innerHTML = '<path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"/>'
        }
    })

    // cuando cambia el input del volumen, cambia el volumen del video
    controlVolumen.addEventListener("input", function () {
        video.volume = controlVolumen.value

        if (video.volume == 0) {
            document.getElementById("svgMute").innerHTML = '<path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"/>'
        } else if (video.volume > 0) {
            document.getElementById("svgMute").innerHTML = '<path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"/><path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"/>'
        }
    })

    // boton que pone la pantalla completa
    botonFullscreen.addEventListener("click", function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
        }
    })

    // boton que pone la velocidad de reproducion a x1
    botonVelocidad1.addEventListener("click", function () {
        video.playbackRate = 1
        document.getElementById("velocity-1").style.color = "red"
        document.getElementById("velocity-15").style.color = "white"
        document.getElementById("velocity-2").style.color = "white"
    })

    // boton que pone la velocidad de reproducion a x1,5
    botonVelocidad15.addEventListener("click", function () {
        video.playbackRate = 1.5
        document.getElementById("velocity-1").style.color = "white"
        document.getElementById("velocity-15").style.color = "red"
        document.getElementById("velocity-2").style.color = "white"
    })

    // boton que pone la velocidad de reproducion a x2
    botonVelocidad2.addEventListener("click", function () {
        video.playbackRate = 2
        document.getElementById("velocity-1").style.color = "white"
        document.getElementById("velocity-15").style.color = "white"
        document.getElementById("velocity-2").style.color = "red"
    })
})