
// document.querySelector('h2')
// console.log(document.querySelector('h2'))
// console.log(document.querySelector('.infoDestino'))
// console.log(document.querySelector('.precioAlojamiento'))//acceder a clases es con .
// console.log(document.getElementById('contenedorImagen'))//aqui me sale null???
document.addEventListener("DOMContentLoaded", function(){
const titulo = document.querySelector('h1');
titulo.textContent = '¡Elije tu ruta para el Puente de Andalucia!';

const parrafos = document.querySelectorAll('.infoDestino');
parrafos.forEach(parrafo=> {
    parrafo.textContent = 'Cambio el texto desde JS'
});

// ---------------GENERO UNA LISTA--------------------------------
const lista = document.getElementById('lista');//accedo y le doy una const al id lista
// console.log('lista')

const arrayDestinos = ['Sevilla', 'Málaga', 'Cádiz', 'Córdoba', 'Huelva', 'Jaén', 'Granada']
// arrayDestinos.forEach(item=>{
//     // console.log(item)
//     const li = document.createElement('li')//aqui creo un elemento li
//     li.textContent = item//y aquí le pongo un texto al primer li
//     lista.appendChild(li)//aquí posiciono el li, dentro del ul, con id lista
// }) 
arrayDestinos.forEach(item =>{
    lista.innerHTML += `<li>${item}</li>`;//así puedo mezclar con $ pinto los elementos de la lista
    //y hago todo lo anterior en una sola línea. Aunque puede darme reflow...y sería un problema

});

//---------------Add Event Listener--------------------
const contenedor = document.querySelector('.calculadoraRuta')
// const btnSumar = document.querySelector('.botonSumar')//selecciono la clase que le puse al boton de Sumar
// const btnRestar = document.querySelector('.botonRestar')//selecciono la clase que le puse al boton de Restar
const span = document.getElementById('span');
let contador =0;

// btnSumar.addEventListener('click', ()=>{//le añado un avisador de eventos click
//     console.log ('me diste click en sumar')
//     contador++;
//     span.textContent = contador;//le añado texto al span
// })

// btnRestar.addEventListener('click', ()=>{//igual que lo anterior pero para restar
//     contador--;
//     span.textContent = contador;
// })
contenedor.addEventListener('click', (e)=>{//se genera el evento click dentro del div CalculadoraRuta
    // console.log(e.target)
    // console.log(e.target.classList.contains('botonSumar'))
    if((e.target.classList.contains('botonSumar'))){//cuando la clase contenga 'botonSumar' es cuando se sumará
        contador++;
        span.textContent = contador;

    }
    if((e.target.classList.contains('botonRestar'))){//cuando la clase contenga 'botonRestar' es cuando se restará
        contador--;
        span.textContent = contador;
        e.stopPropagation();//con esto evito que se hagan click fuera del contenedor y sea solo dentro del div y no en el body
    }
})//esta manera de poner los eventos en mejor, xq se detecta en todo el div
document.body.addEventListener('click', e => {console.log('body')})


})