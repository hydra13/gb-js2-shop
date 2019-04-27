'use strict'

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.widthItemImg = 200;
        this.heightItemImg = 150;
    }

    render() {
        return `<div class="goods-item">
                    <img class="goods-item_image" src="" alt="" width="${this.widthItemImg}" height="${this.heightItemImg}">
                    <span class="goods-item_title">${this.title}</span>
                    <span class="goods-item_price">${this.price}</span>
                    <button class="goods-item_btn" type="button">Добавить</button>
                </div>`
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this._init();
    }

    fetchGoods() {
        this.goods = [{
                title: 'Shirt',
                price: 150
            },
            {
                title: 'Socks',
                price: 50
            },
            {
                title: 'Jacket',
                price: 350
            },
            {
                title: 'Shoes',
                price: 250
            },
        ];
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.goods.forEach(item => {
            totalPrice += item.price;
        })
        return totalPrice;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(record => {
            const item = new GoodsItem(record.title, record.price)
            listHtml += item.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    _init() {
        this.fetchGoods();
        this.render();
    }
}

class BasketItem extends GoodsItem {
    constructor(title, price, count) {
        super(title, price);
        this.count = count;
    }

    render() {
        return `<div class="basket-item">
                    <img class="basket-item_image" src="" alt="" width="${this.widthItemImg}" height="${this.heightItemImg}">
                    <span class="basket-item_title">${this.title}</span>
                    <span class="basket-item_price">${this.price}</span>
                    <span class="basket-item_price">${this.count}</span>
                    <button class="basket-item_btn" type="button">Удалить</button>
                </div>`
    }
}

class BasketList {
    constructor() {
        this.items = [];
        this.render();
    }

    add(title, price, count) {
        const index = this.items.findIndex(value => {
            console.log(`title: ${title}; value: ${value}`)
            return value.title === title;
        })
        if (index !== -1) {
            const item = this.items[index];
            item.count += count;
        } else {
            this.items.push(new BasketItem(title, price, count))
        }
        this.render();
    }

    remove(title) {
        const item = this.items.find()
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i].title === title) {
                this.items.splice(i, 1);
                return;
            }
        }
        this.render();
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price * item.count;
        })
        return totalPrice;
    }

    render() {
        let listHtml = '';
        this.items.forEach(item => {
            listHtml += item.render();
        })
        document.querySelector('.basket-list').innerHTML = listHtml;
    }
}

const goodsList = new GoodsList();
const basketList = new BasketList();
basketList.add(goodsList.goods[0].title, goodsList.goods[0].price, 1);
basketList.add(goodsList.goods[1].title, goodsList.goods[1].price, 1);
basketList.add(goodsList.goods[0].title, goodsList.goods[0].price, 1);