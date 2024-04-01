//Declaro las variables globales
let carrito =[];

document.addEventListener("DOMContentLoaded", function(){
 renderCards();
//  renderBienes();

 const botonResetear =document.getElementById("boton-resetear");
 botonResetear.addEventListener('click', botonVaciar);
});

/**
 * Función que se encarga de mostrar todas las tarjetas de las provincias
 */
function renderCards(){
    const itemsContainer =document. getElementById('items');
    bienes.forEach(bien =>{
        const div = document. createElement("div");
        div.classList.add("card", "col-sm-9");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h2");
        title.classList.add("active_name");
        title.textContent = bienes.nombre;

        const subtitulo = document.createElement("h3");
        subtitulo.classList.add("counseling");
        subtitulo.textContent= bienes.subtitulo;
       
        const provincia = document.createElement("h2");
        provincia.classList.add("province");
        provincia.textContent= bienes.provincia;

        const uso = document. createElement("p");
        uso.classList.add("current_usage");
        uso.textContent = "current_usage";
        uso.addEventListener("click", addFiltro);

        cardBody.appendChild(title);
        cardBody.appendChild(subtitulo);
        cardBody.appendChild(provincia);
        cardBody.appendChild(uso);

        div.appendChild(cardBody);

        itemsContainer.appendChild(div);

    });

}

/**
 * Funcion para que se muestren los filtros en el array carrito
 *  */
function renderCarrito(){
    const carritoContainer = document.getElementById("carrito");
    carritoContainer.innerHTML = "";

    provincias.forEach(provincia=>{
        const button = document.createElement("button");
        button.classList.add("provincia");
        button.addEventListener("click", filtrarProvincia);

    })
    bienes.forEach(bien=> {
        const contador = 0;

    })

    
}
/**
 * Funcion encargada de añadir un filtro al carrito
 */
    function addFiltro(event){
        const filtroId = parseInt (event.target.dataset.id);
        carrito.push (filtroId);
        renderCarrito();
    }


// /**
//  * 
//  * Función para resetear los filtros y vuelve a pintarlo
//  */
function botonVaciar (){
    carrito =[];
    renderCarrito();
}