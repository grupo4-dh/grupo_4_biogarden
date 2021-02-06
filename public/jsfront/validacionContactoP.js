window.addEventListener('load', function(){
    
    
    let formulario= document.getElementById("form");
        //ELEMENTOS
        let nombre= document.getElementById('name');
        let email =document.getElementById('email');
        
    formulario.addEventListener('submit',function(evento){
        evento.preventDefault();

     
        
    });
    
 
    //VALIDACIONES NOMBRE
        if(nombre.value.length== 0){
            setErrorFor(nombre, 'El campo debe estar completo');
        }else if(nombre.value.length<2){
            setErrorFor(nombre, 'El nombre debe contener al menos 2 caracteres');
        }else {
            setSuccessFor(nombre);
        }

        //VALIDAMOS EMAIL
        if(email === '') {
            setErrorFor(email, 'Debes completar el email');
        } else if (!isEmail(email)) {
            setErrorFor(email, 'Email no valido');
        } else {
            setSuccessFor(email);
        }

        //FUNCIONES DE ERRORES
        function setErrorFor(input, message) {
            const formControl = input.parentElement
            const small = formControl.querySelector('small')
            small.innerText = message;
        }
        
        function setSuccessFor(input) {
            const formControl = input;
            const small = input.querySelector('small')
    
        }
         
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

        formulario.submit();
    }
    
    
    
});