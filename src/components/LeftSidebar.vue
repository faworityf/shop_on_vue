<template>

</template>

<script>
    export default {
        name: "KatalogMenu",
        props: ['routes'],
        data() {
            return {
                mainRoutes: [],
                subRoutes: [],
                goodsItems: [],
                filters:[]
            }
        },
        mounted() {
            this.watchGetters();
        },
        methods: {
            watchGetters: function () {
                this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'SET_MainRoute':
                            this.mainRoutes = state.mainRoutes;
                        case 'SET_SubRoute':
                            this.subRoutes = state.subRoutes;
                        case 'SET_Items':
                            this.goodsItems = state.items;
                            break;
                    }
                })

            },

        }
    }
</script>
