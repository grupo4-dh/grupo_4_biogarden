
window.addEventListener('load', function(){

  
    let formulario= document.querySelector("form.formulario");
    let nombre= document.getElementById('name');
    let lastName=document.getElementById('last_name');
    let email =document.getElementById('email');
    let pw=document.getElementById('pwd');
    let repw =document.getElementById('repwd');
    //let avatar=document.getElementById('avatar')

    formulario.addEventListener('submit',function(error){

        
        
        let errores =[];

        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        console.log(nombre.value);
        if(nombre.value === " "){
            errores.push('El campo Nombre tiene que estar completo');
        
            }else if (nombre.value.length<2){
                errores.push('Nombre tiene que tener al menos 2 caracteres');
            }
            if(lastName.value == " "){
                errores.push('El campo apellido tiene que estar completo');

            }else if (lastname.value.length<2){
            errores.push('El campo apellido tiene que tener al menos 2 caracteres');
        }
        if (!mailformat.test(email.value)){
            errores.push('El email no es valido');
        }

        if(pw.value.length<8){
            errores.push('Contrasena deberia tener minimo 6 caracteres');
        }
        if(repw.value===pw.value){
            errores.push('las contrasenas deben coincidir');
        }


        if (errores.length>0){
            error.preventDefault();

        }
        let ulErrores = document.querySelector("div.errores ul")

        for (let i=0; i<errores.length; i++){

            ulErrores.innerHTML+='<li>' + errores[i] + '</li>'
        }

    })
});