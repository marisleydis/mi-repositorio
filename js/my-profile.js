//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var profile = localStorage.getItem("profile");
    if (profile != null && profile != "" && profile != undefined)
    {
        var data = JSON.parse(profile);

        for(key in data) {
            if(data.hasOwnProperty(key))
                $('input[name='+key+']').val(data[key]);
        }
    }
    
    var buttonSaveProfile = document.getElementById("saveProfile");
    buttonSaveProfile.addEventListener("click", function(e) {
        var data = {};
        $("#formProfile").serializeArray().map(function(x){data[x.name] = x.value;}); 
        localStorage.setItem("profile", JSON.stringify(data));
        $("#formProfile").append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert" style="display:none">
                Datos del perfil guardados satisfactoriamente!.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
        $('.alert').show();
    });
});