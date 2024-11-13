import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/auth/login.vue';
import SignUp from './components/auth/SignUp.vue';
import Home from './components/Home.vue';

const routes = [
    { path: "/", component:  Login, name: "login" },
    { path: "/create-new-account", component:  SignUp, name: "signup" },
    { path: "/home", component:  Home, name: "home" },
]

export const router = createRouter({
    history: createWebHistory('/user-registration/'),
    routes
});

router.beforeEach((to, from) => {
    console.log(from,to)
    const isLogin = JSON.parse(localStorage.getItem('loggedUser'))
    if (to.name !== 'login' && to.name !== 'signup' && !isLogin) {
        return { name: 'login' }
    } else if (to.name !== 'home' && isLogin) {
        return { name: 'home' }
    }
})
