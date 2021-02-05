
window.addEventListener('load', function(){
    
    
    let formulario= document.querySelector("form.formulario");
    let nombre= document.getElementById('name');
    let lastName=document.getElementById('last_name');
    let email =document.getElementById('email');
    let pw=document.getElementById('pwd');
    let repw =document.getElementById('repwd');
    //let avatar=document.getElementById('avatar')
    
    formulario.addEventListener('submit',function(evento){
        evento.preventDefault();
        
        
        
        let errores =[];
        
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        console.log(nombre.value);

    //VALIDACIONES NOMBRE
        if(nombre.value.length == 0){
            errores.push('El campo Nombre tiene que estar completo');
            
        }else if (nombre.value.length<2){
            errores.push('Nombre tiene que tener al menos 2 caracteres');
        }
        //VALIDACIONES APELLIDO
        if(lastName.value == ""){
            errores.push('El campo apellido tiene que estar completo');
            
        }else if (lastname.value.length<2){
            errores.push('El campo apellido tiene que tener al menos 2 caracteres');
        }
         //VALIDACIONES EMAIL
        if (!mailformat.test(email.value)){
            errores.push('El email no es valido');
        }
        
          //VALIDACIONES CONTraseña
        if(pw.value.length<6){
            errores.push('Contrasena deberia tener minimo 6 caracteres');
        }

         //VALIDACIONES RECONTraseña
        if(repw.value!=pw.value){
            errores.push('las contrasenas deben coincidir');
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