<template>
    <div id="app">
        <header>
            <nav class="nav">
                <div class="menu-toggle" v-bind:class="[mobileOpen ? 'on' : 'off', 'menu-toggle']"
                     @click="mobileOpen = !mobileOpen">
                    <div class="one"></div>
                    <div class="two"></div>
                    <div class="three"></div>
                </div>
                <div v-if="mobile" class="last leaf cart-mobile">
                    <a @click="cartOpen()">
                        <img src="http://m.absolut-kiev.com/assets/img/basket.png" alt="cart">
                    </a>
                </div>
                <div class="container">
                    <ul v-bind:class="[mobileOpen ? 'on' : 'off', 'menu']">
                        <li class="first leaf">
                            <router-link to="/">Магазин</router-link>
                        </li>
                        <li class="leaf"><a href="/oplata-dostavka">Оплата и доставка</a></li>
                        <li class="leaf"><a href="/zakaz">Заказать</a></li>
                        <li class="leaf"><a href="/blagodarnosti">Отзывы</a></li>
                        <li class="leaf"><a href="/call-back">Обратный звонок</a></li>
                        <li class="last leaf"><a href="/contacts">Контакты</a></li>
                        <li class="last leaf"><a class="cart-open js-cart-open" @click="cartOpen()">Корзина</a></li>
                    </ul>
                </div>
            </nav>
            <div class="container mobile-pos">
                <div class="headerunder-menu flex">
                    <div class="header-right">
                        <a href="/" title="Главная" rel="home" id="logo">
                            <img src="assets/img/logo.png" alt="Главная">
                        </a>
                    </div>
                    <div class="header-center">
                        <div class="header-contacts">
                            <div class="our-contacts">Наши контактные телефоны:</div>
                            <div>
                                <div class="tel"><a href="tel:+380673814794"><span>(067) </span>381-47-94</a></div>
                                <div class="tel"><a href="tel:+380934296594"><span>(093) </span>429-65-94</a></div>
                            </div>
                        </div>
                        <div class="header-search">
                            <form action="" class="search-form flex">
                                <input list="searchlist" v-model="input" v-on:input="searchFilter(input = $event.target.value)" type="search"
                                       class="search-input" title="Введите ключевые слова для поиска...">
                                <!--<button class="btn-search">ПОИСК</button>-->
                                <div class="header-search-wrap">
                                    <div class="search-list" v-bar="{preventParentScroll: true}" v-show="searched.length" >
                                        <ul id="searchlist" class="search-list" >
                                            <li v-for="point in searched" :val="point['name']"  @click="clearSearch()">
                                                <router-link :to="point.path">{{ point['name']}}</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
    </div>
    </header>
    <router-view/>
    </div>
</template>
<script>


    export default {
        data() {
            return {
                input: '',
                searched: [],
                goodsAllItems: {},
                mobileOpen: false,
                mobile: window.matchMedia('(max-width: 768px)').matches,
            }
        },
        mounted(el) {
            this.watchGetters();
        },
        methods: {
            cartOpen: function () {
                this.$emit('cartOpen', true);
            },
            clearSearch:function () {
                this.searched = [];
                this.input = '';
            },
            searchFilter: function () {
                let l = [];
                this.searched = [];
                let p = this.input;
                if (this.goodsAllItems && p.length) {
                    this.goodsAllItems.filter(function (obj) {
                        var searchRegex = new RegExp(p, 'i');
                        if (searchRegex.test(obj['name']))
                            l.push(obj);
                    }.bind(this))
                    this.searched = l;
                }
            },
            watchGetters: function () {
                this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'SET_Items':
                            this.goodsAllItems = state.items;
                            break;
                    }
                })

            },
        }
    }
</script>

