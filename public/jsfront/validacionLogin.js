window.addEventListener('load', function() {

    let formulario= document.getElementById("form");
    let email = document.querySelector('#email');
    let pass = document.querySelector('#password');


    let errores = {};

    let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    formulario.addEventListener('submit', function(evento){

        evento.preventDefault();

         //ERRORES
         let erroremail=querySelector('.erroremail')
         let errorpass=querySelector('.errorpass')


         //validacion contrasena
        if (pass.value == 0) {
            errorpass.innerHTML = '* Este campo es obligatorio'
            errores.pass = true;

        } else if (pass.value < 6) {
            errorpass.innerHTML = '* La contraseña debe tener un mínimo de 6 caracteres';
            errores.pass = true;
        } else {
            errorpass.innerHTML = '';
            delete errores.pass;
        }
    //validacion email

        if (email.value == 0) {
            erroremail.innerHTML = '* Este campo es obligatorio'
            errores.email = true;
        } else if (!regEx.test(email.value)) {
            erroremail.innerHTML = '* Debes ingresar un email correcto';
            errores.email = true;
        } else {
            erroremail.innerHTML = '';
            delete errores.email;
        }

        if(Object.keys(errores).length != 0) {
            formulario.submit();
           
        }
    })

});
