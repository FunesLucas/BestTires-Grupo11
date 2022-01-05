window.addEventListener('load',function(){
    
    let formularioLogin= document.querySelector('form.login-form');

    formularioLogin.addEventListener("submit", function (e){
        
        let errors = [];
        
        

        let email = document.querySelector(".controls");
        const isEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        let contraseña = document.querySelector("input.controlspass");

        
        if (email.value == ""){
            errors.push(1)
            let mensaje = document.querySelector('.error-front-email') 
            mensaje.innerHTML = "Debes ingresar un email"
            
        }else if (!isEmail.test(String(email.value).toLowerCase())){
            errors.push(1)
            let mensaje = document.querySelector('.error-front-email') 
            mensaje.innerHTML = "Debes ingresar un email valido"
        }else {
            mensaje.innerHTML = ""
        }




        if (contraseña.value == ""){
            errors.push(1)
            let mensajecontraseña = document.querySelector('.error-front-contraseña') 
            mensajecontraseña.innerHTML = "Debes ingresar una contraseña"
        }

        if (errors.length > 0 || locals.errors ){
            e.preventDefault()
        }


    });
})