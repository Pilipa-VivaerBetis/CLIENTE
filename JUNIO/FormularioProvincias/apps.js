document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Crear y añadir el contenedor principal
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');

    // Crear y añadir el título
    const title = document.createElement('h1');
    title.classList.add('text-center');
    title.textContent = 'Formulario de Provincias';
    container.appendChild(title);

    // Crear y añadir el formulario
    const form = document.createElement('form');
    form.id = 'provinciaForm';
    form.classList.add('mt-4');

    // Crear y añadir el primer grupo del formulario
    const formGroup1 = document.createElement('div');
    formGroup1.classList.add('form-group');

    const label1 = document.createElement('label');
    label1.htmlFor = 'provinciaSelect';
    label1.textContent = 'Seleccione una provincia:';
    formGroup1.appendChild(label1);

    const select = document.createElement('select');
    select.classList.add('form-control');
    select.id = 'provinciaSelect';

    // Añadir opciones al select
    provincias.forEach(provincia => {
        const option = document.createElement('option');
        option.value = provincia;
        option.textContent = provincia;
        select.appendChild(option);
    });
    formGroup1.appendChild(select);

    // Crear y añadir el segundo grupo del formulario
    const formGroup2 = document.createElement('div');
    formGroup2.classList.add('form-group');

    const label2 = document.createElement('label');
    label2.htmlFor = 'inputNombre';
    label2.textContent = 'Nombre:';
    formGroup2.appendChild(label2);

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.id = 'inputNombre';
    input.placeholder = 'Introduzca su nombre';
    formGroup2.appendChild(input);

    // Crear y añadir el botón de enviar
    const button = document.createElement('button');
    button.type = 'submit';
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Enviar';
    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(button);

    // Añadir el formulario al contenedor
    container.appendChild(form);

    // Añadir el contenedor al cuerpo del documento
    body.appendChild(container);
});
