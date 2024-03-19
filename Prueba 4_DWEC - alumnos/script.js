// Espacio para declarar (¿inicializar?) variables globales
let carrito = [];

document.addEventListener("DOMContentLoaded", function() {
  renderProductos();
  renderCarrito();

  const botonVaciar = document.getElementById("boton-vaciar");
  botonVaciar.addEventListener('click', vaciarCarrito);
});

/**
 * Funcion que se encarga de mostrar todos los productos del archivo JSON
 */
function renderProductos() {
  const itemsContainer = document.getElementById("items");
  extras.forEach(extra => {
    const div = document.createElement("div");
    div.classList.add("card", "col-sm-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = extra.nombre;

    const image = document.createElement("img");
    image.classList.add("img-fluid");
    image.src = extra.imagen;

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = extra.precio.toFixed(2) + "€";

    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = "+";
    button.setAttribute("data-id", extra.id);
    button.addEventListener("click", addExtra);

    cardBody.appendChild(title);
    cardBody.appendChild(image);
    cardBody.appendChild(price);
    cardBody.appendChild(button);

    div.appendChild(cardBody);

    itemsContainer.appendChild(div);
  });
}

/**
 * Función que muestra todos los productos guardados en el array carrito
 */
function renderCarrito() {
  const carritoContainer = document.getElementById("carrito");
  carritoContainer.innerHTML = "";

  const carritoSinDuplicados = Array.from(new Set(carrito));
  carritoSinDuplicados.forEach(item => {
    const count = carrito.filter(extra => extra === item).length;
    const extra = extras.find(extra => extra.id === item);
    const li = document.createElement("li");
    li.classList.add("list-group-item", "text-right", "mx-2");
    li.textContent = `${count} x ${extra.nombre} - ${(count * extra.precio).toFixed(2)}€`;

    const button = document.createElement("button");
    button.textContent = "X";
    button.classList.add("btn", "btn-danger", "mx-5");
    button.dataset.item = item;
    button.addEventListener("click", borrarItemCarrito);

    li.appendChild(button);
    carritoContainer.appendChild(li);
  });

  document.getElementById("total").textContent = calcularTotal().toFixed(2);
}

/**
 * Función encargada de añadir un producto al carrito de la compra
 */
function addExtra(event) {
  const extraId = parseInt(event.target.dataset.id);
  carrito.push(extraId);
  renderCarrito();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(event) {
    const itemId = parseInt(event.target.dataset.item);
    const count = carrito.filter(item => item === itemId).length;
    
    // Si hay más de un extra del mismo tipo, preguntar al usuario
    if (count > 1) {
      const confirmarBorrado = confirm(`¿Deseas eliminar todos los ${count} extras de este tipo?`);
      if (confirmarBorrado) {
        eliminarExtras(itemId);
      } else {
        // Si el usuario cancela la eliminación de todos, eliminar solo uno
        eliminarUnExtra(itemId);
      }
    } else {
      // Si solo hay uno, eliminarlo directamente
      eliminarUnExtra(itemId);
    }
    
    renderCarrito();
  }
  /**
   * Función para eliminar un solo extra del carrito
   */
function eliminarUnExtra(itemId){
    const index = carrito.findIndex(item => item === itemId);
        carrito.splice(index, 1);
}
/**
 * Función para eliminar todos los extras del mismo tipo del carrito
 * 
 */
function eliminarExtras (itemId){
    carrito = carrito.filter(item => item !== itemId);
}
/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  return carrito.reduce((total, itemId) => {
    const extra = extras.find(extra => extra.id === itemId);
    return total + extra.precio;
  }, 0);
}

/**
 * Función que vacía el carrito y vuelve a pintarlo
 */
function vaciarCarrito() {
  carrito= [];
  renderCarrito();
}
