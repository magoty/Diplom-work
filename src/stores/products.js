import {
    defineStore
} from 'pinia'

export const useProducts = defineStore({
    id: 'products',
    state: () => ({
        products: []
    }),

    actions: {
        async getProducts() {
            try {
                const res = await fetch('https://dummyjson.com/products?limit=100');
                let answer = await res.json();
                this.products = answer.products
                console.log(this.products);
            } catch (error) {
                console.log('Ошибка произошла при получении товаров', error);
            }
        },

        next() {
            const nextIndex = this.currentIndex + 12;
            this.products = this.productsStore.products.slice(nextIndex, nextIndex + 12);
            this.currentIndex = nextIndex;
        },
        
        back() {
            const previousIndex = Math.max(0, this.currentIndex - 12);
            this.products = this.productsStore.products.slice(previousIndex, previousIndex + 12);
            this.currentIndex = previousIndex;
        },
    },
    getters: {}
});