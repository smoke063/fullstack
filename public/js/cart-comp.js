
var cart = {
    props: ['cartItems', 'img', 'visibility'],
    template: `
            <div class="cart-block" v-show="visibility">
                    <h2 class="cart-title">Корзина</h2>
                <cart-item v-for="item in cartItems" :key="item.id_product" :cart-item="item"></cart-item>
            </div>
`
};

var cartItem =  {
    components: {
        cart
    },
    props: [ 'cartItem'],
    template: `
             <div class="cart-item">
                <img src="https://via.placeholder.com/200x150">
                <div class="goods-item-desc">
                    <span>{{ cartItem.product_name }}</span>
                    <span>Цена: {{ cartItem.price }} руб.</span>
                </div>
                <div class="goods-item-desc">
                   <span>Кол-во: {{ cartItem.quantity }} руб.</span>
                     <span>Всего: {{ cartItem.quantity * cartItem.price }}</span>
                </div>
                <button  class="btn-add-good" @click="$root.removeGood(cartItem)">Удалить</button>
            </div>
`
};

export default cartItem;
