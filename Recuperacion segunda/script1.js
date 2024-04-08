//Declaro las variables globales
let carrito =[];

document.addEventListener("DOMContentLoaded", function(){
 renderCards();
//  renderBienes();

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
 * Funcion para que se muestren los filtros en el array carrito
 *  */
function renderCarrito(){
    const carritoContainer = document.getElementById('totales');
    carritoContainer.innerHTML =" ";

    const tituloFiltro=document.createElement("h1");
    tituloFiltro.textContent="Filtros y totales";

    const subtituloFiltro=document.createElement("h3");
    subtituloFiltro.textContent="Filtros rápidos";
    subtituloFiltro.classList.add('lado-derecho');

    provincias.forEach(provincia=>{
        const button = document.createElement("button");
        button.textContent=provincia;
        button.addEventListener("click", filtrarProvincia);

    })

    carritoContainer.appendChild (tituloFiltro);
    carritoContainer.appendChild (subtituloFiltro);
    carritoContainer.appendChild (provincia);

}

/**Función para filtrar provincias */
function filtrarProvincia(){

}

function filtrarUso(){

}

//  * Función para resetear los filtros y vuelve a pintarlo
function botonVaciar (){
    carrito =[];
    renderCarrito();
}