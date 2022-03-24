const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const makeGETRequest = async (url) => {
    return (await fetch(url)).json();
};

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

(async () => {
    const cart = new Cart();
    await cart.fetchGoods();
    cart.render();
})();

