window.addEventListener('load', function() {
    
    // Obtengo el form y los elementos que quiero validar
    let formulario = document.getElementById('form');
    let name = document.getElementById('name');
    let lastName = document.getElementById('last_name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repassword = document.getElementById('repassword');
    let avatar = document.getElementById('avatar')
    
    // Agrego un evento con las validaciones al submit del form 
    formulario.addEventListener('btnSubmit', (e) => {
        
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
        let nameValue = name.value.trim()
        let lastNameValue = lastName.value.trim()
        let emailValue = email.value.trim()
        let passwordValue = password.value.trim()
        let repasswordValue = repassword.value.trim()
        let avatarValue = avatar.value
        
        // Validación name
        if(nameValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.name = message;
            setErrorFor(name, message);
        } else if (nameValue.length <= 2 ) {
            let message = 'El nombre tiene que tener como mínimo 2 caracteres'
            errores.name = message;
            setErrorFor(name, message);
        } else {
            setSuccessFor(name);
        }
        
        // Validación lastName
        if(lastNameValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.lastName = message;
            setErrorFor(lastName, message);
        } else if (lastNameValue.length <= 2 ) {
            let message = 'El nombre tiene que tener como mínimo 2 caracteres'
            errores.lastName = message;
            setErrorFor(lastName, message);
        } else {
            setSuccessFor(lastName);
        }
        
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
        
        // Validación repassword
        if(repasswordValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.repassword = message;
            setErrorFor(repassword, message);
        } else if (repasswordValue.length < 8 ) {
            let message = 'La contraseña debe contener como mínimo 8 caracteres'
            errores.repassword = message;
            setErrorFor(repassword, message);
        } else if (repasswordValue !== passwordValue ) {
            let message = 'Las contraseñas deben ser iguales'
            errores.repassword = message;
            setErrorFor(repassword, message);
        } else {
            setSuccessFor(repassword);
        }

        // Validación avatar
        if(avatarValue === '') {
            let message = 'Tienes que cargar tu avatar'
            errores.avatar = message;
            setErrorFor(avatar, message);
        } else if (! validateExtension(avatarValue)) {
            let message = 'El formato de imagen no es válido'
            errores.avatar = message;
            setErrorFor(avatar, message);
        } else {
            setSuccessFor(avatar);
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

    // validateExtension valida la extensión de la imagen
    function validateExtension(avatarValue) {
        let extension = avatarValue.substring(avatarValue.indexOf('.'), avatarValue.length).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension)
    }
});