const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

import { createApp } from 'vue';

createApp({
    async mounted() {
        const goods = await this.makeGETRequest();
        this.goods = goods;
        this.filteredGoods = goods;
        this.card = [];
    },
    data() {
        return {
            imgSrc: 'https://via.placeholder.com/200x150',
            goods: [],
            filteredGoods: [],
            searchLine: '',
            isVisibleCart: false
        }
    },
    methods: {
        filterGoods() {
            this.filteredGoods = this.goods.filter((g) => g.product_name.toLowerCase().includes(this.searchLine.toLowerCase()));

        },
        async makeGETRequest() {
            return (await fetch(`${API_URL}/catalogData.json`)).json();
        },
        method(good) {
            this.card.add(good);
        }
    },
}).mount('#app')

class CardItem {

    constructor(product_name = '', price = 0) {
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class Cart {

    #items = [];

    constructor() {

    }

    async fetchGoods() {
        this.#items = await makeGETRequest(`${API_URL}/catalogData.json`);
    }

    render() {
        let listHtml = '';
        this.#items.forEach(good => {
            const goodItem = new CardItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getById(id) {
        return this.#items.find( i => i.id === id);
    }

    add(item) {
        this.#items.push(item);
    }

    remove(id) {
        this.#items = this.#items.filter(i => i.id !== id);
    }

    removeAll() {
        this.#items = [];
    }

    sumPrices() {
        return this.#items.reduce(
            (sum, {price}) => sum + price,
            0
        )
    }

    getItems() {
        return this.#items;
    }
}


