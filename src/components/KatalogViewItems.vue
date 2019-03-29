<template>
    <div>
        <div class="goods" v-if="goodsParsed.length">
            <div class="good" v-for="good in goodsParsed" v-if="parentArray.indexOf(good.parent) > -1 || routeMain">
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
                                <div class="price-before" v-if="good.old_price.trim()">{{good.old_price.trim()}} грн.</div>
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
                        <div class="good-alcohol good-info"  v-if="good.alcohol">
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
                        <div class="button but-buy js-buy-btn">Добавить </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-content" v-if="good">
            <!--{{good.content.trim()}}-->
        </div>
    </div>

</template>

<script>
    export default {
        name: "KatalogViewItems",
        props: ['goods'],
        data() {
            return {
                goodsParsed: [],
                goodsFavorites: [],
                goodsItems: [],
                parents: [],
                parentArray: [],
                aliasToId: {},
                routeMain: true,
                good:null
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
                    if (mutation.type == 'SET_MainRoute' || mutation.type == 'SET_SubRoute') {
                        this.parents = state.parents;
                        this.getAliasToId();
                    } else if (mutation.type == 'SET_Favorites') {
                        this.goodsFavorites = state.favorites;
                    } else if (mutation.type == 'SET_Items') {
                        this.goodsItems = state.items;
                    }
                    this.switchItems();
                })
            },
            getAliasToId: function () {
                for (let parent in this.parents) {
                    this.aliasToId["/" + this.parents[parent].path] = {}
                    this.aliasToId["/" + this.parents[parent].path].id = this.parents[parent].id
                    this.aliasToId["/" + this.parents[parent].path].parent = this.parents[parent].parent
                }
            },
            searchForParents: function () {
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
            },
            switchItems: function () {
                if (this.$route.path == '/') {
                    this.routeMain = true;
                    this.goodsParsed = this.goodsFavorites;
                } else {
                    this.good = null;
                    this.searchForParents();
                    this.routeMain = false;
                    this.goodsParsed = this.goodsItems;
                    console.log(this.parentArray.length, this.parentArray)
                    if(!this.parentArray.length) {
                        let idx = this.$route.path;
                        for (let item in this.goodsParsed) {
                            if(idx == this.goodsParsed[item].path) {
                                this.good = this.goodsParsed[item];
                            }
                        }
                    }
                }
            }

        },
    }
</script>
