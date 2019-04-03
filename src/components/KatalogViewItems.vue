<template>
    <div class="content">
        <div class="left-sidebar">
            <ul class="catalog">
                <li class="cat">
                    <span>Каталог товаров</span>
                    <ul>
                        <li v-for="route in mainRoutes" v-if="route.menu == 'katalog' && route.parent == 2">
                            <router-link :to="'/'+route.path">{{route.name}}</router-link>
                            <ul class="sub-ul-menu">
                                <ul>
                                    <li v-for="rout in subRoutes"
                                        v-if="route.menu == 'katalog' && route.id == rout.parent">
                                        <router-link :to="'/'+rout.path">{{rout.name}}</router-link>
                                    </li>
                                </ul>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="filters-product" v-if="!routeMain">

                <div class="filter filter-choose" v-if="filters_items.ages.length">
                    <span>Выдержка:</span>
                    <ul class="filter-ul">
                        <li v-for="(filter, index ) in filters_items.ages">
                            <input :id="'ages'+index" type="checkbox" @change="setFilter('ages',filter)">
                            <label :for="'ages'+index">{{filter}} </label></li>
                    </ul>
                </div>
                <div class="filter filter-choose" v-if="filters_items.packs.length">
                    <span>Упаковка:</span>
                    <ul class="filter-ul">
                        <li v-for="(filter, index) in filters_items.packs">
                            <input :id="'packs'+index" type="checkbox" @change="setFilter('packs',filter)">
                            <label :for="'packs'+index">{{filter}} </label></li>
                    </ul>
                </div>
                <div class="filter filter-choose" v-if="filters_items.clas.length">
                    <span>Классификация:</span>
                    <ul class="filter-ul">
                        <li v-for="(filter, index) in filters_items.clas">
                            <input :id="'clas'+index" type="checkbox" @change="setFilter('clas',filter)">
                            <label :for="'clas'+index">{{filter}} </label></li>
                    </ul>
                </div>
                <div class="filter filter-choose" v-if="filters_items.sugar.length">
                    <span>Содержание сахара:</span>
                    <ul class="filter-ul">
                        <li v-for="(filter, index, key) in filters_items.sugar">
                            <input :id="'sugar'+index" type="checkbox" @change="setFilter('sugar',filter)">
                            <label :for="'sugar'+index">{{filter}} </label></li>
                    </ul>
                </div>
                <div class="filter filter-choose" v-if="filters_items.color.length">
                    <span>Цвет:</span>
                    <ul class="filter-ul">
                        <li v-for="(filter, index, key) in filters_items.color">
                            <input :id="'color'+index" type="checkbox" @change="setFilter('color',filter)">
                            <label :for="'color'+index">{{filter}} </label></li>
                    </ul>
                </div>
                <div class="filter price-range">
                    <span>Цена:</span>
                    <vue-slider v-bind="slider_props" ref="slider" @change="setValues()" :max="maxPrice"
                                :value="[0,maxPrice]"></vue-slider>
                </div>
            </div>
        </div>
        <div class="main-content">
            <SortingTable @changeDirection="changeDirection"></SortingTable>

            <div class="goods" v-if="goodsItems.length">
                <div class="good" v-for="good in goodsItems" v-if="
                ((parentArray.indexOf(good.parent) > -1)
                 && (minPriceFilter <= good.price) && (maxPriceFilter >=  good.price))
                 && (filters_set.ages.length ? filters_set.ages.indexOf(good.filters.ages) > -1 : true)
                 && (filters_set.clas.length ? filters_set.clas.indexOf(good.filters.clas) > -1 : true)
                 && (filters_set.color.length ? filters_set.color.indexOf(good.filters.color) > -1 : true)
                 && (filters_set.packs.length ? filters_set.packs.indexOf(good.filters.packs) > -1 : true)
                 && (filters_set.sugar.length ? filters_set.sugar.indexOf(good.filters.sugar) > -1 : true)
                || routeMain">
                    <div class="good-wrap">
                        <div class="good-img">
                            <router-link :to="good.path.trim()">
                                <img :src="'//m.absolut-kiev.com'+good.image.trim()"/>
                            </router-link>
                        </div>
                        <div class="good-description">
                            <div class="good-name">
                                <router-link :to="good.path.trim()">
                                    {{good.name.trim()}}
                                </router-link>
                            </div>

                            <div class="good-else">
                                <div class="good-displacement good-info">
                                    Емкость: <span>{{good.litrag.trim()}} л.</span>
                                </div>
                                <div class="good-alcohol good-info">
                                    Содержание алкоголя: <span>{{good.alcohol.trim()}}</span>
                                </div>
                                <div class="good-county">
                                    Страна-производитель: <span>{{good.country.trim()}}</span>
                                </div>
                            </div>
                            <div class="price-buy">
                                <div class="prices">
                                    <div class="price-before" v-if="good.old_price.trim()">{{good.old_price.trim()}}
                                        грн.
                                    </div>
                                    <div class="price-before with-null" v-else></div>
                                    <div class="price-current">{{good.price.trim()}} грн.</div>
                                </div>
                                <div class="buy-btns">
                                    <div class="button but-oneclick js-buy-oneclick">Купить в один клик</div>
                                    <div class="button but-buy js-buy-btn">Добавить</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-table" v-if="good">
                <div class="img-main js-main-img" v-if="good.image">
                    <img :src="'//m.absolut-kiev.com' + good.image.trim()"/>
                </div>
                <div class="item-about">
                    <div class="item-name" v-if="good.name">
                        {{good.name.trim()}}
                    </div>
                    <div class="item-description" v-if="good.description">
                        {{good.description.trim()}}
                    </div>
                    <div class="item-content">
                        <div class="good-else">
                            <div class="good-displacement good-info" v-if="good.litrag">
                                Емкость: <span>{{good.litrag.trim()}} л.</span>
                            </div>
                            <div class="good-alcohol good-info" v-if="good.alcohol">
                                Содержание алкоголя: <span> {{good.alcohol.trim()}}</span>
                            </div>
                            <div class="good-county" v-if="good.country">
                                Страна-производитель: <span>{{good.country.trim()}}</span>
                            </div>
                        </div>
                        <div class="good-else-info" v-if="good.aroma">
                            Аромат: <span>{{good.aroma.trim()}}</span>
                        </div>
                        <div class="good-else-info" v-if="good.vkus">
                            Вкус: <span>{{good.vkus.trim()}}</span>
                        </div>
                    </div>
                    <div class="price-buy">
                        <div class="prices">
                            <div class="price-before" v-if="good.old_price">{{good.old_price.trim()}} грн.</div>
                            <div class="price-before with-null" v-else></div>
                            <div class="price-current">{{good.price.trim()}} грн.</div>
                        </div>
                        <div class="buy-btns">
                            <div class="button but-oneclick js-buy-oneclick">Купить в один клик</div>
                            <div class="button but-buy js-buy-btn">Добавить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-content" v-if="good">
                <!--{{good.content.trim()}}-->
            </div>
        </div>
    </div>

</template>

<script>
    import SortingTable from '@/components/SortingTable.vue'
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'
    /*
    * filters
    *  ages:[],
       class:[],
       color:[],
       pack:[],
       sugar:[]
    *
    * */
    export default {
        name: "KatalogViewItems",
        props: ['goods'],
        components: {
            SortingTable,
            VueSlider
        },
        data() {
            return {
                goodsParsed: [],
                goodsFavorites: [],
                goodsItems: [],
                goodsAllItems: [],
                parents: [],
                parentArray: [],
                direction: true,
                aliasToId: {},
                routeMain: true,
                good: null,
                mainRoutes: [],
                subRoutes: [],
                maxPrice: 0,
                minPrice: 0,
                maxPriceFilter: 0,
                minPriceFilter: 0,
                slider_props: {
                    min: 0,
                    value: [0, 0],
                    max: 0,
                    show: true,
                    realTime: true,
                    tooltip: "always",
                },
                filters_items: {
                    ages: [],
                    clas: [],
                    color: [],
                    packs: [],
                    sugar: []
                },
                filters_set: {
                    ages: [],
                    clas: [],
                    color: [],
                    packs: [],
                    sugar: []
                }

            }
        },
        mounted() {
            this.watchGetters();
        },
        watch: {
            $route(to, from) {
                this.switchItems();
            }
        },
        methods: {
            watchGetters: function () {
                this.$store.subscribe((mutation, state) => {
                    if (mutation.type == 'SET_MainRoute') {
                        this.mainRoutes = state.mainRoutes;
                        this.parents = state.parents;
                        this.getAliasToId();
                        this.switchItems();

                    } else if (mutation.type == 'SET_SubRoute') {
                        this.subRoutes = state.subRoutes;
                        this.parents = state.parents;
                        this.getAliasToId();
                        this.switchItems();

                    } else if (mutation.type == 'SET_Favorites') {
                        this.goodsFavorites = state.favorites;
                        this.switchItems();

                    } else if (mutation.type == 'SET_Items') {
                        this.goodsAllItems = state.items;
                        this.switchItems();

                    } else if (mutation.type == 'SET_items_Filters') {
                        console.log('state', state)
                    }
                })
            },
            getAliasToId: function () {
                for (let parent in this.parents) {
                    this.aliasToId["/" + this.parents[parent].path] = {}
                    this.aliasToId["/" + this.parents[parent].path].id = this.parents[parent].id
                    this.aliasToId["/" + this.parents[parent].path].parent = this.parents[parent].parent
                }
            },
            searchForParents: function (callback) {
                let idx = this.$route.path;
                this.parentArray = [];
                if (this.aliasToId[idx]) {
                    this.parentArray = [];
                    if (this.aliasToId[idx].parent == 2) {
                        for (let item in this.aliasToId) {
                            if (this.aliasToId[item].parent == this.aliasToId[idx].id) {
                                this.parentArray.push(this.aliasToId[item].id);
                            }
                        }
                    } else {
                        this.parentArray.push(this.aliasToId[idx].id);
                    }
                }
                callback(true);
            },
            switchItems: function () {
                this.priceRange = [1, 1000]
                if (this.$route.path == '/') {
                    this.routeMain = true;
                    this.goodsItems = this.goodsFavorites;
                } else {
                    this.good = null;
                    this.routeMain = false;
                    this.searchForParents(() => {
                        this.goodsParsed = this.goodsAllItems;
                        this.chooseGoods();
                        if (!this.parentArray.length) {
                            let idx = this.$route.path;
                            for (let item in this.goodsParsed) {
                                if (idx == this.goodsParsed[item].path) {
                                    this.good = this.goodsParsed[item];
                                }
                            }
                        }
                    })
                }
            },
            chooseGoods: function () {
                this.maxPrice = 0;
                this.goodsItems = [];
                this.maxPriceFilter = 0;
                this.minPriceFilter = 0;
                this.resetFiltersGet();
                for (let item in this.goodsParsed) {
                    if ((this.parentArray.indexOf(this.goodsParsed[item].parent) > -1)

                    ) {
                        this.goodsItems.push(this.goodsParsed[item]);
                        this.getFilters(this.goodsParsed[item]);


                        if (this.maxPrice < +this.goodsParsed[item].price)
                            this.maxPrice = +this.goodsParsed[item].price;
                    }
                }
                this.maxPriceFilter = this.maxPrice
                this.sortItems();
            },
            getFilters: function (items) {

                for (let item in items.filters) {
                    console.log(item, items.filters[item])
                    if (this.filters_items[item].indexOf(items.filters[item]) == -1 && items.filters[item] != "") {
                        this.filters_items[item].push(items.filters[item]);
                    }
                }
            },
            setFilter: function (filtr, val) {
                if (this.filters_set[filtr].indexOf(val) == -1) {
                    this.filters_set[filtr].push(val)
                } else {
                    this.filters_set[filtr].splice(this.filters_set[filtr].indexOf(val), 1)
                }
            },
            setValues: function () {
                let values = this.$refs.slider.getValue();

                this.sortItems();
                let params = {};
                params[this.$route.path] = {'max': values[1], 'min': values[0]}
                this.$store.dispatch('SET_items_Filters', params);
                this.maxPriceFilter = values[1]
                this.minPriceFilter = values[0]
            },
            sortItems: function () {
                function comparePrice(item1, item2) {
                    return item1.price - item2.price;
                }

                this.goodsItems.sort(comparePrice);
                if (!this.direction) {
                    this.goodsItems = this.goodsItems.reverse()
                }
            },
            changeDirection: function (dir) {
                this.direction = dir;
                this.sortItems()
            },
            resetFiltersGet: function () {
                this.filters_items = {
                    ages: [],
                    clas: [],
                    color: [],
                    packs: [],
                    sugar: []
                }
            }
        },


    }
</script>
