let carrito = [];  // Almacena los filtros aplicados

document.addEventListener("DOMContentLoaded", function() {
  renderCards();
  renderCarrito();
});

/**
 * Función para obtener las provincias únicas de los bienes
 */
function conseguirProvincias(bienes) {
  const provinciasSet = new Set(bienes.map(bien => bien.province));
  return Array.from(provinciasSet);
}

/**
 * Función que se encarga de mostrar todas las tarjetas de las provincias
 */
function renderCards(bienesARenderizar = bienes) {
  const itemsContainer = document.getElementById('items');
  itemsContainer.innerHTML = '';  // Limpiar antes de renderizar
  bienesARenderizar.forEach(bien => {
    const div = document.createElement("div");
    div.classList.add("card", "col-sm-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    Object.keys(bien).forEach(key => {
      const parrafo = document.createElement("p");
      parrafo.textContent = `${key}: ${bien[key]}`;
      cardBody.appendChild(parrafo);
    });

    div.appendChild(cardBody);
    itemsContainer.appendChild(div);
  });
}

/**
 * Función para que se muestren los filtros en la columna de botones
 */
function renderCarrito() {
  const carritoContainer = document.getElementById('totales');
  carritoContainer.innerHTML = '';
  
  const tituloFiltro = document.createElement("h1");
  tituloFiltro.textContent = "Filtros y totales";
  carritoContainer.appendChild(tituloFiltro);

  const subtituloFiltro = document.createElement("h3");
  subtituloFiltro.textContent = "Filtros rápidos";
  carritoContainer.appendChild(subtituloFiltro);

  const contenedorForm = document.createElement("form");

  const provincias = conseguirProvincias(bienes);
  provincias.forEach(provincia => {
    const divCheckbox = document.createElement("div");
    divCheckbox.classList.add("form-check");

    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input");
    checkbox.type = "checkbox";
    checkbox.id = provincia;
    checkbox.value = provincia;
    checkbox.addEventListener("change", handleCheckboxChange);

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.htmlFor = provincia;
    label.textContent = provincia;

    divCheckbox.appendChild(checkbox);
    divCheckbox.appendChild(label);
    contenedorForm.appendChild(divCheckbox);
  });

  carritoContainer.appendChild(contenedorForm);

  const resetButton = document.createElement("button");
  resetButton.textContent = "Resetear filtros";
  resetButton.addEventListener("click", botonVaciar);
  carritoContainer.appendChild(resetButton);

  // Obtener provincias únicas en el carrito
  const provinciasFiltradas = Array.from(new Set(carrito.map(bien => bien.province)));
  const filtroAplicado = document.createElement("p");
  filtroAplicado.textContent = provinciasFiltradas.length > 0 ? `Filtro aplicado: ${provinciasFiltradas.join(', ')}` : "Filtro aplicado: Ninguno";
  carritoContainer.appendChild(filtroAplicado);


  const totalInmuebles = document.createElement("p");
  totalInmuebles.textContent = `Total de inmuebles: ${carrito.length || bienes.length}`;
  carritoContainer.appendChild(totalInmuebles);
}

/**
 * Manejador para los cambios en los checkboxes
 */
function handleCheckboxChange(event) {
  const checkboxes = document.querySelectorAll('.form-check-input');
  const provinciasSeleccionadas = Array.from(checkboxes)
                                       .filter(checkbox => checkbox.checked)
                                       .map(checkbox => checkbox.value);

  if (provinciasSeleccionadas.length > 0) {
    carrito = bienes.filter(bien => provinciasSeleccionadas.includes(bien.province));
  } else {
    carrito = [];
  }

  renderCards(carrito);
  renderCarrito();
}

/**
 * Función para resetear los filtros y vuelve a pintarlo
 */
function botonVaciar(event) { 
    event.preventDefault();  // Evitar que el formulario se envíe
    carrito = []; // Reinicia el carrito a todos los bienes disponibles
    renderCards(); // Renderiza todas las tarjetas de nuevo
    document.querySelectorAll('.form-check-input').forEach(checkbox => checkbox.checked = false); // Desmarcar todos los checkboxes
    renderCarrito(); // Actualiza el carrito para mostrar el estado inicial
  }