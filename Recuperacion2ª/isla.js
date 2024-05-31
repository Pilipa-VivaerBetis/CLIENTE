let carrito = [];  // Almacena los filtros aplicados

document.addEventListener("DOMContentLoaded", function(){
  renderCards();
  renderCarrito();
});

function renderCards(){
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';  // Limpiar antes de renderizar
    bienes.forEach(bien => {
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
    renderCarrito();
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
        conteo.textContent = `(${bienes.filter(bien => bien.province === provincia).length})`;

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
    filtroAplicado.textContent = "Filtro aplicado: Ninguno";
    filtroAplicado.id = "filtroAplicado";
    carritoContainer.appendChild(filtroAplicado);
}

function filtrarProvincia(provincia) {
    carrito = bienes.filter(bien => bien.province === provincia);
    renderCardsFiltradas();
}

function filtrarUso(uso) {
    carrito = bienes.filter(bien => bien.current_usage === uso);
    renderCardsFiltradas();
}

function renderCardsFiltradas(){
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    carrito.forEach(bien => {
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
        uso.dataset.usage = bien.current_usage;
        uso.addEventListener("click", () => filtrarUso(bien.current_usage));

        cardBody.appendChild(title);
        cardBody.appendChild(subtitulo);
        cardBody.appendChild(provincia);
        cardBody.appendChild(uso);

        div.appendChild(cardBody);
        itemsContainer.appendChild(div);
    });

    // Actualizar el texto del filtro aplicado
    const filtroAplicado = document.getElementById("filtroAplicado");
    filtroAplicado.textContent = `Filtro aplicado: ${carrito.length} bien(es) encontrado(s)`;

    renderCarrito();
}

function botonVaciar() {
    carrito = [];
    renderCards();
    renderCarrito();
}
