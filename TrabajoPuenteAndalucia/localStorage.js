document.addEventListener('DOMContentLoaded', function () {
    const provincias = [
        {
            id: 1,
            nombre: "Sevilla",
            costoAlojamiento: 50,
            costoAlimentacion: 30,
            imagen: "sevilla.png"
        },
        {
            id: 2,
            nombre: "Almería",
            costoAlojamiento: 12,
            costoAlimentacion: 22,
            imagen: "almeria.png"
        },
        {
            id: 3,
            nombre: "Granada",
            costoAlojamiento: 50,
            costoAlimentacion: 34,
            imagen: "granada.png"
        },
        {
            id: 4,
            nombre: "Málaga",
            costoAlojamiento: 60,
            costoAlimentacion: 35,
            imagen: "malaga.png"
        },
        {
            id: 5,
            nombre: "Huelva",
            costoAlojamiento: 24,
            costoAlimentacion: 15,
            imagen: "huelva.png"
        },
        {
            id: 6,
            nombre: "Jaén",
            costoAlojamiento: 32,
            costoAlimentacion: 15,
            imagen: "jaen.png"
        },
        {
            id: 7,
            nombre: "Cádiz",
            costoAlojamiento: 24,
            costoAlimentacion: 17,
            imagen: "cadiz.png"
        },
        {
            id: 8,
            nombre: "Córdoba",
            costoAlojamiento: 28,
            costoAlimentacion: 20,
            imagen: "cordoba.png"
        }
    ];

    const contenedorDestinos = document.querySelector('.destinos');
    const listaRuta = document.getElementById('listaRuta');
    const totalDiasElemento = document.getElementById('totalDias');
    const costoTotalElemento = document.getElementById('costoTotal');
    let destinosSeleccionados = [];

    // Cargar destinos desde localStorage al cargar la página
    cargarDestinosDesdeLocalStorage();

    function cargarDestinosDesdeLocalStorage() {
        const destinosGuardados = localStorage.getItem('destinos');
        if (destinosGuardados) {
            destinosSeleccionados = JSON.parse(destinosGuardados);
            cargarRutas();
        }
    }

    function guardarDestinosEnLocalStorage() {
        localStorage.setItem('destinos', JSON.stringify(destinosSeleccionados));
    }
    //cargar destinos del json(en este ejercicio lo tengo insertado en el html!!!)
    function cargarDestinos() {
        contenedorDestinos.innerHTML = ''; // Limpiamos el contenedor
        provincias.forEach(destino => {
            const destinoDiv = document.createElement('div');//creamos el div destino
            destinoDiv.classList.add('destino');//y se le añade la clase= destino

            const imagenDestino = document.createElement('img');//creamos los elementos imágenes en el div class=destinos
            imagenDestino.src = destino.imagen;//le damos las etiquetas src a las imagenes
            imagenDestino.alt = destino.nombre;

            const infoDestino = document.createElement('div');//creo el div para poner la informacion del destino
            infoDestino.innerHTML = //uso las comillas invertidas para poder insertar js en html y lo concateno
            `   <h3>${destino.nombre}</h3>
                <p>Costo alojamiento: ${destino.costoAlojamiento}€</p>
                <p>Costo alimentación: ${destino.costoAlimentacion}€</p>
                <button class="botonAgregar">Añadir a la ruta</button>
            `;
            //pongo el evento de hacer clic para agregar los destinos
            infoDestino.querySelector('.botonAgregar').addEventListener('click', () => agregarDestino(destino));

            //pongo ya en el nodo padre las tres partes que hemos creado para que se repitan
            destinoDiv.appendChild(imagenDestino);
            destinoDiv.appendChild(infoDestino);

            contenedorDestinos.appendChild(destinoDiv);
        });
    }

    function agregarDestino(destino) {
        destinosSeleccionados.push(destino);
        guardarDestinosEnLocalStorage();
        cargarRutas
        cargarRutas();
    }

    function eliminarDestino(index) {
        destinosSeleccionados.splice(index, 1);
        guardarDestinosEnLocalStorage();
        cargarRutas();
    }

    function cargarRutas() {
        listaRuta.innerHTML = '';
        totalDias = destinosSeleccionados.length; // Actualizamos el total de días
        costoTotal = 0; // Reiniciamos el costo total

        destinosSeleccionados.forEach((destino, index) => {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `${destino.nombre} - Costo alojamiento: ${destino.costoAlojamiento}€ - Costo alimentación: ${destino.costoAlimentacion}€ <button class="botonEliminar">Eliminar</button>`;//uso de template string con las ``
            elementoLista.querySelector('.botonEliminar').addEventListener('click', () => eliminarDestino(index));
            listaRuta.appendChild(elementoLista);

            costoTotal += destino.costoAlojamiento + destino.costoAlimentacion;
        });

        totalDiasElemento.textContent = totalDias;
        costoTotalElemento.textContent = costoTotal;
    }

    cargarDestinos();
});
