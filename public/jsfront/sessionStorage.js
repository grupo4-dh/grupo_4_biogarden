window.addEventListener('load', function(){

    if(sessionStorage.getItem('nombre')== null){//pregunto si dejo el item, de lo contrario guardo en setitem
        let nombreUsuario= prompt('Cual es tu nombre?')
        document.querySelector('.hola').innerHTML = "Bienvenida/o a nuestra pagina " + " " + nombreUsuario;
        sessionStorage.setItem("nombre",nombreUsuario);
    }else{
        let nombreUsuario=sessionStorage.getItem("nombre");
        document.querySelector('.hola').innerHTML = "Bienvenida/o a nuestra pagina " + " " + nombreUsuario;
    }
  




});