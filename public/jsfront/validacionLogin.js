window.addEventListener('load', function() {

    // Obtengo el form y los elementos que quiero validar
    let formulario = document.getElementById('form');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    // Agrego un evento con las validaciones al submit del form 
    formulario.addEventListener('submit', (e) => {
        
        // Pausamos la ejecución del evento
        e.preventDefault();
        
        // Chequeamos los errores
        let errores = checkInputs()
        if (Object.entries(errores).length == 0) {
            
            // Si no hay errores, ejecuto el submit
            formulario.submit()
        }
    });

    // checkInputs hace las validaciones de los elementos
    function checkInputs(){
        
        let errores = {}
        
        // Obtengo el valor de cada elemento
        let emailValue = email.value.trim()
        let passwordValue = password.value.trim()
        
        // Validación email

        // RegEx para validar emails
        let emailFormat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

        if(emailValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.email = message;
            setErrorFor(email, message);
        } else if (! emailFormat.test(emailValue)) {
            let message = 'Debes ingresar un email válido'
            errores.email = message;
            setErrorFor(email, message);
        } else {
            setSuccessFor(email);
        }

        // Validación password
        if(passwordValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.password = message;
            setErrorFor(password, message);
        } else if (passwordValue.length < 8 ) {
            let message = 'La contraseña debe contener como mínimo 8 caracteres'
            errores.password = message;
            setErrorFor(password, message);
        } else {
            setSuccessFor(password);
        }

        return errores
    }
    
    // setErrorFor agrega el mensaje de error en el elemento
    function setErrorFor(input, message) {
        const formControl = input.parentElement
        const small = formControl.querySelector('small')
        small.innerText = message;
    }
    
    // setErrorFor borra el mensaje de error en el elemento
    function setSuccessFor(input) {
        const formControl = input.parentElement
        const small = formControl.querySelector('small')
        small.innerText = '';
    }

});
