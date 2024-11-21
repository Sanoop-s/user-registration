import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './components/auth/login.vue';
import SignUp from './components/auth/SignUp.vue';
import Home from './components/Home.vue';
import ProductView from './components/ProductView.vue';
import MainLayout from './components/MainLayout.vue';
import AddProduct from './components/AddProduct.vue';

const routes = [
    { path: "/", component: Login, name: "login" },
    { path: "/create-new-account", component: SignUp, name: "signup" },
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: "/home", component: Home, name: "home" },
            { path: "/view-product/:id", component: ProductView, name: "product" },
            { path: "/add-product", component: AddProduct, name: "addProduct" },

        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from) => {
    const isLogin = JSON.parse(localStorage.getItem('loggedUser'))
    if (to.name !== 'login' && to.name !== 'signup' && !isLogin) {
        return { name: 'login' }
    } else if (to.name == 'login' && isLogin) {
        return { name: 'home' }
    }
})
