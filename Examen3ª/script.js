document.addEventListener("DOMContentLoaded", async () => {
    const characterTableContainer = document.getElementById("characterTableContainer");
    const characterInfo = document.getElementById("character-info");
    const episodeList = document.getElementById("episode-list");

    try {
        // Función para obtener la lista de personajes
        const conseguirListaPersonajes = async () => {
            const response = await fetch("https://rickandmortyapi.com/api/character");
            const data = await response.json();
            return data.results;
        };

        // Función para obtener la lista de episodios de un personaje
        const conseguirEpisodios = async (characterId) => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const data = await response.json();
            return data.episode;
        };

        // Función para crear la tabla de personajes
        const crearTablaPersonajes = async () => {
            const characters = await conseguirListaPersonajes();

            const table = document.createElement("table");
            table.classList.add("table", "table-hover");

            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");

            const headerRow = document.createElement("tr");
            const nameHeader = document.createElement("th");
            nameHeader.textContent = "Nombre";
            headerRow.appendChild(nameHeader);
            const statusHeader = document.createElement("th");
            statusHeader.textContent = "Estado";
            headerRow.appendChild(statusHeader);
            const speciesHeader = document.createElement("th");
            speciesHeader.textContent = "Especie";
            headerRow.appendChild(speciesHeader);

            thead.appendChild(headerRow);

            characters.forEach((character) => {
                const row = document.createElement("tr");
                const nameCell = document.createElement("td");
                nameCell.textContent = character.name;
                row.appendChild(nameCell);

                const statusCell = document.createElement("td");
                statusCell.textContent = character.status;
                row.appendChild(statusCell);

                const speciesCell = document.createElement("td");
                speciesCell.textContent = character.species;
                row.appendChild(speciesCell);

                row.addEventListener("click", async () => {
                    try {
                        // Muestra la información del personaje
                        characterInfo.innerHTML = `<img id="character-image" src="${character.image}" alt="${character.name}">
                                                   <div id="character-details">
                                                       <p><strong>Nombre:</strong> ${character.name}</p>
                                                       <p><strong>Estado:</strong> ${character.status}</p>
                                                       <p><strong>Especie:</strong> ${character.species}</p>
                                                   </div>`;

                        // Espera 3 segundos antes de mostrar la lista de episodios
                        await new Promise(resolve => setTimeout(resolve, 3000));

                        //eliminar inemeditamente la info anterior

                        // Obtiene los episodios del personaje
                        const episodes = await conseguirEpisodios(character.id);

                        // Muestra la lista de episodios
                        episodeList.innerHTML = `<p class="total-episodes">Total de episodios: ${episodes.length}</p>
                                                 <ul>${episodes.map(episode => `<li>${episode}</li>`).join("")}</ul>`;
                    } catch (error) {
                        console.error("Error al obtener episodios:", error);
                    }
                });

                tbody.appendChild(row);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            characterTableContainer.appendChild(table);
        };

        // Crea la tabla de personajes al cargar la página
        await crearTablaPersonajes();
    } catch (error) {
        console.error("Error al obtener personajes:", error);
    }
});
