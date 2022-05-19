var search = {
    data: {
        searchLine: ''
    },
    template: `
           <div>
             <input type="text" class="goods-search" v-model="searchLine" />
             <button class="search-button" type="button" @click="$root.filterGoods(searchLine)">Поиск</button>
            </div>
`
};

export default search;
