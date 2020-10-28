let articlesArray = [];

function showArticlesList(articles){
    let htmlContentToAppend = "";
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    articlesArray = articles;
    for(let i = 0; i < articles.length; i++){
        let article = articles[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-2">
                    <img src="` + article.src + `" alt="` + article.name + `" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <span>`+ article.name + `</span>
                </div>
                <div class="col-1"><input type="text" id="article-count-`+ i +`" class="text-right" name="article-count" value="` + article.count + `" size="3" placeholder="0" onchange="actualizarCarrito()" onkeyup="this.onchange();" onpaste="this.onchange();" oninput="this.onchange();"></div>
                <div class="col-2 text-right">` + article.unitCost + `</div>
                <div class="col-1 text-right" id="article-price-`+ i +`">` + article.count * article.unitCost + `</div>
                <div class="col-1">` + article.currency + `</div>
                <div class="col-1"><button id="remove-` + i + `" onclick="eliminarArticulo(this)">X</button></div>
            </div>
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
    actualizarCarrito();
}

function finalizarCompra() {
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            alert(resultObj.data.msg);
        }
    });
}

function actualizarPago() {
    let payment = document.getElementById("payment-type");
    let type = payment.options[payment.selectedIndex].text;

    document.getElementById("resumen-pago").innerText = type;

    actualizarCarrito();
}

function eliminarArticulo(element) {
    let index = element.id.replace("remove-", "");
    articlesArray.splice(index, 1);
    showArticlesList(articlesArray);
}

function actualizarCarrito() {
    let subtotal = 0;
    let shipping = 0;
    let total = 0;
    for(let i = 0; i < articlesArray.length; i++){
        let article = articlesArray[i];
        let price = 0;
        let count = document.getElementById("article-count-" + i).value;
        articlesArray[i].count = count;
        if(article.currency === "UYU") {
            price = count * article.unitCost;
        } else {
            price = count * article.unitCost * 40;
        }

        document.getElementById("article-price-" + i).innerText =  count * article.unitCost;
        subtotal += price;
    }

    shippingcost = document.getElementById("shipping-type").value;
    shipping = subtotal * shippingcost / 100;
    total = subtotal + shipping;
    document.getElementById("cart-subtotal").innerText = `$ ` + subtotal.toFixed(2);
    document.getElementById("cart-shipping").innerText = `$ ` + shipping.toFixed(2);
    document.getElementById("cart-total").innerText = `$ ` + total.toFixed(2);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_VARIOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showArticlesList(resultObj.data.articles);
        }
    });
});