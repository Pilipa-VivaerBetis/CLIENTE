document.addEventListener("DOMContentLoaded", function() {
const provincias =[
    {
        id: 1,
        nombre: "Sevilla",
        coste_alojamiento: 50,
        coste_alimentacion: 30,
        imagen: "sevilla.png"
    },
    {
        id: 2,
        nombre: "Almeria",
        coste_alojamiento: 12,
        coste_alimentacion: 22,
        imagen: "almeria.png"
    },
    {
        id:3,
        nombre: "Granada",
        coste_alojamiento: 50,
        coste_alimentacion:34,
        imagen:"granada.png"
    },
    {
        id: 4,
        nombre: "Málaga",
        coste_alojamiento: 60,
        coste_alimentacion: 35,
        imagen: "málaga.png"
    },
    {
        id: 5,
        nombre: "Huelva",
        coste_alojamiento: 24,
        coste_alimentacion:15,
        imagen: "huelva.png"
    },
    {
        id: 6,
        nombre: "Jaen",
        coste_alojamiento: 32,
        coste_alimentacion: 15,
        imagen: "jaen.png"
    },
    {
        id: 7,
        nombre: "Cádiz",
        coste_alojamiento: 24,
        coste_alimentacion: 17,
        imagen: "cádiz.png"
    },
    {
        id: 8,
        nombre: "Córdoba",
        coste_alojamiento: 28,
        coste_alimentacion: 20,
        imagen: "córdoba.png"

    }
     
];


// let boton = document.querySelector("button");
// let contadorDiasDestino=0;

// boton.addEventListener("click",()=>{
//     contadorDiasDestino++;
//     console.log(contadorDiasDestino);
// })

// function crearDestino(){
let contenedorDestino= document.createElement('div');//creo el primer div de los destinos
contenedorDestino.setAttribute("class", "contenedorDestino");

contenedorDestino.setAttribute('id', "1");
contenedorDestino.appendChild('body');
// let nombreCiudad = document.createElement("h2");
// nombreCiudad = textContent("Destinos en Andalucia");

let encabezado = document.createElement("h2");
let parrafoAlojamiento = textContent("Precio alojamiento");

let precioAlojamiento =document.createElement("span");
// precioAlojamiento.textContent = "12", "precioAlojamiento";

parrafoAlojamiento.innerHTML = 'Coste alojamiento: </br> ${precioAlojamiento}';

let precioAlimentacion = document.createElement("span");
precioAlimentacion.innerHTML = 'Coste alimentación: </br> ${precioAlimentacion}';
// }
// crearDestino();


})