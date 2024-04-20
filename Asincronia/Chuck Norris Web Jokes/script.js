document.addEventListener("DOMContentLoaded", function() {
    const randomButton = document.getElementById("randomButton");
    const categoryButton = document.getElementById("categoryButton");
    const textButton = document.getElementById("textButton");
    const jokeDisplay = document.getElementById("jokeDisplay");

    randomButton.addEventListener("click", obtenerChisteAleatorio);
    categoryButton.addEventListener("click", obtenerChistePorCategoria);
    textButton.addEventListener("click", buscarChiste);

    function obtenerChisteAleatorio() {
        fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(data => {
                mostrarChiste(data.value);
            })
            .catch(error => console.error("Error al obtener chiste aleatorio:", error));
    }

    function obtenerChistePorCategoria() {
        const categoryInput = document.getElementById("categoryInput").value;
        fetch(`https://api.chucknorris.io/jokes/random?category=${categoryInput}`)
            .then(response => response.json())
            .then(data => {
                mostrarChiste(data.value);
            })
            .catch(error => console.error(`Error al obtener chiste de la categoría ${categoryInput}:`, error));
    }

    function buscarChiste() {
        const textInput = document.getElementById("textInput").value;
        fetch(`https://api.chucknorris.io/jokes/search?query=${textInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.total === 0) {
                    jokeDisplay.textContent = "No se encontraron chistes.";
                } else {
                    const randomIndex = Math.floor(Math.random() * data.result.length);
                    const chiste = data.result[randomIndex].value;
                    mostrarChiste(chiste);
                }
            })
            .catch(error => console.error("Error al buscar chiste:", error));
    }

    function mostrarChiste(chiste) {
        jokeDisplay.textContent = chiste;
    }
});
