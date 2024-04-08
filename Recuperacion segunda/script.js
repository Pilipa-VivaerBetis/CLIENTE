//Declaro las variables globales
let carrito =[];

document.addEventListener("DOMContentLoaded", function(){
 renderCards();
 renderCarrito();

 //const botonResetear =document.getElementById("boton-resetear");
// botonResetear.addEventListener('click', botonVaciar);
});

/**
 * Función que se encarga de mostrar todas las tarjetas de las provincias
 */
function renderCards(){
    const itemsContainer =document. getElementById('items');
    bienes.forEach(bien =>{
        const div = document.createElement("div");
        div.classList.add("card", "col-sm-9");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h2");
        title.textContent = bien.active_name;

        const subtitulo = document.createElement("h3");
        subtitulo.textContent= bien.counseling;
       
        const provincia = document.createElement("h2");
        provincia.textContent=bien.province;

        const uso = document.createElement("p");
        uso.textContent =bien.current_usage;
        uso.dataset.id=bien.id;//Añadir ID de bien como dataset para usar en el filtro
        uso.dataset.tipo = 'uso'; // Establecer tipo de filtro como 'uso'
        uso.addEventListener("click", addFiltro);

        cardBody.appendChild(title);
        cardBody.appendChild(subtitulo);
        cardBody.appendChild(provincia);
        cardBody.appendChild(uso);

        div.appendChild(cardBody);

        itemsContainer.appendChild(div);

    });
   renderCarrito();
}

/**
 * Función para que se muestren los filtros en la columna de botones
 */
function renderCarrito() {
    const carritoContainer = document.getElementById('totales');
    carritoContainer.innerHTML = "";

    const tituloFiltro = document.createElement("h1");
    tituloFiltro.textContent = "Filtros y totales";

    const subtituloFiltro = document.createElement("h3");
    subtituloFiltro.textContent = "Filtros rápidos";
    subtituloFiltro.classList.add('lado-derecho');

    const resetButton = document.createElement("button");
    resetButton.textContent = "Resetear filtros";
    resetButton.addEventListener("click", botonVaciar);
    carritoContainer.appendChild(resetButton);

    provincias.forEach(provincia => {
        const provinciaContainer = document.createElement("div");
        provinciaContainer.classList.add("provincia-container");

        const button = document.createElement("button");
        button.textContent = provincia;
        button.dataset.provincia = provincia; // Agregar atributo data-provincia
        button.addEventListener("click", () => filtrarProvincia(provincia)); // Llamar a filtrarProvincia con el nombre de la provincia

        const provinciaCount = document.createElement("span");
        provinciaCount.textContent = `(${bienes.filter(bien => bien.province === provincia).length})`; // Contar los bienes por provincia

        provinciaContainer.appendChild(button);
        provinciaContainer.appendChild(provinciaCount);
        carritoContainer.appendChild(provinciaContainer);
    });

    carritoContainer.appendChild(tituloFiltro);
    carritoContainer.appendChild(subtituloFiltro);
}
  /**
 * Función para filtrar por provincia
 * @param {string} provincia Nombre de la provincia seleccionada
 */
  function filtrarProvincia(provincia) {
    // Desactivar todos los filtros activos
    const activeFilters = document.querySelectorAll('.provincia-container.active');
    activeFilters.forEach(filter => filter.classList.remove('active'));

    // Activar el filtro seleccionado
    const selectedFilter = document.querySelector(`.provincia-container button[data-provincia="${provincia}"]`);
    selectedFilter.parentNode.classList.add('active');

    const filteredItems = bienes.filter(bien => bien.province === provincia);
    renderFilteredCards(filteredItems);
    renderTotal(filteredItems.length);
}

/**
 * Función para mostrar los bienes filtrados
 * @param {Array} items Bienes filtrados por provincia o uso
 */
function renderFilteredCards(items) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = "";
    // Si no hay filtro de uso seleccionado, mostrar todos los bienes
    if (items.length === bienes.length) {
        renderCards();
        return;
    }
    items.forEach(bien => {
        const div = document.createElement("div");
        div.classList.add("card", "col-sm-9");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h2");
        title.textContent = bien.active_name;

        const subtitulo = document.createElement("h3");
        subtitulo.textContent = bien.counseling;

        const provincia = document.createElement("h2");
        provincia.textContent = bien.province;

        const uso = document.createElement("p");
        uso.textContent = bien.current_usage;

        cardBody.appendChild(title);
        cardBody.appendChild(subtitulo);
        cardBody.appendChild(provincia);
        cardBody.appendChild(uso);

        div.appendChild(cardBody);

        itemsContainer.appendChild(div);
    });
}

/**
 * Función para mostrar el total de bienes
 * @param {number} total Total de bienes
 */
function renderTotal(total) {
    const totalContainer = document.getElementById('totales');
    const totalElement = document.createElement("p");
    totalElement.textContent = `Total de bienes: ${total}`;
    totalContainer.appendChild(totalElement);
}

/**
 * Función encargada de añadir un filtro al carrito (ya sea por provincia o por uso)
 * @param {Event} event Evento click del elemento
 */
function addFiltro(event) {
    const filtroId = event.target.dataset.id; // Obtener el ID del filtro
    const filtroTipo = event.target.dataset.tipo; // Obtener el tipo de filtro (provincia o uso)
    
    // Si el tipo de filtro es provincia, filtrar por provincia
    if (filtroTipo === 'provincia') {
        filtrarProvincia(filtroId);
    } 
    // Si el tipo de filtro es uso, filtrar por uso
    else if (filtroTipo === 'uso') {
        filtrarUso(filtroId);
    }
}
/**
 * Función para filtrar por uso de bienes
 * @param {string} uso Uso de bien seleccionado
 */
function filtrarUso(uso) {
    const filteredItems = bienes.filter(bien => bien.current_usage === uso);
    renderFilteredCards(filteredItems);
    renderTotal(filteredItems.length);
}

/**
 * Función para resetear los filtros y vuelve a pintarlo
 */
function botonVaciar() {
    carrito = [];
    renderCarrito();
}