<style lang="scss">
.main {
  background: rgb(186, 186, 186);
  padding: 100px;

  &__settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
  }

  &__quantity-title {
    padding: 10px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: left;
  }

  &__btns {
    margin-top: 50px;
    display: flex;
    gap: 30px;
    justify-content: space-between;
  }

  &__btns-back,
  &__btns-next {
    box-sizing: border-box;
    border: 1px solid #000;
    padding: 5px 20px;
    background: #fff;
  }

  &__btns-back img {
    transform: rotate(90deg);
  }

  &__btns-next img {
    transform: rotate(-90deg);
  }
}
        
.settings {
  &__dropdown {
    row-gap: 20px;
    padding: 12px 10px;
    margin-right: 100px;
    background: rgb(255, 255, 255);
  }

  &__dropdown-title {
    text-align: center;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: left;
  }

  &__btn {
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: left;
    background: rgb(255, 255, 255);
    padding: 12px 20px;
  }
}
</style>
<template>
  <main class="main">
    <div class="container">
      <div class="main__settings">
        <div class="settings__box">
          <select class="settings__dropdown" v-model="sortBy">
            <option value="price" class="settings__dropdown-title">По цене</option>
            <option value="title" class="settings__dropdown-title">По названию</option>
            <option value="stock" class="settings__dropdown-title">По кол-во</option>
          </select>
          <button @click="sort" class="settings__btn">Применить</button>
        </div>
        <h2 class="main__quantity-title">Общее кол-во товаров-{{ productsStore.products.length }}</h2>
      </div>
      <div class="main__products" v-if="productsStore.products">
        <router-link :to="'/cards/' + product.id" class="main__card" v-for="product in productsStore.products.slice(currentIndex, currentIndex + 12)" :key="product.id">
          
          <p class="main__card-discount">
            {{'скидка ' + Math.round(product.discountPercentage) + "%" }}
          </p>
          <img :src="product.thumbnail" alt="" class="main__card-img" />
          <h3 class="main__card-title">{{ product.title }}</h3>
          <div class="main__card-box">
            <p class="main__card-price">{{ product.price + " 000 сум" }}</p>
            <router-link to="">
              <button @click="addProduct(product)" class="main__card-btn">Купить</button>
            </router-link>
          </div>
        </router-link>
      </div>
      <div class="main__btns">
        <button class="main__btns-back" @click="back()">
          <img src="@/assets/images/down.png" alt="" /> Назад
        </button>
        <button class="main__btns-next" @click="next()">
          Вперед <img src="@/assets/images/down.png" alt="" />
        </button>
      </div>
    </div>
  </main>
</template>
  
<script setup>
import { useProducts } from "@/stores/products.js";
import  useProduct  from '@/stores/basket.js';
import { ref, onMounted } from "vue";

let productsStore = useProducts();
const addItem = useProduct();
let currentIndex = ref(0);
const sortBy = ref('')

onMounted(() => {
  productsStore.getProducts();
});

const addProduct = (product) => {
  addItem.addBasket(product)
  console.log(product)
};

const next = () => {
  if (productsStore.products && currentIndex.value + 12 < productsStore.products.length) {
    currentIndex.value += 12;
  }
};

const back = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 12;
  }
};

const sort = () => {
  if(sortBy.value) {
    switch (sortBy.value) {
      case 'price':
        sortToPrice();
        break;
      case 'title':
        sortToTitle();
        break;
      case 'stock':
        sortToStock();
        break;
      default:
        break;
    }
  }
};

const sortToPrice = () => {
  if(productsStore.products) {
    productsStore.products.sort((a, b) => a.price - b.price)
  }
};

const sortToTitle = () => {
  if(productsStore.products) {
    productsStore.products.sort((a, b) => a.title.localeCompare(b.price))
  }
};

const sortToStock = () => {
  if(productsStore.products) {
    productsStore.products.sort((a, b) => a.stock - b.stock)
  }
};


console.log(productsStore.products);
</script>
