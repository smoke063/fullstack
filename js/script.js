const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
    methods: {
        filterGoods(text) {
            this.filteredGoods = this.goods.filter((g) => g.product_name.toLowerCase().includes(text.toLowerCase()));

        },
        async makeGETRequest() {
            return (await fetch(`${API_URL}/catalogData.json`)).json();
        },
        addGood(good) {
            var find = this.cardGoods.find( g => g.id_product === good.id_product);
            if(find) {
                find.quantity++;
            } else {
                this.cardGoods.push(Object.assign({quantity: 1}, good));
            }
        },
        removeGood(good) {
            var find = this.cardGoods.find( g => g.id_product === good.id_product);
            if(find) {
                find.quantity--;
            } else {
                this.cardGoods = this.cardGoods.filter( g => g.id_product !== good.id_product);
            }
        }
    },
})


