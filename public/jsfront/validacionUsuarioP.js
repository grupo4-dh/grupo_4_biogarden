const { name } = require("ejs")


window.addEventListener('load', function(){
    const form = document.querySelector('#form')
    const nombre = document.querySelector('#name')
    const apellido = document.querySelector('#lastname')
    const email = document.querySelector('#email')
    const password = document.querySelector('#pwd')
    const password2 = document.querySelector('#repwd')
    const small = document.querySelectorAll('small')

    
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        checkInputs()
        
    } );
    
    function checkInputs(){
        //chequeamos los inputs
    
        let nombreUsuarioValue = name.value.trim()
        let apellidoUsuarioValue = lastname.value.trim()
        let emailUsuarioValue = email.value.trim()
        let passwordUsuarioValue = pwd.value.trim()
        let password2UsuarioValue = repwd.value.trim()

    
    
        
        if(nombreUsuarioValue === '') {
            setErrorFor(name, 'Debes completar el Nombre');
        } else {
            setSuccessFor(name);
        }
        
        if(apellidoUsuarioValue === '') {
            setErrorFor(lastname, 'Debes completar el Apellido');
        } else {
            setSuccessFor(lastname);
        }
        
        if(emailUsuarioValue === '') {
            setErrorFor(email, 'Debes completar el email');
        } else if (!isEmail(emailUsuarioValue)) {
            setErrorFor(email, 'Email no valido');
        } else {
            setSuccessFor(email);
        }
        
        if(passwordUsuarioValue === '') {
            setErrorFor(pwd, 'Debes completar la password');
        } else if(!isPassword(passwordUsuarioValue)) {
            setErrorFor(pwd, 'La contraseña debe tener minimo 8 caracteres y una mayuscula ');
        }else if (!isPassword(emailUsuarioValue)) {
            setErrorFor(pwd, 'Email no valido');
        } else {
            setSuccessFor(pwd);
        }
        
        if(password2UsuarioValue === '') {
            setErrorFor(repwd, 'Debes completar la password');
        } else if(passwordUsuarioValue !== password2UsuarioValue) {
            setErrorFor(repwd, 'Passwords no concuerdan');
        } else{
            setSuccessFor(repwd);
        }
    }
    
    function setErrorFor(input, message) {
        const formControl = input.parentElement
        const small = formControl.querySelector('small')
        small.innerText = message;
    }
    
    function setSuccessFor(input) {
        const formControl = input;
        const small = input.querySelector('small')

        // small.className = 'form-control success';
    }
    
    
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function isPassword(pwd) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        .test(pwd);
    }

    console.log("hola");
})