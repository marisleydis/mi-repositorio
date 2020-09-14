var product = {};
var comments = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function obtenerRating(score) {
    let rating = "";
    for (let i = 0; i < 5; i++) {
        if (score > i) {
            rating += `<span class="fa fa-star checked"></span>`
        }
        else {
            rating += `<span class="fa fa-star"></span>`
        }
    }
    return rating;
}
function showProductComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];
        htmlContentToAppend += `
        <dt id="commentUser">` + comment.user + "&nbsp;&nbsp;&nbsp;" + obtenerRating(comment.score) + `</dt>
        <dd>
          <p id="commentDescription">` + comment.description + `</p>
          <p id="commentDate">` + new Date(comment.dateTime).toUTCString() + `</p>
        </dd>
        <hr class="my-3">
        `
        document.getElementById("productComments").innerHTML = htmlContentToAppend;
    }
}
function comentar() {
    let userHTML  = document.getElementById("user");
    let descriptionHTML  = document.getElementById("description");
    let ratingHTML = document.getElementById("rating");

    let comments = document.getElementById("productComments");
    let nuevoComentario = `
    <dt id="commentUser">` + userHTML.value + "&nbsp;&nbsp;&nbsp;" + obtenerRating(ratingHTML.value) + `</dt>
    <dd>
      <p id="commentDescription">` + descriptionHTML.value + `</p>
      <p id="commentDate">` + new Date().toUTCString() + `</p>
    </dd>
    <hr class="my-3">
    `;
    document.getElementById("productComments").innerHTML = nuevoComentario + comments.innerHTML;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let nameHTML  = document.getElementById("productName");
            let descriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");
        
            nameHTML.innerHTML = product.name + " (" + product.currency + " " + product.cost + ")";
            descriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            showProductComments(comments);
        }
    });
});