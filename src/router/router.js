import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/news', name: 'news', component: () => import('@/pages/News.vue')},
        {path: '/sales', name: 'sales', component: () => import('@/pages/Sales.vue')},
        {path: '/contacts', name: 'contacts', component: () => import('@/pages/Contacts.vue')},
        {path: '/about', name: 'about', component: () => import('@/pages/About.vue')},
        {path: '/categories', name: 'categories', component: () => import('@/pages/Categories.vue')},
        {path: '/cards/:id', name: 'product', component: () => import('@/pages/ProductInfo.vue')},
        {path: '/basket', name: 'basket', component: () => import('@/pages/Basket.vue')},
    ]
})

export default router;