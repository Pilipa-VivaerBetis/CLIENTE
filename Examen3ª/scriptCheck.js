document.addEventListener("DOMContentLoaded", () => {
    const characterTableContainer = document.getElementById('characterTableContainer');
    const characterInfoContainer = document.getElementById('character-info');
    const episodeListContainer = document.getElementById('episode-list');
  
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
        
        checkbox.addEventListener('change', (event) => {
          if (event.target.checked) {
            mostrarInformacionPersonaje(personaje);
          }
        });
      });
    }
  
    /**
     * Función para obtener la lista de episodios en los que aparece un personaje.
     * @param {number} id - ID del personaje.
     * @returns {Promise<Array>} Lista de episodios.
     */
    function obtenerEpisodios(id) {
      return new Promise((resolve) => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
          .then(response => response.json())
          .then(data => resolve(data.episode))
          .catch(error => {
            console.error('Error al obtener episodios:', error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Error al obtener los episodios. Intente de nuevo más tarde.';
            episodeListContainer.appendChild(errorMsg);
          });
      });
    }
  
    /**
     * Función para mostrar la información del personaje y, después de 3 segundos,
     * mostrar la lista de episodios en los que aparece.
     * @param {Object} personaje - Objeto del personaje con su información.
     */
    function mostrarInformacionPersonaje(personaje) {
      // Limpiar contenedores
      characterInfoContainer.innerHTML = '';
      episodeListContainer.innerHTML = '';
      
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
  
      // Mostrar episodios después de 3 segundos
      setTimeout(() => {
        obtenerEpisodios(personaje.id)
          .then(episodios => {
            // Limpiar información del personaje
            characterInfoContainer.innerHTML = '';
            
            // Mostrar el total de episodios
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
          .catch(errorMsg => {
            const errorP = document.createElement('p');
            errorP.textContent = errorMsg;
            episodeListContainer.appendChild(errorP);
          });
      }, 3000);
    }
  
    // Llamar a la función para mostrar personajes al cargar el DOM
    mostrarPersonajes();
  });
  