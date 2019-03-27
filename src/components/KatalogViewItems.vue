<template>
    <div class="goods">
            <div class="good" v-for="good in goodsParsed">
                <div class="good-wrap">
                    <div class="good-img">
                        <a :href="good.path.trim()">
                            <img :src.trim="'//m.absolut-kiev.com'+good.image.trim()"/>
                        </a>
                    </div>
                    <div class="good-description">
                        <div class="good-name">
                            <a :href="good.path.trim()">
                                {{good.name.trim()}}
                            </a>
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
                                <div class="button but-buy js-buy-btn">Добавить </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: "KatalogViewItems",
        props:['goods'],
        data() {
            return {
                goodsParsed: []
            }
        },
        mounted () {
            this.watchGetters();
        },

        methods: {
            watchGetters: function () {
                this.$store.subscribe((mutation, state) => {
                    console.log(mutation.type, this.$route.path == '/')

                    if(mutation.type == 'SET_Favorites' && this.$route.path == '/') {
                        console.log(state.favorites)
                        this.goodsParsed = state.favorites;
                        console.log()
                    }
                    else if(mutation.type =='SET_Items' && this.$route.path != '/'){
                            this.goodsParsed = state.items;
                    }
                })
            },
            parseObj: function (obj) {
                for(let good in obj) {
                    if(obj[good].item != 'msProduct' && obj[good].children) {
                        this.parseObj(obj[good].children);
                    }else if(obj[good].item == 'msProduct') {
                        this.goodsParsed.push(obj[good]);
                    }

                }

            }
        },
    }
</script>

<style scoped>

</style>