<style lang="scss">
.main {
  &__basket {
    background: rgb(186, 186, 186);
    padding: 100px;
    // height: 85vh;
  }
}
</style>
<template>
  <main class="main__basket">
    <div class="container">
      <h1 class="main__title">Корзина</h1>
      <div class="main__products">
        <router-link :to="'/cards/' + item.id" class="main__card" v-for="item in delItem.items" :key="item.id">
          <p class="main__card-discount">{{ "скидка " + Math.round(item.discountPercentage) + "%" }}</p>
          <img :src="item.thumbnail" alt="" class="main__card-img" />
          <h3 class="main__card-title">{{ item.title }}</h3>
          <div class="main__card-box">
            <p class="main__card-price">{{ item.price + " 000 сум" }}</p>
            <router-link to="">
              <button @click="delBasket(item)" class="main__card-btn">Удалить</button>
            </router-link>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import useProduct from "@/stores/basket.js";

const delItem = useProduct();

const delBasket = (product) => delItem.delBasket(product);
</script>