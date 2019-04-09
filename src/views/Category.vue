<template>
    <div>
        <slider v-if="routeMain"></slider>
        <div v-bind:class="[routeMain != true ? 'category-goods container' : 'container']">
            <KatalogViewItems ></KatalogViewItems>
        </div>
    </div>
</template>

<script>
    import slider from '@/components/slider.vue'
    import KatalogViewItems from '@/components/KatalogViewItems.vue'


    export default {
        data() {
            return {
                routes: [],
                routeMain: true
            }
        },
        components: {
            slider,
            KatalogViewItems
        },
        mounted (el) {
            this.$store.dispatch('SET_MainRoute');
            this.$store.dispatch('SET_Favorites');
            this.$store.dispatch('SET_SubRoute');
            this.$store.dispatch('SET_Items');
            this.checkMainRoute();
            this.$parent.$on('cartOpen', this.cartOpen)
        },
        watch: {
            $route(to, from) {
               this.checkMainRoute();
            }
        },
        methods: {
            cartOpen:function() {
                this.$emit('cartOpen', true);
            },
            checkMainRoute: function () {
                if (this.$route.path == '/') {
                    this.routeMain = true;
                }else {
                    this.routeMain = false;
                }
            }
        }
    }
</script>
