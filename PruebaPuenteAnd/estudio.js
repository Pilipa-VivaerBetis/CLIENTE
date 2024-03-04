//template string
const numero = (num1, num2) =>{
    return `el numero es: ${num1 + num2}`
}
const resultado = numero(10, 20)
console.log(resultado);

//objetos 
const mascota ={//se pone la propiedad y con dos puntos el dato
    nombre: 'Piru',
    edad: 10,
    vivo:true,
    razas:['siames', 'ruso']
}
console.log(mascota)//ya aqui al ser objeto accedo con punto
console.log(mascota.nombre)
console.log(mascota.edad)
console.log(mascota.razas[1])//de esta manera también puedo acceder a
//las caracteristicas del objeto que sean de tipo arrays

mascota.id=1//aqui puedo seguir añadiendo propiedades al objeto,
//pero al ser fuera de las llaves, no hace falta usar los : y si el =
console.log(mascota.id);

const web ={//objetos que tienen dentro otros objetos o destructuring objet
    nombre:'campusvertical',
    links:{
        enlace:'www.campusvertical.es'
    },
    redesSociales:{
        youtube: {
        enlace: 'youtube.com/campusvertical',
        nombre: 'campusvertical'
    }
}
}
console.log(web.redesSociales.youtube.enlace)
//tambien podría guardar el valor de todo estos enlaces en una constante
const enlaceYotu = web.redesSociales.youtube.enlace;
