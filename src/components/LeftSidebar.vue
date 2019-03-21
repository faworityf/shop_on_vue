<template>
    <div class="left-sidebar">
        <div class="cat">Каталог: <span>выберите товар</span></div>
        <ul class="catalog">
            <li v-for="route in routes.routes"><router-link  :to="route.path">{{route.name}}</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "KatalogMenu",
        data() {
            return {
                routes:null
            }
        },
        mounted (el) {
            this.routes = this.$store.getters.Obj;
            console.log(this.routes)
        }
    }
</script>

<style scoped>

</style>