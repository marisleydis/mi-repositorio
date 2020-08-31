//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function esLoginValido() {
    var nombre = document.getElementById("nombre").value;
    var password = document.getElementById("password").value;

    if (nombre === "" || password === "") {
        alert("Debe ingresar nombre de usuario y clave.");

        return false;
    }
    
    localStorage.setItem("usuario", nombre);
    return true;
}