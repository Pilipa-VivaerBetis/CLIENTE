//creo las constantes que necesito
const rememberDiv = document.querySelector(".remember");
const forgetDiv = document.querySelector(".forget");
const form = document.querySelector("form");
const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
const personalGreeting = document.querySelector(".personal-greeting");

//evitamos que el formulario se envié cuando se presiona un botón
form.addEventListener("submit", function (e) {
    e.preventDefault();
});

//ejecuta la función cuando se hace clic en el botón "saludar"
submitBtn.addEventListener("click", function(){
    //guarda el nombre ingresado en el almacenamiento web
    localStorage.setItem("name", nameInput.value);
    //ejecuta nameDisplayCheck() para ordenar la visualizacion del
    //saludo personalizado y actualización de la visualización del formulario
    nameDisplayCheck();
});
//definir la función nameDisplayCheck()
function nameDisplayCheck(){
    //comprobamos si el elemento de datos "name" está guardado
    //en el almacenamiento web
    if (localStorage.getItem("name")){
        //si es así, muestra un saludo personalizado
        let name = localStorage.getItem("name");
        h1.textContent = "Bienvenido, " + name;
        personalGreeting.textContent=
        "¡Bienvenido a nuestro sitio web, "+
        name +
        "! Esperamos que te diviertas mientras estés aquí.";
        //ocultar la parte "recordar" del formulario y mostrar la parte "olvidar"
        forgetDiv.style.display = "none";
        rememberDiv.style.display= "block";
    }
}
//ejecutar la función nameDisplayCheck() cada vez que se carga la página
document.body.onload = nameDisplayCheck;