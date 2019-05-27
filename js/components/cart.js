Vue.component('cart-dialog', {
    props: ['visible', 'products'],
    template: `
        <div class="cart-form" v-show="visible">
            <span class="cart-form-title">Корзина</span>
            <button class="cart-form-btn-close" type="button" @click="$emit('close-dialog')">Закрыть</button>
            <span class="cart-form-total-price">Общая сумма: {{getCartSum()}} $</span>
            <div class="cart-form-list">

                <div class="cart-form-item" v-for="cartItem of products" :data-id="cartItem.id_product">
                    <img class="cart-form-item_img" src="#" alt="" width="100" height="75">
                    <span class="cart-form-item_title">{{cartItem.product_name}}</span>
                    <span class="cart-form-item_price">{{cartItem.price}} $</span>
                    <span class="cart-form-item_count">{{cartItem.count}}</span>
                    <span class="cart-form-item_total-price">{{cartItem.price * cartItem.count}} $</span>
                    <div class="cart-form-item_buttons">
                        <button class="cart-form-item_btn add" type="button" :data-id="cartItem.id_product"
                        @click="$emit('add-product', cartItem)">+</button>
                        <button class="cart-form-item_btn remove" type="button" data-id="cartItem.id_product"
                        @click="$emit('remove-product', cartItem)">-</button>
                        <button class="cart-form-item_btn remove-all" type="button" data-id="cartItem.id_product"
                        @click="$emit('remove-product-all', cartItem)">X</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        getCartSum() {
            return this.products.reduce((accum, item) => accum += item.price * item.count, 0)
        },
    }
})

// @click="isVisibleCart = !isVisibleCart"

