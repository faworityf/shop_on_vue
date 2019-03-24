<template>
    <div class="sort-table">
        <div class="sort-by">
            <div class="sort-text">Сортировка:</div>
            <ul>
                <li>
                    <span><span class="sorting js-sorting">от дешевых к дорогим</span></span>
                    <ul class="js-sort-by-choices">
                        <li>
                            <a href="">
                                от дешевых к дорогим
                            </a>
                        </li>
                        <li>
                            <a href="">
                                от дорогих к дешевым
                            </a>
                        </li>
                        <li>
                            <a href="">
                                новинки
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="select-view">
            <div class="show-like">Показать:</div>
            <div class="many-view js-change-view" data-show="0" title="плиткой">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="solo-view js-change-view" data-show="1" title="списком">
                <div class="view-inline">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
                <div class="view-inline">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
                <div class="view-inline">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SortingTable"
    }
</script>

<style scoped>

</style>