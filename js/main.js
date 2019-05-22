const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        addProductUrl: '/addToBasket.json',
        removeProductUrl: '/deleteFromBasket.json',
        removeProductAllUrl: '/deleteFromBasket.json',
        products: [],
        productsFiltered: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        isVisibleCart: false,
        isVisibleNotification: true,
        cart: [],
        notifications: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(product) {
            this.getJson(`${API + this.addProductUrl}`)
                .then(data => {
                    if (data.result) {
                        let element = this.cart.find(value => value.id_product === product.id_product);

                        if (element) {
                            element.count += 1;
                        } else {
                            let cartItem = Object.assign({}, product);
                            cartItem.count = 1;
                            this.cart.push(cartItem);
                        }
                        this.showMessage("Товар добавлен в корзину");
                    } else {
                        console.log('Some error')
                    }
                })

        },
        removeProduct(cartItem) {
            this.getJson(`${API + this.removeProductUrl}`)
                .then(data => {
                    if (data.result) {
                        if (cartItem.count > 1) {
                            cartItem.count--;
                        } else {
                            this.cart = this.cart.filter(item => item.id_product != cartItem.id_product);
                        }
                        this.showMessage("Товар удален из корзины");
                    } else {
                        console.log('Some error')
                    }
                })
        },
        removeProductAll(cartItem) {
            this.getJson(`${API + this.removeProductAllUrl}`) //оставил тот же JSON хотя должен быть другой.
                .then(data => {
                    if (data.result) {
                        this.cart = this.cart.filter(item => item.id_product != cartItem.id_product);
                        this.showMessage("Товар удален из корзины полностью");
                    } else {
                        console.log('Some error')
                    }
                })
        },
        filterGoods() {
            let regExp = new RegExp(this.searchLine, 'i');
            this.productsFiltered = this.products.filter(item => regExp.test(item.product_name));
        },
        getCartSum() {
            return this.cart.reduce((accum, item) => accum += item.price * item.count, 0)
        },
        showMessage(msg) {
            const id = Date.now();
            this.notifications.push({ id: id, message: msg, visible: true })

            setTimeout(() => {
                const obj = this.notifications.find(item => item.id === id);
                if (obj) obj.visible = false;
            }, 2000);
            setTimeout(() => {
                this.notifications.shift();
            }, 2500);
        }
    },
    mounted() {
        // this.getJson(`getProducts.json`)
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (el of data) {
                    this.products.push(el)
                }
                this.filterGoods();
            })
    }
})
