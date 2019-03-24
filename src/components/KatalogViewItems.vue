<template>
    <div >
        <div v-for="good in goods">
            <KatalogViewItems :goods="good.children" v-if="good.children && good.item != 'msProduct'"></KatalogViewItems>
            <div class="good" v-else-if="good.item == 'msProduct'">
                <div class="good-wrap">
                    <div class="good-img">
                        <a href="[[~[[+id]]]]">
                            <img :src.trim="'//m.absolut-kiev.com'+good.image.trim()"/>
                        </a>
                    </div>
                    <div class="good-description">
                        <div class="good-name">
                            <a href="[[~[[+id]]]]">
                                [[+pagetitle]]
                            </a>
                        </div>

                        <div class="good-else">
                            <div class="good-displacement good-info">
                                Емкость: <span>[[+weight]] л.</span>
                            </div>
                            <div class="good-alcohol good-info">
                                Содержание алкоголя: <span>[[!msOptions? &name=`size` &product=`[[+id]]`]]</span>
                            </div>
                            <div class="good-county">
                                Страна-производитель: <span>[[+made_in]]</span>
                            </div>

                        </div>
                        <div class="price-buy">
                            <div class="prices">
                                [[+old_price:is=`0`:then=`<div class="price-before with-null">&nbsp;</div>` :else=`<div class="price-before">[[+old_price]] грн.</div>`]]
                                <div class="price-current">[[+price]] грн.</div>
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

    </div>
</template>

<script>
    import KatalogViewItems from '@/components/KatalogViewItems.vue'
    export default {
        name: "KatalogViewItems",
        props:['goods'],
        components: {
            KatalogViewItems
        },
        data() {
            return {
                routes:{routes:{}}
            }
        },

    }
</script>

<style scoped>

</style>