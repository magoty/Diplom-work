import {
    defineStore
} from 'pinia'

const useProduct = defineStore({
    id: 'basket',
    state: () => ({
        items: [],
    }),
    actions: {
        addBasket(product) {
            const addItem = this.items.find(item => item.id === product.id);
            if (addItem) {
                addItem.quantity += 1
            } else {
                this.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    stock: product.stock,
                    discountPercentage: product.discountPercentage,
                    thumbnail: product.thumbnail,
                })
            }
        },
        delBasket(product){
            const itemIndex = this.items.findIndex(item => item.id === product.id);
            if (itemIndex.quantity !== -1) {
                const delItem = this.items[itemIndex];
                if (delItem.quantity > 1) {
                    delItem.quantity -= 1;
                } else {
                    this.items.splice(itemIndex, 1);
                }
            }
        }
    },
    getters: {},
})

export default useProduct;