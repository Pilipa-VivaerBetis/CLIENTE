fetch('https://api.chucknorris.io/jokes/random')
    .then(response => {
        // Verificar si la respuesta fue buena
        if (!response.ok) {
            throw new Error('Error al obtener el chiste: ' + response.statusText);
        }
        // Convertir la respuesta a JSON
        return response.json();
    })
    .then(data => {
        // Trabajar con los datos del chiste
        console.log(data.value);
    })
    .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error:', error);
    });
