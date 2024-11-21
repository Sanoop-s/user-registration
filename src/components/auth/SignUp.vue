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
        <v-row>
            <v-col :cols="12" sm="6" md="5" lg="5">
                <div class="form-cont d-flex align-center justify-center text-center">
                    <form @submit.prevent="onSubmit">
                        <h4 class="heading4 mb-1">Create new account</h4>
                        <v-row>
                            <v-col :cols="12">
                                <input type="text" class="form-control" placeholder="First name"
                                    v-model="formData.f_name" required>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <input type="text" class="form-control" placeholder="Last name"
                                    v-model="formData.l_name">
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <input type="text" class="form-control" placeholder="Email address"
                                    v-model="formData.email" required>
                                <span v-if="duplicate"><small class="text-error ">This user already
                                        exists</small></span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <input type="text" class="form-control" placeholder="Phone number"
                                    v-model="formData.phone">
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <input type="text" class="form-control" placeholder="Password"
                                    v-model="formData.password" required>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <select class="form-control" placeholder="Role" style="width: 100%;height: 38px;"
                                    v-model="formData.role" required>
                                    <option value="0">Admin</option>
                                    <option value="1">User</option>
                                </select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <button type="submit" class="btn-primary">Sign up</button>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <span class="f-14 cursor-pointer"><a @click="onRoute">Back to login</a> </span>
                            </v-col>
                        </v-row>
                    </form>
                </div>
            </v-col>
            <v-col :cols="12" sm="6" md="7" lg="7">
                <div class="img-cont">
                    <img :src=LoginImg alt="login-img">
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.text-error {
    color: red;
    float: left;
}
</style>