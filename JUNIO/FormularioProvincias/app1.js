document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');
    
    const title = document.createElement('h1');
    title.classList.add('text-center');
    title.textContent = 'Formulario de Provincias';
    
    const form = document.createElement('form');
    form.id = 'provinciaForm';
    form.classList.add('mt-4');

    const formGroup1 = document.createElement('div');
    formGroup1.classList.add('form-group');

    const label1 = document.createElement('label');
    label1.htmlFor = 'provinciaSelect';
    label1.textContent = 'Seleccione una provincia:';

    const select = document.createElement('select');
    select.classList.add('form-control');
    select.id = 'provinciaSelect';

    // Uso de map para crear las opciones del select
    const opcionesProvincias = provincias.map(provincia => {
        const option = document.createElement('option');
        option.value = provincia;
        option.textContent = provincia;
        return option;
    });

    // Añadir las opciones al select
    opcionesProvincias.forEach(option => select.appendChild(option));

    formGroup1.appendChild(label1);
    formGroup1.appendChild(select);

    const formGroup2 = document.createElement('div');
    formGroup2.classList.add('form-group');

    const label2 = document.createElement('label');
    label2.htmlFor = 'inputNombre';
    label2.textContent = 'Nombre:';

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.id = 'inputNombre';
    input.placeholder = 'Introduzca su nombre';

    formGroup2.appendChild(label2);
    formGroup2.appendChild(input);

    const button = document.createElement('button');
    button.type = 'submit';
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Enviar';

    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(button);

    container.appendChild(title);
    container.appendChild(form);

    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    resultDiv.classList.add('mt-4');

    container.appendChild(resultDiv);
    body.appendChild(container);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = input.value;
        const provinciaSeleccionada = select.value;
        
        // Crear un conjunto de datos únicos usando Set
        const resultado = new Set();
        resultado.add(`Nombre: ${nombre}`);
        resultado.add(`Provincia: ${provinciaSeleccionada}`);
        
        // Mostrar el resultado en el DOM
        resultDiv.innerHTML = ''; // Limpiar resultados anteriores
        resultado.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            resultDiv.appendChild(p);
        });
    });
});
