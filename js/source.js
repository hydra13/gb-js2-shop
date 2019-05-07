'use strict'
const URL_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function execGetRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

class Products {
    constructor() {
        this.products = [];
        this._init();
    }

    _init() {
        this.fetchDataV2();
        this.render();
    }

    _renderElement(item) {
        return `<div class="product-item">
                    <img src="https://placehold.it/200x150" alt="Some img">
                    <div class="desc">
                        <h3>${item.product_name}</h3>
                        <p>${item.price} $</p>
                        <button class="buy-btn" data-id="${item.id_product}">Купить</button>
                    </div>
                </div>`
    }

    render() {
        let html = '';
        this.products.forEach(item => {
            html += this._renderElement(item);
        });
        document.querySelector('.products').innerHTML = html;
    }

    fetchData() {
        execGetRequest(`${URL_API}/catalogData.json`, (productsList) => {
            this.products = JSON.parse(productsList);
            console.log(productsList);
        })
    }

    fetchDataV2() {
        fetch(`${URL_API}/catalogData.json`).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network error');
        }).then(json => {
            console.log(json);
            console.log([...json])
            this.products = json;
            this.render();
        }).catch(error => {
            console.log(`ERROR: ${error}`)
        });
    }
}

const products = new Products();
products.fetchDataV2();