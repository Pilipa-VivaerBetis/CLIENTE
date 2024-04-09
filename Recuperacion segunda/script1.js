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
        //uso.dataset.id=bien.id;//Añadir ID de bien como dataset para usar en el filtro
        //uso.dataset.tipo = 'uso'; // Establecer tipo de filtro como 'uso'
        uso.addEventListener("click", filtrarUso);

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
    const carritoContainer      = document.getElementById('totales');
    carritoContainer.innerHTML  = " ";

    const tituloFiltro          = document.createElement("h1");
    tituloFiltro.textContent    = "Filtros y totales";

    const subtituloFiltro       = document.createElement("h3");
    subtituloFiltro.textContent = "Filtros rápidos";
    
    carritoContainer.appendChild(tituloFiltro);
    carritoContainer.appendChild(subtituloFiltro);

    const contenedorLista = document.createElement("ul");
    
    provincias.forEach(provincia=>{
        
        // Crear elemento li
        const listaProvincia= document.createElement("li");

        // Crear elemento boton
        const button        = document.createElement("button");
        button.textContent  = provincia;
        button.addEventListener("click", filtrarProvincia);

        // Crear elemento span
        const conteo = document.createElement("span");
        // Contar los bienes por provincia y actualizar el span
        conteo.textContent = `(${bienes.filter(bien => bien.province === provincia).length})`;
        // TODO

        //Añadir boton y span al li
        listaProvincia.appendChild(button);
        listaProvincia.appendChild(conteo);

        // Añadir el li al ul
        contenedorLista.appendChild(listaProvincia);
    })

    // Añadir ul al dom
    carritoContainer.appendChild(contenedorLista);

    // Creamos boton reset
    const resetButton       = document.createElement("button");
    resetButton.textContent = "Resetear filtros";
    resetButton.addEventListener("click", botonVaciar);
    
    // Añadimos boton reset
    carritoContainer.appendChild(resetButton);

    //añado texto de filtro aplicado
    const filtroAplicado =  document.createElement("p");
    filtroAplicado.textContent = "Filtro aplicado:";
    //sumatorio del total inmuebles o bienes
    const totalInmuebles  = bienes.length;
    //bienes es un numero tendré que hacerlo en html
    //totalInmuebles
    
    
    carritoContainer.appendChild(filtroAplicado);
    //añadir total inmuebles 
    carritoContainer.appendChild(totalInmuebles);

}

/**Función para filtrar provincias
 * @param {string} provincia Nombre de la provincia seleccionada
 */

function filtrarProvincia(provincia){

}

function filtrarUso(){

}

//  * Función para resetear los filtros y vuelve a pintarlo
function botonVaciar (){
    carrito =[];
    renderCarrito();
}