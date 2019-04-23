'use strict'

// const goods = [{
//         title: 'Shirt',
//         price: 150
//     },
//     {
//         title: 'Socks',
//         price: 50
//     },
//     {
//         title: 'Jacket',
//         price: 350
//     },
//     {
//         title: 'Shoes',
//         price: 250
//     },
// ];

// const widthItemImg = 200;
// const heightItemImg = 150;

// const renderGoodsItem = (title, price) => {
//     return `<div class="goods-item">
//                 <img class="goods-item_image" src="" alt="" width="${widthItemImg}" height="${heightItemImg}">
//                 <span class="goods-item_title">${title}</span>
//                 <span class="goods-item_price">${price}</span>
//                 <button class="goods-item_btn" type="button">Добавить</button>
//             </div>`
// }

// const renderGoodsList = (list) => {
//     let goodsList = list.map(item => renderGoodsItem(item.title, item.price))
//     document.querySelector('.goods-list').innerHTML = goodsList.join('')
// }

// renderGoodsList(goods)


// --- ES5 ---

var goods = [{
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

var widthItemImg = 200;
var heightItemImg = 150;

var renderGoodsItem = function (title, price) {
    var htmlElement = '<div class="goods-item">';
    htmlElement += '<img class="goods-item_image" src="" alt="" width="' + widthItemImg + '" height="' + heightItemImg + '">';
    htmlElement += '<span class="goods-item_title">' + title + '</span>';
    htmlElement += '<span class="goods-item_price">' + price + '</span>';
    htmlElement += '<button class="goods-item_btn" type="button">Добавить</button></div>';
    return htmlElement;
}

var renderGoodsList = function (list) {
    var goodsList = [];
    for (var i = 0; i < list.length; i++) {
        goodsList.push(renderGoodsItem(list[i].title, list[i].price));
    }
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);