<script setup>
import { onMounted, ref } from 'vue';
import LoginImg from '../../assets/login.jpg'
import { router } from '../../routes';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const onRoute = () => {
    router.push({
        name: "signup"
    })
}
const email = ref('')
const password = ref('')
const toast = useToast();

onMounted(() => {
    localStorage.removeItem('loggedUser')
})


const onLogin = () => {
    const getUses = JSON.parse(localStorage.getItem('users')) ?? [];
    const userFound = getUses.find(user => {
        let encodedPassword = window.atob(user.password);
        return user.email === email.value && encodedPassword === password.value
    });
    if (userFound) {
        router.push({
            name: 'home'
        });
        localStorage.setItem('loggedUser', JSON.stringify(userFound))
        toast.success('Login successfull')
    } else {
        toast.error('Invalid credentials')
    }
}

</script>

<template>
    <div class="container">
        <v-row>
            <v-col :cols="12" sm="6" md="5" lg="5">
                <div class="form-cont d-flex justify-center align-center text-center">
                    <!-- <div class="cont-box text-center"> -->
                        <form @submit.prevent="onLogin">
                            <h4 class="heading4 mb-1">Login </h4>
                            <div class="form-row">
                                <input type="text" class="form-control" placeholder="Email address" v-model="email"
                                    required>
                            </div>
                            <div class="form-row">
                                <input type="text" class="form-control" placeholder="Password" v-model="password"
                                    required>
                            </div>
                            <div class="form-row">
                                <button type="submit" class="btn-primary">Sign in</button>
                            </div>
                            <div class=" text-center " style="text-align: center;">
                                <span class="f-14 cursor-pointer">Don't have an account? <a @click="onRoute">Create new</a> </span>
                            </div>
                        </form>
                    <!-- </div> -->
                </div>
            </v-col>
            <v-col :cols="12" sm="6" md="7" lg="7">
                <div class="img-cont">
                    <img :src=LoginImg alt="">
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>