window.addEventListener('load', function(){

    if(sessionStorage.getItem('nombre') == null) {//pregunto si dejo el item, de lo contrario guardo en setitem
        let nombreUsuario = prompt('¿Cuál es tu nombre?')
        
        if (nombreUsuario) {
            document.querySelector('.hola').innerHTML = "Bienvenida/o a nuestra pagina "+ nombreUsuario;
            sessionStorage.setItem("nombre",nombreUsuario);
        } else {
            document.querySelector('.hola').innerHTML = "Bienvenida/o a nuestra pagina ";
            sessionStorage.setItem("nombre","");
        }
        
    } else{
        let nombreUsuario = sessionStorage.getItem("nombre");
        document.querySelector('.hola').innerHTML = "Bienvenida/o a nuestra pagina " + nombreUsuario;
    }
    
});