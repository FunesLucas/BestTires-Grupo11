window.addEventListener('load', function () {


    let inputRegisterNombre = document.querySelector(".controls-register");
    let inputRegisterApellido = document.querySelector(".controls-register-apellido");;
    let inputRegisterContraseña = document.querySelector(".controls-register-contraseña");

    inputRegisterNombre.addEventListener("blur", function () {
        console.log(1)
        if (!inputRegisterNombre.value) {
            let mensaje = document.querySelector('.error-front-register-nombre');
            mensaje.innerText = "Debes ingresar un nombre";
        } else {
            if (inputRegisterNombre.value.length < 2) {
                let mensaje = document.querySelector('.error-front-register-nombre');
                mensaje.innerText = "Debe contener almenos 2 letras";
            }
        }
    })

    inputRegisterApellido.addEventListener("blur", function () {
        console.log(1)
        if (!inputRegisterApellido.value) {
            let mensaje = document.querySelector('.error-front-register-apellido');
            mensaje.innerText = "Debes ingresar un apellido";
        } else {
            if (inputRegisterApellido.value.length < 2) {
                let mensaje = document.querySelector('.error-front-register-apellido');
                mensaje.innerText = "Debe contener almenos 2 letras";
            }
        }
    })

    inputRegisterContraseña.addEventListener("blur", function () {
        const alphanumeric = /^[0-9a-zA-Z]+$/;

        if (!inputRegisterContraseña.value) {
            let mensaje = document.querySelector('.error-front-register-contraseña');
            mensaje.innerText = "Debes ingresar una contraseña";

        } else if (inputRegisterContraseña.value.length < 8) {
            let mensaje = document.querySelector('.error-front-register-contraseña');
            mensaje.innerText = "Debe contener 8 caracteres Maximo";
        } else {
            if (inputRegisterContraseña.value.match(alphanumeric)) {
                let mensaje = document.querySelector('.error-front-register-contraseña');
                mensaje.innerText = "Debera contener mayusculas , minusculas , un numero y un caracter especial!";
            }
        }
    })


})