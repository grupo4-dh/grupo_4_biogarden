window.addEventListener('load', function(){
    
    
    let formulario= document.getElementById("form");

    
    formulario.addEventListener('submit',function(evento){
        evento.preventDefault();

        //ELEMENTOS nuevos
        
        let nombre= document.getElementById('name');
        let lastName=document.getElementById('last_name');
        let email =document.getElementById('email');
        let pw=document.getElementById('pwd');
        let repw =document.getElementById('repwd');
        let avatar=document.getElementById('avatar')

        //ERRORES
        let errorNombre=document.getElementById('errornombre')
        let errorApellido=document.getElementById('errorapellido')
        let errorEmail=document.getElementById('erroremail')
        let errorPassword=document.getElementById('errorpassword')
        let errorRePassword=document.getElementById('errorpassword2')

        //ARRAY DE ERRORES -SIEMPRE ADENTRO DEL ADDEVENT
        let errores =[];
        
        let mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

    //VALIDACIONES NOMBRE
        if(nombre.value.length == 0){
            errores.push('El campo Nombre tiene que estar completo');
            errorNombre.innerText=errores.nombre;
            
        }else if (nombre.value.length<2){
            errores.push('Nombre tiene que tener al menos 2 caracteres');
            errorNombre.innerText=errores.nombre;
        }
        //VALIDACIONES APELLIDO
        if(lastName.value == ""){
            errores.push('El campo apellido tiene que estar completo');
            errorApellido.innerText=errores.lastName;
            
        }else if (lastName.value.length<2){
            errores.push('El campo apellido tiene que tener al menos 2 caracteres');
            errorApellido.innerText=errores.lastName;
        }
         //VALIDACIONES EMAIL
        if (!mailformat.test(email.value)){
            errores.push('El email no es valido');
            errorEmail.innerText=errores.email;
        }
        
          //VALIDACIONES CONTraseña
        if(pw.value.length<6){
            errores.push('Contrasena deberia tener minimo 6 caracteres');
            errorPassword.innerText=errores.pw;
        }

         //VALIDACIONES RECONTraseña
        if(repw.value!==pw.value){
            errores.push('las contrasenas deben coincidir');
            errorRePassword.innerText=errores.repw;
        }
        
        
        if (errores.length != 0){
            let ulErrores = document.querySelector("div.errores ul")
        
            for (let i=0; i<errores.length; i++){
                ulErrores.innerHTML+='<li>' + errores[i] + '</li>'
           } 
        }else{
            formulario.submit();
        }
        
    })
});