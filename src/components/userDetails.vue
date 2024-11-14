<script setup>
import { onMounted, ref, watch } from 'vue';
import { getRequest } from '../axios/axiosClient';
import ProductList from './ProductList.vue';
import NoData from '../assets/nodata.png'


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
        const response = await getRequest('/products');
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
            console.log(response);
            products.value = response.data.products ?? [];


        } catch {

        }
    } else {
        getProducts()
    }


})

const getProductBySearch = async () => {
    const decId = window.atob(id.value)
    try {
        const response = await getRequest(`products/${decId}`);
        console.log(response);
        product.value = response.data

    } catch {

    }
}
</script>

<template>
    <div class="card cont">
        <div class="img-div">
            <img src="../assets/user.png" alt="">
        </div>
        <div class="detail">
            <p class="fw-700 f-15 mb-0 mt-0" style="color: #fa4747;">{{ loggedUser?.f_name + ' ' + loggedUser?.l_name }}
            </p>
            <p style="margin: 0;color: gray;" class="f-12 fw-600">{{ loggedUser?.role === '1' ? 'User' : '' }}</p>
            <p style="margin: 0;color: gray;" class="f-12 fw-600">{{ loggedUser?.phone }}</p>
        </div>
    </div>
    <div style="margin-top: 20px;">
        <div class="d-flex justify-content-between text-left" style="padding: 0px 20px;">
            <span class="fw-700 f-20 mb-0 ">Product list</span>
            <input type="text" class="form-control" placeholder="Search here" style="width: 30%;" v-model="search">
        </div>
        <div v-if="!loading" class="d-flex " style="justify-content: center;">
            <div class="product-cont custom-scroll text-left"  v-if="products.length > 0">
                <template v-for="product in products">
                    <ProductList :product="product"></ProductList>
                </template>
               
            </div>
            <div v-else class="no-data">
                    <img :src="NoData" alt="">
                    <p>No data found</p>
                </div>
        </div>
        <div class="loader-cont mt-1" v-else>
            <div class="loader"></div>
        </div>
    </div>
</template>

<style scoped>
.detail {
    display: block;
}

.product-cont {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 98%;
    margin: 12px;
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