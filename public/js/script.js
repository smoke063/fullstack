const API_URL = 'http://localhost:3000';

var app = new Vue({
    el: '#app',
    async mounted() {
        const goods = await this.makeGETRequest();
        this.goods = goods;
        this.filteredGoods = goods;
        this.cardGoods = [];
    },
    data() {
        return {
            imgSrc: 'https://via.placeholder.com/200x150',
            goods: [],
            filteredGoods: [],
            cardGoods: [],
            searchLine: '',
            isVisibleCart: false
        }
    },
    watch: {
        async isVisibleCart(vis, oldvis) {
            if (vis) {
                const cart = await (await fetch(`${API_URL}/cart`)).json()
                this.cardGoods = cart
            } else {
                this.cardGoods = []
            }
        }
    },
    methods: {
        filterGoods(text) {
            this.filteredGoods = this.goods.filter((g) => g.product_name.toLowerCase().includes(text.toLowerCase()));

        },
        async makeGETRequest() {
            const products = await (await fetch(`${API_URL}/products`)).json()
            return  products;
        },
        async addGood(good) {
            var find = this.cardGoods.find(g => g.id_product === good.id_product);
            if (find) {
                find.quantity++;
            }
            const pr = Object.assign( {quantity: 1}, good);
            const res = await (
                await fetch(`${API_URL}/addProduct`,
                    {
                        method: 'POST', //
                        body: JSON.stringify(find || pr),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            ).json()
        },
        async removeGood(good) {
            var find = this.cardGoods.find( g => g.id_product === good.id_product);
            if(find) {
                find.quantity--;
            }
            const res = await (
                await fetch(`${API_URL}/deleteProduct`,
                    {
                        method: 'DELETE', //
                        body: JSON.stringify({
                            id_product: good.id_product
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            ).json()
            const cart = await (await fetch(`${API_URL}/cart`)).json()
            this.cardGoods = cart
        }
    },
})


