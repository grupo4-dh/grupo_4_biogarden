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
        let errores ={
            nombre:"",
            apellido:"",
            email:"",
            password:"",
            repassword:""

        };
        
        let mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

    //VALIDACIONES NOMBRE
        if(nombre.value.length < 2){
           
      //errores.push('El campo Nombre tiene que estar completo');
            errorNombre.innerText="El campo Nombre tiene que estar completo"
        
        }
        //VALIDACIONES APELLIDO
        if(lastName.value.length <2){
            
            //errores.push('El campo apellido tiene que estar completo');
            errorApellido.innerText="El campo apellido tiene que estar completo";
            
        
        }
         //VALIDACIONES EMAIL
        if (!mailformat.test(email.value)){
           // errores.push('El email no es valido');
            errorEmail.innerText="el email debe ser valido";
        }
        
          //VALIDACIONES CONTraseña
        if(pw.value.length<6){
            
            errorPassword.innerText="la contrasena debe tener como minimo 6 caracteres";
        }

         //VALIDACIONES RECONTraseña
        if(repw.value!==pw.value){
            
            errorRePassword.innerText="las contrasenas deben ser iguales";
        }
        
        
        if (errores.nombre =="" && errores.apellido=="" && errores.password=="" && errores.repassword){
            //let ulErrores = document.querySelector("div.errores ul")
        
            //for (let i=0; i<errores.length; i++){
                //ulErrores.innerHTML+='<li>' + errores[i] + '</li>'
           
                formulario.submit()
           //}
        
        }
        
        
    })
});