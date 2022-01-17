window.addEventListener('load',function(){
    
    let button= document.querySelector('.boton-hambur');
    let buttonActive = document.querySelector('.hamburguesa-button')

    button.addEventListener("click", function (){
        buttonActive.classList.toggle('hamburguesa-button-enable');
        console.log('hola')
        
    });
    
})