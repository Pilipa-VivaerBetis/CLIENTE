const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {}//si quiero agregar la informacion al carrito, hago un objeto vacio
//y aqui dentro iré añadiendo cada objeto que se cree

document.addEventListener('DOMContentLoaded', () => {
    pintarCards(producto);
});
items.addEventListener('click', e => {
    addCarrito(e);//e es el elemento que quiero modificar, se describe en la constante más abajo
});
items.addEventListener('click', e => { btnAumentarDisminuir(e) });
const producto = [
    {
        "precio": 5,
        "id": 1,
        "titulo": "Café",
        "imagen": "taza.png"
    },
    {
        "precio": 15,
        "id": 2,
        "titulo": "Pizza",
        "imagen": "pizza.png"
    },
    {
        "precio": 5,
        "id": 3,
        "titulo": "Agua",
        "imagen": "agua.png"
    },
    {
        "precio": 25,
        "id": 4,
        "titulo": "Sandia",
        "imagen": "sandia.png"
    },
    {
        "precio": 30,
        "id": 5,
        "titulo": "Mango",
        "imagen": "mango.png"
    },
    {
        "precio": 15,
        "id": 6,
        "titulo": "Patata",
        "imagen": "patata.png"
    }
];

const pintarCards = (data) => {
    data.forEach((producto) => {
        // Clonar el template
        const clone = templateCard.cloneNode(true);

        // Modificar los elementos del template con los datos del producto actual
        clone.querySelector('h5').textContent = producto.titulo;
        clone.querySelector('p').textContent = `${producto.precio}€`;
        clone.querySelector('button').setAttribute('data-id', producto.id);

        // Añado la imagen del producto y sus atributo src
        const img = clone.querySelector('.card-img-top'); // Utiliza la clase o el selector adecuado para seleccionar el elemento img
        img.setAttribute('src', producto.imagen);
        img.setAttribute('alt', producto.titulo); // Puedes establecer un atributo alt para la accesibilidad

        // Agregar el producto clonado al fragmento
        fragment.appendChild(clone);
    });

    // Agregar todos los productos al contenedor de items en el DOM
    items.appendChild(fragment);
};
//ahora debo generar arriba añadir el evento para cada click 
//de los productos y que los detecte. Comienzo por nombrar la constante aqui
//y aquí estoy capturando todos los clic que haga encima de los productos y sus botones
const addCarrito = e => {
    // console.log(e.target)//para poder detectar sólo el boton de comprar
    // console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')) {

        setCarrito(e.target.parentElement)//asi voy empujando a que se guarde toda la inf del divY se añada al carrito
    }

    e.stopPropagation()//detiene los eventos que se generen del contenedor padre
}
const setCarrito = objeto => {//este objeto serán todos los click que vayamos seleccionando de los productos
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: parseFloat(objeto.querySelector('p').textContent.replace('€', '').trim()), // Convertir a número
        cantidad: 1
        //aumentamos la cantidad Y para acceder al objeto...
    };
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto };//generamos el index con su id de producto//empujamos el elemento dentro del carrito
    
    pintarCarrito();//pintar carrito se ejecuta cuando generamos un elemento
};
const pintarCarrito = () => {//funcion para pintar el carrito
    items.innerHTML = '';//limpar antes de agregar nuevos elementos

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad;
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);

    pintarFooter();
}
const pintarFooter = () => {
    footer.textContent = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>;
        `
        return;
    }}
 // sumar cantidad y sumar totales
//  const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
//  const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
 // console.log(nPrecio)

 templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
 templateFooter.querySelector('span').textContent = nPrecio;

 const clone = templateFooter.cloneNode(true);
 fragment.appendChild(clone);

 footer.appendChild(fragment);

 const boton = document.querySelector('#vaciar-carrito');
 boton.addEventListener('click', () => {
     carrito = {}
     pintarCarrito();
 })



const btnAumentarDisminuir = e => {
 // console.log(e.target.classList.contains('btn-info'))
 if (e.target.classList.contains('btn-info')) {
     const producto = carrito[e.target.dataset.id];
     producto.cantidad++;
     carrito[e.target.dataset.id] = { ...producto };
     pintarCarrito();
 }

 if (e.target.classList.contains('btn-danger')) {
     const producto = carrito[e.target.dataset.id]
     producto.cantidad--
     if (producto.cantidad === 0) {
         delete carrito[e.target.dataset.id]
     } else {
         carrito[e.target.dataset.id] = {...producto}
     }
     pintarCarrito();
 }
 e.stopPropagation();
}