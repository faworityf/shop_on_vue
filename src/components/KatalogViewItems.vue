<template>
    <div class="content">
        <div class="left-sidebar">
            <ul v-bind:class="[menuOpened ? 'active' : 'unactive', mobile ? '': routeMain? 'active' : 'unactive', 'catalog']">
                <li class="cat"
                    @mouseover="mobile ? '': menuOpened = true"
                    @mouseleave="mobile ? '' :  menuOpened = false"
                >
                    <span class="catalog-name" @click="mobile ? (menuOpened = !menuOpened, subMenuOpen = false) : ''">Каталог товаров</span>
                    <ul>
                        <li v-for="route in mainRoutes"
                            @click="mobile ? (menuOpened = false,  subMenu = route.path): (menuOpened = false, subMenuOpen = false)"
                            v-bind:class="[subMenuOpen == route.name ? 'active' : 'unactive', 'sub-menu-li']"
                            @mouseover="mobile ? '': subMenuOpen = route.name"
                            @mouseleave="mobile ? '' :  subMenuOpen = false"
                            v-if="route.menu == 'katalog' && route.parent == 2">
                           <span class="mobile-open-sub" >
                                <router-link :to="'/'+route.path">
                                    {{route.name}}
                                </router-link>
                           </span>
                            <ul class="sub-ul-menu" v-if="!mobile">
                                <ul>
                                    <li v-for="rout in subRoutes" @click="menuOpened = false, subMenuOpen = false"
                                        v-if="route.menu == 'katalog' && route.id == rout.parent">
                                       <span class="mobile-open-sub">
                                            <router-link :to="'/'+rout.path">
                                                {{rout.name}}
                                            </router-link>
                                       </span>
                                    </li>
                                </ul>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="mobile-sub-menu ">
                <ul class="sub-ul-menu cat " v-if="mobile && !routeMain">
                    <span class="catalog-name" @click="mobile ? subMenuOpen = !subMenuOpen : '' ">Подкатегории</span>
                    <ul  v-for="route in mainRoutes" v-if="subMenu == route.path && subMenuOpen">
                        <li v-for="rout in subRoutes" @click="subMenuOpen = false"
                            v-if="route.menu == 'katalog' && route.id == rout.parent">
                                <span class="mobile-open-sub">
                                   <router-link :to="'/'+rout.path" >
                                       {{rout.name}}
                                   </router-link>
                                </span>
                        </li>
                    </ul>
                </ul>
            </div>

            <div class="filters-product" v-if="!routeMain">
                <div class="filers-header" v-if="mobile" @click="filtersOpen = !filtersOpen">Фильтры</div>
                <div v-if="mobile ? filtersOpen ? true : false : true">
                    <div class="filter filter-choose" v-if="filters_items.ages.length ">
                        <span>Выдержка:</span>
                        <ul class="filter-ul">
                            <li v-for="(filter, index ) in filters_items.ages">
                                <input :id="'ages'+index" type="checkbox"
                                       :checked="filters_set['ages'] ? filters_set['ages'].indexOf(filter) > -1 ? 'checked' : false : false"
                                       @change="setFilter('ages',filter)">
                                <label :for="'ages'+index">{{filter}} </label></li>
                        </ul>
                    </div>
                    <div class="filter filter-choose" v-if="filters_items.clas.length">
                        <span>Классификация:</span>
                        <ul class="filter-ul">
                            <li v-for="(filter, index) in filters_items.clas">
                                <input :id="'clas'+index" type="checkbox"
                                       :checked="filters_set['clas'] ? filters_set['clas'].indexOf(filter) > -1 ? 'checked' : false : false"
                                       @change="setFilter('clas',filter)">
                                <label :for="'clas'+index">{{filter}} </label></li>
                        </ul>
                    </div>
                    <div class="filter filter-choose" v-if="filters_items.sugar.length">
                        <span>Содержание сахара:</span>
                        <ul class="filter-ul">
                            <li v-for="(filter, index, key) in filters_items.sugar">
                                <input :id="'sugar'+index" type="checkbox"
                                       :checked="filters_set['sugar'] ? filters_set['sugar'].indexOf(filter) > -1 ? 'checked' : false : false"
                                       @change="setFilter('sugar',filter)">
                                <label :for="'sugar'+index">{{filter}} </label></li>
                        </ul>
                    </div>
                    <div class="filter filter-choose" v-if="filters_items.color.length">
                        <span>Цвет:</span>
                        <ul class="filter-ul">
                            <li v-for="(filter, index, key) in filters_items.color">
                                <input :id="'color'+index" type="checkbox"
                                       :checked="filters_set['color'] ? filters_set['color'].indexOf(filter) > -1 ? 'checked' : false : false"
                                       @change="setFilter('color',filter)">
                                <label :for="'color'+index">{{filter}} </label></li>
                        </ul>
                    </div>
                    <div class="filter filter-choose" v-if="filters_items.packs.length">
                        <span>Упаковка:</span>
                        <ul class="filter-ul">
                            <li v-for="(filter, index) in filters_items.packs">
                                <input :id="'packs'+index" type="checkbox"
                                       :checked="filters_set['packs'] ? filters_set['packs'].indexOf(filter) > -1 ? 'checked' : false : false"
                                       @change="setFilter('packs',filter)">
                                <label :for="'packs'+index">{{filter}} </label></li>
                        </ul>
                    </div>
                    <div class="filter price-range" v-if="!good">
                        <span>Цена:</span>
                        <vue-slider v-bind="slider_props" ref="slider" @change="setValues()" :max="maxPrice"
                                    :min="minPrice"
                                    v-model="priceModel"></vue-slider>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-content">
            <SortingTable @changeDirection="changeDirection"></SortingTable>

            <div class="goods" v-if="goodsItems.length">
                <div class="good" v-for="good in goodsItems" :key="good.id" v-if="
                ((parentArray.indexOf(good.parent) > -1)
                 && (minPriceFilter <= good.price) && (maxPriceFilter >=  good.price)
                 && (filters_set.ages.length ? filters_set.ages.indexOf(good.filters.ages) > -1 : true)
                 && (filters_set.clas.length ? filters_set.clas.indexOf(good.filters.clas) > -1 : true)
                 && (filters_set.color.length ? filters_set.color.indexOf(good.filters.color) > -1 : true)
                 && (filters_set.packs.length ? filters_set.packs.indexOf(good.filters.packs) > -1 : true)
                 && (filters_set.sugar.length ? filters_set.sugar.indexOf(good.filters.sugar) > -1 : true))
                || routeMain" >
                    <div class="good-wrap">
                        <div class="good-img">
                            <router-link :to="good.path.trim()">
                                <img :src="'//absolut-kiev.com'+good.image.trim()"/>
                            </router-link>
                        </div>
                        <div class="good-description">
                            <div class="good-name">
                                <router-link :to="good.path.trim()">
                                    {{good.name.trim()}}
                                </router-link>
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
                                    <div class="button but-oneclick js-buy-oneclick" @click="addToCartOneClick(good)">
                                        Купить в один клик
                                    </div>
                                    <div class="button but-buy js-buy-btn" @click="addToCart(good)">Добавить</div>
                                </div>
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

                        </div>
                    </div>
                </div>
            </div>

            <div class="main-table" v-if="good">
                <div class="img-main js-main-img" v-if="good.image">
                    <img :src="good.image.trim()"/>
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
                            <div class="button but-oneclick js-buy-oneclick" @click="addToCartOneClick(good)">
                                Купить в один клик
                            </div>
                            <div class="button but-buy js-buy-btn" @click="addToCart(good)">Добавить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-content" v-if="good">
                <!--{{good.content.trim()}}-->
            </div>
        </div>
        <div class="pop pop-cart" v-show="cartOpened">
            <div class="pop-wrap" @click="cartOpen()"></div>
            <div class="pop-inner">
                <div class="pop-cart-items" v-if="Object.keys(cartItems).length != 0">
                    <div class="cart-header">
                        <div class="cart-name">Корзина</div>
                        <div class="close-pop" @click="cartOpen()">
                            <img src="../../public/close.jpg" height="128" width="128"/>
                        </div>
                    </div>
                    <div class="cart-items" v-bar="{preventParentScroll: true}" v-if="!subscribeForm">
                        <div class="cart-scroll">
                            <div class="cart-item" v-for="cartItem in cartItems">
                                <div class="item-main-info">
                                    <div class="item-foto">
                                        <img :src="'//m.absolut-kiev.com'+cartItem.item.image.trim()"/>
                                    </div>
                                </div>
                                <div class="item-info-more">
                                    <div class="item-name-wrap">
                                        <div class="cart-item-name">
                                            <span>{{cartItem.item.name.trim()}}</span>
                                        </div>
                                    </div>
                                    <div class="item-info-else">
                                        <div class="item-litrag cart-options">
                                            <span>{{cartItem.item.litrag.trim() + 'л.'}}</span>
                                        </div>
                                        <div class="item-price cart-options">
                                            <span>{{~~cartItem.item.price.trim() +' грн.'}}</span>
                                        </div>
                                        <div class="item-quantity cart-options">
                                            <div class="plus-item" @click="minusCartItem(cartItem.item)">-</div>
                                            <input type="number" name="quantity" :data-id="cartItem.item.id"
                                                   v-bind:value="cartItem.count" @input="setCartItem">
                                            <div class="plus-item" @click="addToCart(cartItem.item)">+</div>
                                        </div>

                                        <div class="item-summ cart-options">
                                            <span>{{~~cartItem.item.price.trim() * cartItem.count  +' грн.'}}</span>
                                        </div>
                                        <div class="item-remove">
                                            <span class="delete-cart-item" @click="deleteCartItem(cartItem.item)">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-all-summ">
                                <span>{{'Итого: '+ cartSumm +' грн.'}}</span>
                                <form action="" class="form-to-subscribe" @submit.prevent="sendOrder(true)" v-if="oneClick">
                                    <input type="text" name="tel" v-mask="'+38(###)-###-##-##'"
                                           v-model="forms.tel.val" placeholder="+38" @input="checkForm('tel')"
                                           v-bind:class="forms.tel.sucs ? '' : 'error'">
                                    <button type="submit">Отправить</button>
                                </form>
                                <div class="subscribe-form" @click="subscribeForm = !subscribeForm" v-if="!oneClick">
                                    Оформить заказ
                                </div>
                            </div>
                        </div>
                    </div>
                    <form action="" class="form-to-subscribe" @submit.prevent="sendOrder(false)" v-if="subscribeForm">
                        <input type="text" name="name" v-model="forms.name.val"
                               onkeypress="return /[А-Яа-яA-Za-z]/i.test(event.key)"
                               placeholder="Имя" @input="checkForm('name')"
                               v-bind:class="forms.name.sucs ? '' : 'error'">

                        <input type="text" name="tel" v-mask="'+38(###)-###-##-##'"
                               v-model="forms.tel.val" placeholder="+38" @input="checkForm('tel')"
                               v-bind:class="forms.tel.sucs ? '' : 'error'">
                        <input type="text" name="email" v-model="forms.email.val"
                               placeholder="Email" @input="checkForm('email')"
                               v-bind:class="forms.email.sucs ? '' : 'error'">

                        <button type="submit">Отправить</button>
                    </form>
                </div>
                <div class="pop-cart-items" v-if="Object.keys(cartItems).length == 0">
                    <div class="cart-header">
                        <div class="cart-name">Корзина пуста</div>
                        <div class="close-pop" @click="cartOpen()"><img src="../../public/close.jpg" height="128"
                                                                        width="128"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import SortingTable from '@/components/SortingTable.vue';
    import VueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/antd.css';
    import VueMask from 'v-mask';
    import axios from 'axios';
    import VueCookies from 'vue-cookies'

    Vue.use(VueMask);
    Vue.use(VueCookies);
    import {VueMaskDirective} from 'v-mask'

    Vue.directive('mask', VueMaskDirective);
    /*
       filters
       ages:[],
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
            VueSlider,
            VueMask
        },
        data() {
            return {
                subMenu:null,
                mobile: window.matchMedia('(max-width: 768px)').matches,
                menuOpened: false,
                subMenuOpen: false,
                filtersOpen: false,
                timeout: null,
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
                cartItems: {},
                subscribeForm: false,
                cartSumm: 0,
                maxPriceFilter: 0,
                minPriceFilter: 0,
                priceModel: [this.minPriceFilter, this.maxPriceFilter],
                cartOpened: false,
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
                },
                forms: {
                    tel: {
                        sucs: false,
                        val: ''
                    },
                    name: {
                        sucs: false,
                        val: ''
                    },
                    email: {
                        sucs: false,
                        val: ''
                    }
                },
                oneClick: false
            }
        },
        mounted() {
            this.watchGetters();
            this.$parent.$on('cartOpen', this.cartOpen);
            let cartGet = sessionStorage.getItem('cartItems');
            if (cartGet != undefined && cartGet != null) {
                this.cartItems = JSON.parse(cartGet);
                this.cartChangeItems();
            }
            this.menuOpened = false;
            this.subMenu = this.$route.path.split('/')[1] + '/';
        },
        watch: {
            $route(to, from) {
                this.switchItems();
                this.filters_set = {
                    ages: [],
                    clas: [],
                    color: [],
                    packs: [],
                    sugar: []
                }
            }
        },
        methods: {
            checkForm: function (type) {
                if (type == 'name') {
                    this.forms.name.val.length < 3 ? this.forms.name.sucs = false : this.forms.name.sucs = true
                } else if (type == 'tel') {
                    this.forms.tel.val.length != 18 ? this.forms.tel.sucs = false : this.forms.tel.sucs = true
                } else if (type == 'email') {
                    this.validEmail(this.forms.email.val) ? this.forms.email.sucs = true : this.forms.email.sucs = false
                }
            },
            sendOrder: function (one) {
                if(!one) {
                    this.checkForm('name');
                    this.checkForm('tel');
                    this.checkForm('email');
                }else {
                    this.checkForm('tel');
                    this.forms.email.sucs = true;
                    this.forms.name.sucs = true;
                }
                if (this.forms.tel.sucs && this.forms.email.sucs && this.forms.name.sucs) {
                    let letter = ''
                    let u = this.forms.name.val
                    let t = this.forms.tel.val
                    let e = this.forms.email.val
                    letter = '<table style="width: 500px">'
                    letter += '<tbody>'
                    letter += '<tr><td>Название</td><td>Литраж</td><td>Цена</td><td>Колл</td><td>Сумма</td>'
                    for (let item in this.cartItems) {
                        letter += '<tr>';
                        letter += '<td style=\"width:150px\">' + this.cartItems[item].item.name + '</td>';
                        letter += '<td style=\"min-width: 50px; text-align: center;\">' + this.cartItems[item].item.litrag.trim() + 'л.</td>';
                        letter += '<td style=\"min-width: 50px; text-align: right;\">' + ~~this.cartItems[item].item.price.trim() + ' грн.</td>';
                        letter += '<td style=\"min-width: 50px; text-align: center;">' + this.cartItems[item].count + '</td>';
                        letter += '<td style=\"min-width: 50px; text-align: right;\">' + ~~this.cartItems[item].item.price.trim() * this.cartItems[item].count + ' грн.</td>';
                        letter += '</tr>';
                    }
                    letter += '<tr><td></td><td></td><td></td><td>Итого:</td> <td>' + this.cartSumm + ' грн.</td></tr>';
                    letter += '</tbody>'
                    letter += '</table>'


                    // let route = 'http://m.absolut-kiev.com';
                    let route = '';
                    let _this = this;
                    axios({
                        method: 'get',
                        url: route + '/assets/js/sendEmail.php?letter=' + letter + '&user=' + u + '&tel=' + t + '&email=' + e,
                    }).then(function (resp) {
                        _this.forms.tel.val = ''
                        _this.forms.name.val = ''
                        _this.forms.email.val = ''

                    })
                }
            },
            validEmail: function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            cartOpen: function () {
                this.oneClick = false;
                this.cartOpened = !this.cartOpened;
                this.subscribeForm = false;
            },
            addToCart: function (item) {
                if (this.cartItems[item.id]) {
                    this.cartItems[item.id].count += 1;
                } else {
                    this.$set(this.cartItems, item.id, {});
                    this.$set(this.cartItems[item.id], 'count', 1);
                    this.cartItems[item.id].item = item;
                }
                this.cartChangeItems();

            },
            addToCartOneClick: function (item) {
                this.cartItems = {};
                if (this.cartItems[item.id]) {
                    this.cartItems[item.id].count += 1;
                } else {
                    this.$set(this.cartItems, item.id, {});
                    this.$set(this.cartItems[item.id], 'count', 1);
                    this.cartItems[item.id].item = item;
                }

                this.cartChangeItems();
                this.cartOpen();
                this.oneClick = true;
            },
            setCartItem: function (e) {
                this.cartItems[~~e.target.getAttribute('data-id')].count = e.target.value;
                this.cartChangeItems();
            },
            minusCartItem: function (item) {
                if (this.cartItems[item.id].count - 1) {
                    this.cartItems[item.id].count -= 1;
                } else {
                    this.$delete(this.cartItems, item.id);
                }
                this.cartChangeItems();
            },
            deleteCartItem: function (item) {
                this.$delete(this.cartItems, item.id);
                this.cartChangeItems();
            },

            cartChangeItems: function () {
                this.cartSumm = 0;
                for (let item in this.cartItems) {
                    this.cartSumm += this.cartItems[item].count * this.cartItems[item].item.price
                }
                this.$store.dispatch('SET_COOKIE_CART', this.cartItems);
            },


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
                        // console.log('state', state)
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
                this.maxPriceFilter = this.maxPrice;
                this.priceModel = [this.minPriceFilter, this.maxPriceFilter]
                this.sortItems();
            },
            getFilters: function (items) {

                for (let item in items.filters) {
                    // console.log(item, items.filters[item])
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
                this.timeout ? clearTimeout(this.timeout) : '';
                let values = this.$refs.slider.getValue();
                let params = {};
                params[this.$route.path] = {'max': values[1], 'min': values[0]}
                this.$store.dispatch('SET_items_Filters', params);

                this.maxPriceFilter = values[1]
                this.minPriceFilter = values[0]
                this.priceModel = [this.minPriceFilter, this.maxPriceFilter]
                this.sortItems();
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
