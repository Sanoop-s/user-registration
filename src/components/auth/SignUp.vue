<script setup>
import { ref } from 'vue';
import LoginImg from '../../assets/login.jpg'
import { router } from '../../routes';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const onRoute = () => {
    router.push({
        name: "login"
    })
}

const formData = ref({
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
    password: '',
    role: '1'
});

const duplicate = ref(false);
const toast = useToast()

const onSubmit = () => {
    const encodedPassword = window.btoa(formData.value.password);

    let data = {
        f_name: formData.value.f_name,
        l_name: formData.value.l_name,
        email: formData.value.email,
        phone: formData.value.phone,
        password: encodedPassword,
        role: formData.value.role
    }
    console.log(data)
    
    const getUses = JSON.parse(localStorage.getItem('users')) || [];
    if (getUses?.length > 0 || getUses) {
        let email = formData.value.email.trim();
        const isDuplicate = getUses.some(user => user.email === email);
        if (isDuplicate) {
            duplicate.value = true;
        } else {
            duplicate.value = false;
            getUses.push(data);
            localStorage.setItem('users', JSON.stringify(getUses));
            router.push({
                name: "login"
            });
            toast.success('User created successfully')
        }
    } else {
        localStorage.setItem('users', JSON.stringify([data]));
        toast.success('User created successfully')
    }
}
</script>
<template>
    <div class="container">
        <div class="form-cont">
            <div class="cont-box text-center">
                <form @submit.prevent="onSubmit">
                    <h4 class="heading4 mb-1">Create new account</h4>
                    <div class="form-row">
                        <input type="text" class="form-control" placeholder="First name" v-model="formData.f_name"
                            required>
                    </div>
                    <div class="form-row">
                        <input type="text" class="form-control" placeholder="Last name" v-model="formData.l_name">
                    </div>
                    <div class="form-row">
                        <input type="text" class="form-control" placeholder="Email address" v-model="formData.email"
                            required>
                        <span v-if="duplicate"><small class="text-error ">This user already exists</small></span>
                    </div>
                    <div class="form-row">
                        <input type="text" class="form-control" placeholder="Phone number" v-model="formData.phone">
                    </div>
                    <div class="form-row ">
                        <input type="text" class="form-control" placeholder="Password" v-model="formData.password"
                            required>
                    </div>
                    <div class="form-row mb-2">
                        <select class="form-control" placeholder="Role" style="width: 100%;height: 38px;"
                            v-model="formData.role" required>
                            <option value="0">Admin</option>
                            <option value="1">User</option>

                        </select>
                    </div>
                    <div class="form-row">
                        <button type="submit">Sign up</button>
                    </div>
                    <div class="form-row text-center " style="text-align: center;">
                        <span class="f-14"><a @click="onRoute">Back to login</a> </span>
                    </div>
                </form>
            </div>
        </div>
        <div class="img-cont">
            <img :src=LoginImg alt="login-img">
        </div>
    </div>
</template>
<style scoped>
.text-error {
    color: red;
    float: left;
}
</style>