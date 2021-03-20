window.addEventListener('load', function(){
    
    // Obtengo el form y los elementos que quiero validar
    const form = document.querySelector('#form')
    const title = document.querySelector('#title')
    const description = document.querySelector('#description')
    const image = document.querySelector('#image')
    const price = document.querySelector('#price')
    const quantity = document.querySelector('#quantity')
    const idCategory = document.querySelector('#id_category')
    const idColour = document.querySelector('#id_colour')
    const idSize = document.querySelector('#id_size')
    
    // Agrego un evento con las validaciones al submit del form 
    form.addEventListener('submit', (e) => {
        
        // Pausamos la ejecución del evento
        e.preventDefault();
        
        // Chequeamos los errores
        let errores = checkInputs()
        if (Object.entries(errores).length == 0) {
            
            // Si no hay errores, ejecuto el submit
            form.submit()
        }
    });
    
    // checkInputs hace las validaciones de los elementos
    function checkInputs(){
        
        let errores = {}
        
        // Obtengo el valor de cada elemento
        let titleValue = title.value.trim()
        let descriptionValue = description.value.trim()
        let imageValue = image.value.trim()
        let priceValue = price.value.trim()
        let quantityValue = quantity.value.trim()
        let idCategoryValue = idCategory.value
        let idColourValue = idColour.value
        let idSizeValue = idSize.value
        
        // Validación title
        if(titleValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.title = message;
            setErrorFor(title, message);
        } else if (titleValue.length <= 5 ) {
            let message = 'El nombre tiene que tener como mínimo 5 caracteres'
            errores.title = message;
            setErrorFor(title, message);
        } else {
            setSuccessFor(title);
        }
        
        // Validación description
        if(descriptionValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.description = message;
            setErrorFor(description, message);
        } else if (descriptionValue.length <= 20 ) {
            let message = 'La descripción tiene que tener como mínimo 20 caracteres'
            errores.description = message;
            setErrorFor(description, message);
        } else {
            setSuccessFor(description);
        }

        // Validación imagen
        if(imageValue === '') {
            let message = 'Tienes que cargar una imagen del producto'
            errores.image = message;
            setErrorFor(image, message);
        } else if (! validateExtension(imageValue)) {
            let message = 'El formato de imagen no es válido'
            errores.image = message;
            setErrorFor(image, message);
        } else {
            setSuccessFor(image);
        }

        // Validación price

        // RegEx para validar precio
        let priceFormat = /^\d+(.\d{1,2})?$/;

        if(priceValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.price = message;
            setErrorFor(price, message);
        } else if (! priceFormat.test(priceValue)) {
            let message = 'El precio debe ser un número'
            errores.price = message;
            setErrorFor(price, message);
        } else {
            setSuccessFor(price);
        }
        
        // Validación quantity

        // RegEx para validar numeros y numeros positivos
        let numberFormat = /^\d+$/;
        let positiveNumberFormat = /^[1-9]\d*$/;

        if(quantityValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.quantity = message;
            setErrorFor(quantity, message);
        } else if (! numberFormat.test(quantityValue)) {
            let message = 'La cantidad debe ser un número'
            errores.quantity = message;
            setErrorFor(quantity, message);
        } else if (! positiveNumberFormat.test(quantityValue)) {
            let message = 'La cantidad no puede ser menor a 0'
            errores.quantity = message;
            setErrorFor(quantity, message);
        } else {
            setSuccessFor(quantity);
        }

        // Validación category
        if(idCategoryValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.idCategory = message;
            setErrorFor(idCategory, message);
        } else if (idCategoryValue == 'Elegir categoría' ) {
            let message = 'Tienes que elegir una categoría'
            errores.idCategory = message;
            setErrorFor(idCategory, message);
        } else {
            setSuccessFor(idCategory);
        }

        // Validación colour
        if(idColourValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.idColour = message;
            setErrorFor(idColour, message);
        } else if (idColourValue == 'Elegir color' ) {
            let message = 'Tienes que elegir un color o no aplica'
            errores.idColour = message;
            setErrorFor(idColour, message);
        } else {
            setSuccessFor(idColour);
        }

        // Validación size
        if(idSizeValue === '') {
            let message = 'El campo no puede estar vacío'
            errores.idSize = message;
            setErrorFor(idSize, message);
        } else if (idSizeValue == 'Elegir tamaño' ) {
            let message = 'Tienes que elegir un tamaño o no aplica'
            errores.idSize = message;
            setErrorFor(idSize, message);
        } else {
            setSuccessFor(idSize);
        }

        return errores
    }
    
    // setErrorFor agrega el mensaje de error en el elemento
    function setErrorFor(input, message) {
        const formControl = input.parentElement
        const small = formControl.querySelector('small')
        small.innerText = message;
    }
    
    // setErrorFor borra el mensaje de error en el elemento
    function setSuccessFor(input) {
        const formControl = input.parentElement
        const small = formControl.querySelector('small')
        small.innerText = '';
    }

    // validateExtension valida la extensión de la imagen
    function validateExtension(imageValue) {
        let extension = imageValue.substring(imageValue.indexOf('.'), imageValue.length).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension)
    }
})