<template>
    <div>
        <!--<slider></slider>-->
        <div class="container">
            <div class="content">
                <LeftSidebar ></LeftSidebar>
                <div class="main-content">
                        <SortingTable></SortingTable>
                        <KatalogViewItems :goods="routes.routes" v-if="routes.routes"></KatalogViewItems>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import slider from '@/components/slider.vue'
    import LeftSidebar from '@/components/LeftSidebar.vue'
    import SortingTable from '@/components/SortingTable.vue'
    import KatalogViewItems from '@/components/KatalogViewItems.vue'


    export default {
        data() {
            return {
                routes:{routes:{}}
            }
        },
        components: {
            slider,
            LeftSidebar,
            SortingTable,
            KatalogViewItems
        },
        mounted (el) {
            this.$store.dispatch('SET_MainRoute');
            this.$store.dispatch('SET_Favorites');
            this.$store.dispatch('SET_SubRoute');
            this.$store.dispatch('SET_Items');
            this.watchGetters();
        },
        methods: {
            watchGetters: function () {
                console.log('watch');
                console.log(3423)
                this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'SET_MainRoute':

                            break;
                    }
                })

            },
        }
    }
</script>
