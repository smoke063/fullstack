class ProductList {
    goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
    ];

    SumPrices() {
        return this.goods.reduce(
            (sum, {price}) => sum + price,
            0
        )
    }
}

document.querySelector('.goods-list').innerHTML = new ProductList().SumPrices();

class CardItem {

    constructor(name = '', description = '', price = 0 ) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

class Cart {

    #items = [];

    constructor() {

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

}


const renderGoodsItem = ({title = '', price = 0}) => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

//renderGoodsList();
