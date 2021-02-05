
window.addEventListener('load', function(){

    let formulario= document.getElementById("form");
    
    

    formulario.addEventListener('submit',function(evento){
        evento.preventDefault();
        
    let nombre= document.getElementById('name');
    let lastName=document.getElementById('last_name');
    let email =document.getElementById('email');
    let pw=document.getElementById('password');
    let repw =document.getElementById('repassword');
    //let avatar=document.getElementById('avatar')

    let errorNombre=querySelector('#errornombre')
    let errorApellido=querySelector('#errorapellido')
    let errorEmail=querySelector('#erroremail')
    let errorPassword=querySelector('#errorpassword')
    let errorRePassword=querySelector('#errorpassword2')

    let errores ={};//tengoq eu dejarlo adentro del aadd 
    

        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        
        if(nombre.value.length == 0 ){
            errores.nombre('El campo Nombre tiene que estar completo');
            errorNombre.innerText=errores.nombre,
        
            }else if (nombre.value.length<2){
                errores.nombre('Nombre tiene que tener al menos 2 caracteres');
                console.log(nombre.value)
            }else{
                delete errores.nombre
            }
            if(lastName.value == " "){
                errores.lastName('El campo apellido tiene que estar completo');
                errorApellido.innerText=errores.lastName

            }else if (lastname.value.length<2){
            errores.push('El campo apellido tiene que tener al menos 2 caracteres');
        }else{
            delete errores.lastName
        }
        if (!mailformat.test(email.value)){
            errores.push('El email no es valido');
        }

        if(pw.value.length<8){
            errores.push('Contrasena deberia tener minimo 6 caracteres');
        }else{
            delete errores.pw
        }
        if(repw.value!==pw.value){
            errores.push('las contrasenas deben ser iguales');
        }else{
            delete errores.repwd
        }
        //enviamos el formulario

        if (Object.keys(errores).length!=0){
            console.log("hay errores")
         
           

        }else{
            console.log('no hay errores')
        }
        formulario.submit()
        

    })
});