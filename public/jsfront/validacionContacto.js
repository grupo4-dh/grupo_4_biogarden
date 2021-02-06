window.addEventListener('load', function(){
    
    
    let formulario= document.getElementById("form");
    
    formulario.addEventListener('submit',function(evento){
        evento.preventDefault();

        //ELEMENTOS
        let nombre= document.getElementById('name');
        let email =document.getElementById('email');

        //ERRORES
         //ERRORES
         let errorNombre=querySelector('#errorNombre')
         let errorEmail=querySelector('#errorEmail')

        let errores =[];
        
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        console.log(nombre.value);

    //VALIDACIONES NOMBRE
        if(nombre.value.length == 0){
            errores.push('El campo Nombre tiene que estar completo');
            errorNombre.innerText=errores.nombre;
            
           
        }else if (nombre.value.length<2){
            errores.push('Nombre tiene que tener al menos 2 caracteres');
            errorNombre.innerText=errores.nombre;
        }       
         //VALIDACIONES EMAIL
        if (!mailformat.test(email.value)){
            errores.push('El email no es valido');
            errorEmail.innerText=errores.email;
        }
        
        //pregunto si hay errorres
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