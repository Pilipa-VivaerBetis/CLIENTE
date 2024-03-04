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
            renderizarRuta();
        }
    }

    function guardarDestinosEnLocalStorage() {
        localStorage.setItem('destinos', JSON.stringify(destinosSeleccionados));
    }

    function renderizarDestinos() {
        // Resto del código para renderizar destinos...
    }

    function agregarDestino(destino) {
        destinosSeleccionados.push(destino);
        guardarDestinosEnLocalStorage();
        renderizarRuta();
    }

    function eliminarDestino(index) {
        destinosSeleccionados.splice(index, 1);
        guardarDestinosEnLocalStorage();
        renderizarRuta();
    }

    function renderizarRuta() {
        // Resto del código para renderizar la ruta...
    }

    renderizarDestinos();
});
