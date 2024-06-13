// Declarar variables fuera del manejador de DOMContentLoaded
let characterTableContainer;
let characterInfoContainer;
let episodeListContainer;

document.addEventListener("DOMContentLoaded", () => {
  // Obtener referencias a los contenedores del DOM
  characterTableContainer = document.getElementById('characterTableContainer');
  characterInfoContainer = document.getElementById('character-info');
  episodeListContainer = document.getElementById('episode-list');

  // Llamar a la función para mostrar personajes al cargar el DOM
  mostrarPersonajes();
});

/**
 * Función para obtener la lista de personajes desde la API de Rick and Morty.
 * @returns {Promise<Array>} Lista de personajes.
 */
async function obtenerPersonajes() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Error al obtener los personajes. Intente de nuevo más tarde.';
    characterTableContainer.appendChild(errorMsg);
    return null;
  }
}

/**
 * Función para mostrar la lista de personajes como checkboxes en el contenedor.
 */
async function mostrarPersonajes() {
  const personajes = await obtenerPersonajes();
  if (!personajes) return;

  personajes.forEach(personaje => {
    const div = document.createElement('div');
    div.className = 'form-check';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input';
    checkbox.id = `personaje-${personaje.id}`;
    checkbox.setAttribute('data-character-id', personaje.id);

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = checkbox.id;
    label.textContent = `${personaje.name} - ${personaje.status} - ${personaje.species}`;

    div.appendChild(checkbox);
    div.appendChild(label);
    characterTableContainer.appendChild(div);
  });

  // Añadir un botón para manejar la selección de checkboxes
  const botonMostrarEpisodios = document.createElement('button');
  botonMostrarEpisodios.textContent = 'Mostrar Episodios';
  botonMostrarEpisodios.className = 'btn btn-primary mt-3';
  characterTableContainer.appendChild(botonMostrarEpisodios);

  botonMostrarEpisodios.addEventListener('click', manejarSeleccionPersonajes);
}

/**
 * Función para manejar la selección de personajes y mostrar la información de los episodios.
 */
function manejarSeleccionPersonajes() {
  // Obtener todos los checkboxes seleccionados
  const checkboxesSeleccionados = document.querySelectorAll('.form-check-input:checked');

  // Limpiar contenedores
  characterInfoContainer.innerHTML = '';
  episodeListContainer.innerHTML = '';

  // Iterar sobre cada checkbox seleccionado y mostrar información del personaje
  checkboxesSeleccionados.forEach(checkbox => {
    const personajeId = checkbox.getAttribute('data-character-id');

    fetch(`https://rickandmortyapi.com/api/character/${personajeId}`)
      .then(response => response.json())
      .then(personaje => mostrarInformacionPersonaje(personaje))
      .catch(error => {
        console.error('Error al obtener información del personaje:', error);
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Error al obtener la información del personaje. Intente de nuevo más tarde.';
        episodeListContainer.appendChild(errorMsg);
      });
  });
}

/**
 * Función para mostrar la información del personaje y sus episodios.
 * @param {Object} personaje - Objeto del personaje con su información.
 */
function mostrarInformacionPersonaje(personaje) {
  // Crear y mostrar información del personaje
  const contenedor = document.createElement('div');
  contenedor.className = 'text-center';

  const img = document.createElement('img');
  img.id = 'character-image';
  img.src = personaje.image;
  img.alt = personaje.name;

  const info = document.createElement('div');
  info.id = 'character-details';
  info.textContent = `${personaje.name} - ${personaje.status} - ${personaje.species}`;

  contenedor.appendChild(img);
  contenedor.appendChild(info);
  characterInfoContainer.appendChild(contenedor);

  // Obtener y mostrar episodios
  fetch(`https://rickandmortyapi.com/api/character/${personaje.id}`)
    .then(response => response.json())
    .then(data => {
      const episodios = data.episode;

      // Crear y mostrar el total de episodios
      const totalEpisodios = document.createElement('p');
      totalEpisodios.className = 'total-episodes';
      totalEpisodios.textContent = `Total de episodios: ${episodios.length}`;
      episodeListContainer.appendChild(totalEpisodios);

      // Crear y mostrar la lista de episodios
      const listaEpisodios = document.createElement('ul');
      episodios.forEach(ep => {
        const item = document.createElement('li');
        item.textContent = ep;
        listaEpisodios.appendChild(item);
      });
      episodeListContainer.appendChild(listaEpisodios);
    })
    .catch(error => {
      console.error('Error al obtener episodios:', error);
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Error al obtener los episodios. Intente de nuevo más tarde.';
      episodeListContainer.appendChild(errorMsg);
    });
}
