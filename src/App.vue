<template>
  <div id="app">
      <header>
          <nav class="nav">
              <div class="menu-toggle">
                  <div class="one"></div>
                  <div class="two"></div>
                  <div class="three"></div>
              </div>
              <div class="container">
                  <ul class="menu">
                      <li class="first leaf"> <router-link to="/">Магазин</router-link></li>
                      <li class="leaf"><a href="/oplata-dostavka">Оплата и доставка</a></li>
                      <li class="leaf"><a href="/zakaz">Заказать</a></li>
                      <li class="leaf"><a href="/blagodarnosti">Отзывы</a></li>
                      <li class="leaf"><a href="/call-back">Обратный звонок</a></li>
                      <li class="last leaf"><a href="/contacts">Контакты</a></li>
                      <li class="last leaf"><a class="cart-open js-cart-open">Корзина</a></li>
                  </ul>
              </div>
          </nav>
          <div class="container">
              <div class="headerunder-menu flex">
                  <div class="header-right">
                      <a href="/" title="Главная" rel="home" id="logo">
                          <img src="assets/img/logo.png" alt="Главная">
                      </a>
                  </div>
                  <div class="header-center">
                      <div class="header-contacts">
                          <div class="our-contacts">Наши контактные телефоны:</div>
                          <div>
                              <div class="tel"><a href="tel:+380673814794"><span>(067) </span>381-47-94</a></div>
                              <div class="tel"><a href="tel:+380934296594"><span>(093) </span>429-65-94</a></div>
                          </div>
                      </div>
                      <div class="header-search">
                          <form action="" class="search-form flex">
                              <input type="search" class="search-input" title="Введите ключевые слова для поиска...">
                              <button class="btn-search">ПОИСК</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
