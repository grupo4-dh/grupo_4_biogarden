
window.addEventListener('load', function(){

    let errores =[];
    let formulario= document.querySelector("form#form");
    let nombre= document.querySelector('input#name');
    let lastName=document.querySelector('input#last_name');
    let email =document.querySelector('input#email');
    let pw=document.querySelector('input#pwd');
    let repw =document.querySelector('input#repwd');
    let avatar=document.querySelector('input#avatar')

    formulario.addEventListener('submit',function(error){
        error.preventDefault();

        console.log(nombre);
        if(nombre.value == " "){
            errores.push('El campo Nombre tiene que estar completo');
        
            }else if (nombre.value.length<2){
                errores.push('Nombre tiene que tener al menos 2 caracteres');
            }
            if(lastName.value == " "){
                errores.push('El campo apellido tiene que estar completo');
                
            }else if (lastname.value.length<2){
            errores.push('El campo apellido tiene que tener al menos 2 caracteres');
        }

        let ulErrores = document.querySelector("errores")

        for (let i=0; i<errores.length; i++){
            ulErrores.innerHTML+='<li>' + errores[i] + '</li>'
        }

    })
});