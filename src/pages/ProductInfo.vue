<style lang="scss">
.productInfo {
  background: rgb(186, 186, 186);
  // height: 85vh;
  padding: 50px 0;

  &__item {
    text-align: center;
    padding: 20px;
    gap: 50px;
    background: #fff;
  }

  &__item img {
    width: 50%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 20px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__info-title {
    color: rgb(6, 47, 66);
    font-size: 36px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 20px;
  }

  &-box {
    display: flex;
    gap: 50px;
    margin-top: 20px;
    justify-content: center;
  }

  &__info-price,
  &__info-stock {
    color: rgb(6, 47, 66);
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
  }

  &__info-btn {
    box-sizing: border-box;
    border: 1px solid rgb(0, 92, 103);
    padding: 5px 20px;
    color: rgb(6, 47, 66);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: left;
    margin-top: 20px;
    transition: 700ms linear;
  }

  &__info-btn:hover {
    box-shadow: 0 0 10px 0 #000;
  }
}
.back {
  box-sizing: border-box;
  border: 1px solid #000;
  padding: 5px 20px;
  color: #000;
  transition: 700ms linear;
}

.back:hover {
  box-shadow: 0 0 10px 0 #000;
}

.btn__back {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
<template>
  <div class="productInfo">
    <div class="container">
      <div class="productInfo__item">
        <Swiper>
          <SwiperSlide v-for="img in getProduct?.images" :key="img.id">
            <img :src="img" alt="" />
          </SwiperSlide>
        </Swiper>
        <div class="productInfo__info">
          <h2 class="productInfo__info-title">{{ getProduct?.title }}</h2>
          <p class="productInfo__info-desc">{{ getProduct?.description }}</p>
          <div class="productInfo-box">
            <p class="productInfo__info-price">{{getProduct?.price + " 000 сумм" + " со скидкой - " + getProduct?.discountPercentage + "%" }}</p>
            <p class="productInfo__info-stock"> {{ getProduct?.stock + " штук" }} </p>
          </div>
          <div class="productInfo__info-buy">
            <button @click="addBasket(getProduct)" class="productInfo__info-btn">Купить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn__back">
      <router-link to="/" class="back">Назад</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProducts } from "@/stores/products.js";
import useProduct from "@/stores/basket.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const productsStore = useProducts();
const productId = ref(null);
const addItem = useProduct();

onMounted(() => {
  const route = useRoute();
  if (route.params.id) {
    productId.value = parseInt(route.params.id);
  }
  if (!productsStore.products || !productsStore.products.length) {
    productsStore.getProducts();
  }
});

const getProduct = computed(() => {
  if (productsStore.products && productId.value !== null) {
    return productsStore.products.find((card) => card.id === productId.value);
  }
  return null;
});

const addBasket = (product) => (
  addItem.addBasket(product),
  console.log(product)
);




</script>
