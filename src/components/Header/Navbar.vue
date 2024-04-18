<template>
  <header class="header">
    <nav class="header__nav">
      <div class="container">
        <router-link to="/" class="header__logo"
          ><img src="@/assets/images/logo.png" alt=""
        /></router-link>
        <ul class="header__list">
          <li v-for="(link, i) in links" :key="i"><router-link :to="link.url" class="header__link">{{ link.title }}</router-link></li>
        </ul>
        <router-link to="/basket" class="header__btn"><img src="@/assets/images/basket.png" alt=""></router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: "Новинки", url: "/news" },
        { title: "Категории", url: "/categories" },
        { title: "Скидки", url: "/sales" },
        { title: "Контакты", url: "/contacts" },
        { title: "О нас", url: "/about" },
      ],
    };
  },
};
</script>