<template>
    <div>
        <div class="container  category-goods">
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
            this.$store.dispatch('SET_OBJ');
            this.routes = this.$store.getters.Obj;
        }
    }
</script>
