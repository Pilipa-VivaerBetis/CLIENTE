let carrito = [];  // Almacena los filtros aplicados

document.addEventListener("DOMContentLoaded", function(){
  renderCards();
  renderCarrito();
});

function renderCards(bienesARenderizar = bienes){
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';  // Limpiar antes de renderizar
    bienesARenderizar.forEach(bien => {
        const div = document.createElement("div");
        div.classList.add("card", "col-sm-4");

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
        uso.dataset.usage = bien.current_usage;  // Guardar el uso en un atributo data
        uso.style.cursor = "pointer";
        uso.addEventListener("click", () => filtrarUso(bien.current_usage));

        cardBody.appendChild(title);
        cardBody.appendChild(subtitulo);
        cardBody.appendChild(provincia);
        cardBody.appendChild(uso);

        div.appendChild(cardBody);
        itemsContainer.appendChild(div);
    });
}

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

    provincias.forEach(provincia => {
        const listaProvincia = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = provincia;
        button.addEventListener("click", () => filtrarProvincia(provincia));

        const conteo = document.createElement("span");
        const bienesFiltrados = carrito.filter(bien => bien.province === provincia).length;
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

function botonVaciar() {
    carrito = []; // Reinicia el carrito a todos los bienes disponibles
    renderCards();
    renderCarrito();// Actualiza el carrito para mostrar el estado inicial
}

function filtrarProvincia(provincia) {
    carrito = bienes.filter(bien => bien.province === provincia);
    renderCards(carrito);
    renderCarrito();
}

function filtrarUso(uso) {
    carrito = bienes.filter(bien => bien.current_usage === uso);
    renderCards(carrito);
    renderCarrito();}