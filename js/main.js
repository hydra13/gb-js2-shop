const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor() {
        this.products = [];
        this.allProducts = [];
        this._init();
    }
    _init() {
        this._getProducts()
            .then(newProducts => {
                this.products = newProducts;
                this.render() //3-е задание, только у нас не fetchGoods
            })
            .catch(error => {
                console.log(error)
            })
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
    }

    render() {
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const index = this.allProducts.findIndex(item => {
                return item.id_product === product.id_product;
            })
            if (index === -1) {
                const prod = new Product(product);
                this.allProducts.push(prod);
                block.insertAdjacentHTML('beforeend', prod.render());
            }
        })
        console.log(this.products);
    }

    sumPrice() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    getProduct(id) {
        const index = this.products.findIndex(item => item.id_product == id);
        return index === -1 ? null : this.products[index];
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                    </div>
                </div>`
    }
}

class CartItem {
    constructor(product, img = '#') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.count = product.count;
        this.img = img;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <img class="cart-item_img" src="${this.img}" alt="" width="100" height="75">
                    <span class="cart-item_title">${this.product_name}</span>
                    <span class="cart-item_price">${this.price} $</span>
                    <span class="cart-item_count">${this.count}</span>
                    <span class="cart-item_total-price">${this.price * this.count} $</span>
                    <div class="cart-item_buttons">
                        <button class="cart-item_btn add" type="button" data-id="${this.id_product}">+</button>
                        <button class="cart-item_btn remove" type="button" data-id="${this.id_product}">-</button>
                        <button class="cart-item_btn remove-all" type="button" data-id="${this.id_product}">X</button>
                    </div>
                </div>`
    }
}

class Cart {
    constructor() {
        this.cartList = [];
        this.allCartList = [];
        this._init();
    }

    _init() {
        this.render();
    }

    render(fullRepaint = false) {
        const cartListEl = document.querySelector('.cart-list');
        if (fullRepaint) {
            this.allCartList = [];
            cartListEl.innerHTML = '';
        }
        this.cartList.forEach(cartItem => {
            const index = this.allCartList.findIndex(item => {
                return item.id_product == cartItem.id_product;
            })
            if (index === -1) {
                const cartItemObj = new CartItem(cartItem);
                this.allCartList.push(cartItemObj);
                cartListEl.insertAdjacentHTML('beforeend', cartItemObj.render());
            } else {
                this.allCartList[index].count = cartItem.count;
                const countEl = document.querySelector(`.cart-item[data-id="${cartItem.id_product}"] .cart-item_count`);
                countEl.innerHTML = `${cartItem.count}`;
                const priceEl = document.querySelector(`.cart-item[data-id="${cartItem.id_product}"] .cart-item_total-price`);
                priceEl.innerHTML = `${cartItem.count * cartItem.price} $`;
            }
        });
        const totalPriceEl = document.querySelector('.cart-total-price');
        totalPriceEl.innerHTML = `Общая сумма: ${this.sumPrice()} $`;
    }

    sumPrice() {
        return this.allCartList.reduce((accum, item) => accum += item.price * item.count, 0);
    }

    addCartItemByProduct(product, count = 1) {
        const index = this.cartList.findIndex(item => {
            return item.id_product === product.id_product;
        });
        if (index === -1) {
            let newProduct = Object.assign({}, product);
            newProduct.count = count;
            this.cartList.push(newProduct);
        } else {
            this.cartList[index].count += count;
        }
        this.render();
    }

    addCartItemById(id_product) {
        let index = this.cartList.findIndex(item => item.id_product == id_product);
        if (index !== -1) {
            this.cartList[index].count++;
            index = this.cartList.findIndex(item => item.id_product == id_product);
            this.render();
        } else {
            console.log('index not found');
        }
    }

    removeCartItem(id_product) {
        let index = this.cartList.findIndex(item => {
            return item.id_product == id_product;
        });
        if (index !== -1) {
            this.cartList[index].count--;
            if (this.cartList[index].count < 1) {
                this.removeAllCartItems(id_product);
            } else {
                this.render();
            }
        }
    }

    removeAllCartItems(id_product) {
        let index = this.cartList.findIndex(item => {
            return item.id_product == id_product;
        });
        if (index !== -1) {
            this.cartList.splice(index, 1);
            index = this.allCartList.findIndex(item => item.id_product == id_product)
            if (index !== -1) {
                this.allCartList.splice(index, 1);
            }
            this.render(true);
        }
    }
}

function toggleCartVisible() {
    const cart = document.querySelector('.cart');
    const body = document.querySelector('body');
    if (cart.style.opacity == '0' || cart.style.opacity == 0) {
        cart.style.opacity = '100';
        body.style.background = '#777';
    } else {
        cart.style.opacity = '0';
        body.style.background = '#fff';
    }
}

let cart = new Cart();
let products = new ProductsList();

document.addEventListener('click', function (e) {
    if (e.target) {
        let id = null;
        switch (e.target.className) {
            case 'buy-btn':
                id = e.target.dataset.id;
                const product = products.getProduct(id);

                if (product !== null) {
                    cart.addCartItemByProduct(product);
                }
                break;
            case 'cart-item_btn add':
                id = e.target.dataset.id;
                cart.addCartItemById(id);
                break;
            case 'cart-item_btn remove':
                id = e.target.dataset.id;
                cart.removeCartItem(id);
                break;
            case 'cart-item_btn remove-all':
                id = e.target.dataset.id;
                cart.removeAllCartItems(id);
                break;
            case 'btn-cart':
            case 'cart-btn-close':
                toggleCartVisible();
                break;
        }
    }
});