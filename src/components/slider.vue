<template>
    <div class="slider-sec">
        <div class="container">
            <slick class="slider slider-js" ref="slick"  :options="slickOptions">
                <img src="http://m.absolut-kiev.com/assets/img/banner_kaheti_10_let_0.jpg" alt="">
                <img src="http://m.absolut-kiev.com/assets/img/valentina_2018.jpg"/>
                <img src="http://m.absolut-kiev.com/assets/img/bez_imeni-1.jpg" alt="">
                <img src="http://m.absolut-kiev.com/assets/img/discount-happy-mom1.jpg" alt="">
            </slick>
        </div>
    </div>
</template>

<script>
    import jQuery from "jquery";
    window.jQuery = window.$ = jQuery
    import Slick from 'vue-slick';

    export default {
        name: "slider",
        components: {
            Slick,
            // $,
            // jquery
        },
        data() {
            return {
                slickOptions: {
                    arrows: false,
                    appendDots: false,
                    autoplay: true,
                    autoplaySpeed: 2000
                },
            };
        },

    }
</script>

<style scoped>

</style>