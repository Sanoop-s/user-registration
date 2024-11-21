<script setup>
import { onMounted, ref, watch } from 'vue';
import { getRequest } from '../axios/axiosClient';
import ProductList from './ProductList.vue';
import NoData from '../assets/nodata.png'
import { router } from '../routes';

defineProps({
    loggedUser: {
        type: Object
    }
});

const products = ref([]);
const loading = ref(false);
const search = ref('')

onMounted(() => {
    getProducts()
});

const getProducts = async () => {
    loading.value = true
    try {
        const response = await getRequest('/products?skip=164');
        products.value = response.data.products ?? [];
    } catch (e) {
        console.log('errro', e)
    } finally {
        loading.value = false
    }
}

watch(search, async () => {
    let searchValue = search.value.trim()
    if ((searchValue) !== '') {
        try {
            const response = await getRequest(`/products/search?q=${searchValue}`);
            products.value = response.data.products ?? [];
        } catch {
        }
    } else {
        getProducts()
    }
});

const onRouteNxt = () => {
    router.push({
        name: 'addProduct'
    })
}

</script>

<template>
    <v-row no-gutters>
        <v-col :cols="12">
            <div class="card cont">
                <div class="img-div">
                    <img src="../assets/user.png" alt="">
                </div>
                <div class="detail">
                    <p class="fw-700 f-15 mb-0 mt-0" style="color: #fa4747;">{{ loggedUser?.f_name + ' ' +
                        loggedUser?.l_name }}
                    </p>
                    <p style="margin: 0;color: gray;" class="f-12 fw-600">{{ loggedUser?.role === '1' ? 'User' : '' }}
                    </p>
                    <p style="margin: 0;color: gray;" class="f-12 fw-600">{{ loggedUser?.phone }}</p>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-row no-gutters class="mt-3 ">
        <v-col cols="12" sm="6" md="6" lg="4">
            <span class="px-5 fw-700 f-20 mb-0 ">Product list</span>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="8">
            <v-row>
                <v-col cols="12" sm="12" md="6" class="px-5">
                    <input type="search" class="form-control search" placeholder="Search here" v-model="search">
                </v-col>
                <v-col cols="12" sm="12" md="6" class="px-5">
                    <button type="button " class="btn-primary f-14" @click="onRouteNxt()">+ Add product</button>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <div class="mt-5">
        <v-row no-gutters class="product-cont">
            <v-col cols="12">
                <div v-if="!loading" class="d-flex justify-center custom-scroll text-left ">
                    <v-row v-if="products.length > 0" no-gutters>
                        <v-col :cols="12" xs="12" sm="12" md="6" lg="6" class="pa-2" v-for="product in products">
                            <ProductList :product="product" />
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12">
                            <div class="no-data">
                                <img :src="NoData" alt="">
                                <p>No data found</p> 
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div v-else class="loader-cont mt-1">
                    <div class="loader"></div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.detail {
    display: block;
}

.product-cont {
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    /* width: 98%; */
    width: 100%;
    gap: 20px;
    overflow-x: auto;
    max-height: 55vh;
}

.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 4px solid #0000;
    border-right-color: #d5d5d5;
    position: relative;
    animation: l24 1s infinite linear;
}

.loader:before,
.loader:after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: inherit;
    animation: inherit;
    animation-duration: 2s;
}

.loader:after {
    animation-duration: 4s;
}

@keyframes l24 {
    100% {
        transform: rotate(1turn)
    }
}

.loader-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.no-data {
    height: 150px;
    width: 150px;
    text-align: center;
}
</style>