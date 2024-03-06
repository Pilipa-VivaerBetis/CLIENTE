// Espacio para declarar (¿inicializar?) variables globales

/** Manejador a ejecutar cuando la página se haya cargado.
 * Entre otras cosas, será necesario generar y mostrar los productos disponibles y el carrito
*/
 

/**
* Funcion que se encarga de mostrar todos los productos del archivo JSON
*/
function renderProductos() {
    // Haremos la misma operación por cada uno de los items del JSON
    
        // Estructura
        // Necesitamos un div con las clases card y col-sm-4
        
        // Body
        // Necesitamos un div con la clase card-body
        
        // Titulo
        // Creamos un h5 con la clase card-title y el texto del atributo nombre
        
        // Imagen
        // Creamos una imagen con la clase img-fluid y el src del atributo imagen
        
        // Precio
        // Creamos un párrafo con la clase card-text y el texto del atributo precio junto a la moneda
        
        // Boton
        // Creamos un botón con la clase btn y btn-primary, el texto '+' y un atributo id con el valor apropiado del JSON
        // También tendremos que asociar el manejador para el evento click
        
        // Insertamos la imagen, el título, el precio y el botón añadir al div con la clase card-body
        
        // Insertamos el div con la clase card-body a div de la estructura
        
        // Insertamos en elemento main con id items
}

/**
* Función que muestra todos los productos guardados en el array carrito
*/
function renderCarrito() {

    // Vaciamos todo el html del carrito
    
    // Quitamos los duplicados porque necesitamos una sola linea por extra
    let carritoSinDuplicados = Array.from(new Set(carrito))

    // Por cada extra se creará un nodo (linea)
    
        // Obtenemos el extra que necesitamos buscándolo en el JSON (function filter)
        
        // Cuenta el número de veces que se repite el extra (funcion reduce)
        
        // Creamos el nodo del item del carrito. Elemeto li con el texto: unidades x nombre - precioItem
        // Le añadimos las clases css list-group-item, text-right y mx-2
        
        // Creamos el boton de borrar con las propiedades adjuntas.
        const miBoton               = 
        miBoton.textContent         = 'X';
        miBoton.style.marginLeft    = '1rem';
        miBoton.dataset.item        = item;
        // Le añadimos las clases css 'btn', 'btn-danger', 'mx-5'
        // Le añadimos el manejador para el evento click

        // Insertamos botón en nodo carrito
        
        // Insertamos nodo en carrito
        
    // Mostramos el precio total en el HTML
}

/**
 * Función encargada de añadir un producto al carrito de la compra
 */
function addExtra(evento) {

    // Insertamos el id del extra en al array de nuestro carrito
    
    // Generamos el carrito
    renderCarrito();

}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {

    // Obtenemos el producto ID del atributo creado en el botón
    
    // Opción 1: Borramos productos de uno en uno
    
    // Opción 2: Borramos todos los productos
    
    // Volvemos a renderizar
    renderCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito. Una manera de hacerlo es usando las funciones reduce y filter.
}

/**
* Función que vacia el carrito y vuelve a pintarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados
    
    // Renderizamos los cambios
    renderCarrito();
}