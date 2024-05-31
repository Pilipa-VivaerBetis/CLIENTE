let carrito = [];  // Almacena los filtros aplicados

document.addEventListener("DOMContentLoaded", function(){
  renderCards();
  renderCarrito();
});

/**
 * Función para obtener las provincias únicas de los bienes
 * Recorrer el array bienes para obtener las provincias:


bienes.map(bien => bien.province)
bienes es el array de objetos que contiene información sobre cada bien.
.map(bien => bien.province) recorre cada objeto bien dentro del array bienes y extrae el valor de la propiedad province.
El resultado es un nuevo array que contiene todas las provincias de los bienes. Puede tener duplicados si varios bienes están en la misma provincia.

Crear un Set para eliminar duplicados:

const provinciasSet = new Set(bienes.map(bien => bien.province));
El constructor Set en JavaScript crea una colección de valores únicos, eliminando automáticamente cualquier duplicado.
Al pasarle el array de provincias (posiblemente con duplicados) al Set, obtenemos un conjunto de provincias únicas.
Convertir el Set de vuelta a un array:


return Array.from(provinciasSet);
Array.from es un método estático que crea una nueva instancia de array a partir de un objeto iterable, en este caso, el Set de provincias únicas.
El resultado final es un array que contiene solo las provincias únicas.
 */
function conseguirProvincias(bienes) {
    const provinciasSet = new Set(bienes.map(bien => bien.province));
    return Array.from(provinciasSet);
  }
  
/**
 * Función que se encarga de mostrar todas las tarjetas de las provincias
 */
function renderCards(bienesARenderizar = bienes){
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';  // Limpiar antes de renderizar
    bienesARenderizar.forEach(bien => {
        const div = document.createElement("div");
        div.classList.add("card", "col-sm-4");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        //a partir de este punto sacaré del bbdd todos las propiedades (keys y values)
        //para poder pintarlas en cada div que corresponda a cada bien. Por lo que
        //todo lo que viene más abajo no me será necesario. 
        
        // Object.entries(bien).forEach(([key, value]) => {
        //     const parrafo = document.createElement("p");
        //     parrafo.textContent = `${key}: ${value}`;
        //     cardBody.appendChild(parrafo);
        //   });

        // Ahora voy hacer lo mismo usando Object.keys()
         // Recorrer todas las propiedades del objeto bien y agregarlas a la tarjeta
        Object.keys(bien).forEach(key => {
            const parrafo = document.createElement("p");
            parrafo.textContent = `${key}: ${bien[key]}`;
            cardBody.appendChild(parrafo);
          });
        // esto se supone que me devuelve todos los valores del array asociativo de la base de datos
      
        // const title = document.createElement("h2");
        // title.textContent = bien.active_name;

        // const subtitulo = document.createElement("h3");
        // subtitulo.textContent = bien.counseling;

        // const provincia = document.createElement("h2");
        // provincia.textContent = bien.province;

        // const uso = document.createElement("p");
        // uso.textContent = bien.current_usage;
        // uso.dataset.usage = bien.current_usage;  // Guardar el uso en un atributo data
        // uso.style.cursor = "pointer";//le puse un cursor en el uso xq sino no se notaba
        // uso.addEventListener("click", () => filtrarUso(bien.current_usage));

        // cardBody.appendChild(title);
        // cardBody.appendChild(subtitulo);
        // cardBody.appendChild(provincia);
        // cardBody.appendChild(uso);

        div.appendChild(cardBody);
        itemsContainer.appendChild(div);
    });
}
/**
 * Función para que se muestren los filtros en la columna de botones
 */
function renderCarrito(){
    const carritoContainer = document.getElementById('totales');
    carritoContainer.innerHTML = '';
    
    const tituloFiltro = document.createElement("h1");
    tituloFiltro.textContent = "Filtros y totales";
    carritoContainer.appendChild(tituloFiltro);

    const subtituloFiltro = document.createElement("h3");
    subtituloFiltro.textContent = "Filtros rápidos";
    carritoContainer.appendChild(subtituloFiltro);

    const contenedorLista = document.createElement("ul");

    // Ahora vamos a comentar en bbdd.js las provincias y en esta ocasion
    // vamos a recuperar las provincias del array bienes con la funcion Set
    // const provincias = new Set();

    // bienesARenderizar.forEach(bien => {
    //     provincias.add(bien.province);
    // });
    /**
 * Función para obtener las provincias únicas de los bienes
 */

    const provincias = conseguirProvincias(bienes);
    provincias.forEach(provincia => {
        const listaProvincia = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = provincia;
        button.addEventListener("click", () => filtrarProvincia(provincia));

        const conteo = document.createElement("span");
        const bienesFiltrados = bienes.filter(bien => bien.province === provincia).length;
        conteo.textContent = `(${bienesFiltrados})`; // Conteo basado en los bienes filtrados

        listaProvincia.appendChild(button);
        listaProvincia.appendChild(conteo);
        contenedorLista.appendChild(listaProvincia);
    });

    carritoContainer.appendChild(contenedorLista);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Resetear filtros";
    resetButton.addEventListener("click", botonVaciar);
    carritoContainer.appendChild(resetButton);

    const filtroAplicado = document.createElement("p");
    filtroAplicado.textContent = carrito.length > 0 ? `Filtro aplicado: ${carrito[0].province || carrito[0].current_usage}` : "Filtro aplicado: Ninguno";
    carritoContainer.appendChild(filtroAplicado);

    const totalInmuebles = document.createElement("p");
    totalInmuebles.textContent = `Total de inmuebles: ${carrito.length || bienes.length}`;
    carritoContainer.appendChild(totalInmuebles);
}

/**
 * Función para resetear los filtros y vuelve a pintarlo
 */
function botonVaciar() {
    carrito = []; // Reinicia el carrito a todos los bienes disponibles
    renderCards();
    renderCarrito();// Actualiza el carrito para mostrar el estado inicial
}


/**
 * Función para filtrar por provincia
 * @param {string} provincia Nombre de la provincia seleccionada
 */
function filtrarProvincia(provincia) {
    carrito = bienes.filter(bien => bien.province === provincia);
    renderCards(carrito);
    renderCarrito();
}

/**
 * Función para filtrar por uso de bienes
 * @param {string} uso Uso de bien seleccionado
 */
function filtrarUso(uso) {
    carrito = bienes.filter(bien => bien.current_usage === uso);
    renderCards(carrito);
    renderCarrito();
// Actualizar el espacio "Filtro aplicado" al filtrar por uso
const filtroAplicado = document.querySelector("#totales p:last-child");
filtroAplicado.textContent = carrito.length > 0 ? `Filtro aplicado: ${uso}` : "Filtro aplicado: Ninguno";

}


