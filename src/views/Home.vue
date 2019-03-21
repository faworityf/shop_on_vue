<template>
    <div>
        <slider></slider>
        <div class="container">
            <div class="content">
                <LeftSidebar ></LeftSidebar>
            </div>
        </div>
    </div>
</template>
<script>
    import slider from '@/components/slider.vue'
    import LeftSidebar from '@/components/LeftSidebar.vue'
    export default {
        data() {
            return {
            }
        },
        components: {
            slider,
            LeftSidebar
        },
        mounted (el) {
        }
    }
</script>
