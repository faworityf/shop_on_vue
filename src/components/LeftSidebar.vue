<template>
    <div class="left-sidebar">
        <div class="cat">Каталог: <span>выберите товар</span></div>
        <ul class="catalog">
            <li v-for="route in routes.routes" v-if="route.menu == 'katalog' && route.parent == 2">
                <router-link  :to="route.path">{{route.name}}</router-link>
                <ul  class="sub-ul-menu">
                    <ul>
                        <li v-for="rout in routes.routes" v-if="route.menu == 'katalog' && route.id == rout.parent">
                            <router-link  :to="rout.path">{{rout.name}}</router-link>
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
        data() {
            return {
                routes:{routes:{}}
            }
        },
        mounted (el) {
            this.$store.dispatch('SET_OBJ');
            this.routes = this.$store.getters.Obj;
        }
    }
</script>

<style scoped>

</style>