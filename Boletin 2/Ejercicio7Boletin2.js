function cambiarEstilos(elemento) {
    // Agrega la clase 'clicado' al elemento clicado
    elemento.classList.toggle('clicado');
    // Agrega o elimina el contenido '✘' del elemento
  if (elemento.classList.contains('clicado')) {
    elemento.innerHTML = '✘ ' + elemento.innerHTML;
  } else {
    elemento.innerHTML = elemento.innerHTML.replace('✘ ', '');
  }
  }
  