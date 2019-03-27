<template>
    <div class="left-sidebar">
        <div class="cat">Каталог: <span>выберите товар</span></div>
        <ul class="catalog">
            <li v-for="route in mainRoutes" v-if="route.menu == 'katalog' && route.parent == 2">
                <router-link :to="'/'+route.path">{{route.name}}</router-link>
                <ul class="sub-ul-menu">
                    <ul>
                        <li v-for="rout in subRoutes"  v-if="route.menu == 'katalog' && route.id == rout.parent">
                            <router-link :to="'/'+rout.path">{{rout.name}}</router-link>
                        </li>
                    </ul>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "KatalogMenu",
        props: ['routes'],
        data() {
            return {
                mainRoutes: [],
                subRoutes: []
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
                            break;
                    }
                })

            },
        }
    }
</script>
