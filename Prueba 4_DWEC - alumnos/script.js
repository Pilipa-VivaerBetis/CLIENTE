// Variables globales
let carrito = [];

// Manejador de eventos cuando la página se ha cargado completamente
document.addEventListener('DOMContentLoaded', function() {
    renderProductos(); // Mostrar productos disponibles
    renderCarrito(); // Mostrar carrito de compras
});

// Función para mostrar los productos disponibles
function renderProductos() {
    const itemsContainer = document.getElementById('items');

    extras.forEach(extra => {
        // Crear elemento de producto
        const itemCard = document.createElement('div');
        itemCard.classList.add('card', 'col-sm-4');

        // Crear cuerpo de la tarjeta
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Agregar título del extra
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = extra.nombre;

        // Agregar imagen del extra
        const image = document.createElement('img');
        image.classList.add('img-fluid');
        image.src = extra.imagen;

        // Agregar precio del extra
        const price = document.createElement('p');
        price.classList.add('card-text');
        price.textContent = `${extra.precio} €`;

        // Agregar botón de añadir al carrito
        const addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn-primary');
        addButton.textContent = '+';
        addButton.dataset.id = extra.id;
        addButton.addEventListener('click', addExtra);

        // Agregar elementos al cuerpo de la tarjeta
        cardBody.appendChild(title);
        cardBody.appendChild(image);
        cardBody.appendChild(price);
        cardBody.appendChild(addButton);

        // Agregar cuerpo de la tarjeta al elemento de producto
        itemCard.appendChild(cardBody);

        // Agregar elemento de producto al contenedor de productos
        itemsContainer.appendChild(itemCard);
    });
}

// Función para añadir un extra al carrito
function addExtra(event) {
    const extraId = parseInt(event.target.dataset.id);

    // Encontrar el extra en el array de extras
    const extra = extras.find(extra => extra.id === extraId);

    // Añadir el extra al carrito
    carrito.push(extra);

    // Actualizar la visualización del carrito
    renderCarrito();
}

// Función para renderizar el carrito
function renderCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = ''; // Limpiar el contenido actual del carrito

    carrito.forEach(extra => {
        // Crear elemento de extra en el carrito
        const item = document.createElement('li');
        item.classList.add('list-group-item', 'text-right', 'mx-2');
        item.textContent = `${extra.nombre} - ${extra.precio} €`;

        // Agregar botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'mx-5');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => removeExtra(extra.id));

        // Agregar botón de eliminar al elemento del carrito
        item.appendChild(deleteButton);

        // Agregar elemento del carrito al contenedor del carrito
        carritoContainer.appendChild(item);
    });

    // Calcular y mostrar el total
    const totalElement = document.getElementById('total');
    const total = carrito.reduce((acc, extra) => acc + extra.precio, 0);
    totalElement.textContent = total.toFixed(2);
}

// Función para eliminar un extra del carrito
function removeExtra(extraId) {
    carrito = carrito.filter(extra => extra.id !== extraId);
    renderCarrito();
}
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
// Función para vaciar el carrito
document.getElementById('boton-vaciar').addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
    carrito = [];
    renderCarrito();
};

})
