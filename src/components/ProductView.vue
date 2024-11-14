<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getRequest } from '../axios/axiosClient';
import { router } from '../routes';

const route = useRoute()
const id = ref(route.params.id);
const product = ref(null)

const getProductById = async () => {
    const decId = window.atob(id.value)
    try {
        const response = await getRequest(`products/${decId}`);
        console.log(response);
        product.value = response.data

    } catch {

    }
}

onBeforeMount(() => {
    getProductById()
});

const onRouteBack = () => {
    router.push({
        name: 'home'
    })
}

</script>

<template>
    <div style="text-align: left;" v-if="product">
        <div style="display: flex;justify-content: space-between;padding:10px 20px;align-items: center;">
            <span class="fw-700 f-20 mb-0 ">Product details</span>
            <button style="width: auto;font-size: 14px" @click="onRouteBack"><i class="fa fa-arrow-left"></i>
                Back</button>

        </div>
        <div class="card cont" style="padding: 20px;border: 1px solid #ddd;">
            <div>
                <div class="img-div-large">
                    <img :src="product.thumbnail" alt="">
                </div>
                <div>
                    <div class="mt-2 detail-box">
                        <p class="f-14 mb-0 mt-0">Discount:
                            <span class="fw-600">{{ product.discountPercentage }}%</span>
                        </p>
                        <p class="f-14 mb-0 mt-0">Warranty:
                            <span class="fw-600">{{ product.warrantyInformation }}</span>
                        </p>
                        <p class="f-14 mb-0  mt-0">Weight:
                            <span class="fw-600">{{ product.weight }} kg</span>
                        </p>
                        <p class="f-14 mb-0  mt-0">Shipping:
                            <span class="fw-600">{{ product.shippingInformation }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="detail">
                <div style="display: grid;">
                    <div>
                        <span :class="`fw-700 f-15 mb-0 mt-0 badge ${product.category}`">{{ product.category }}</span>
                        <i class="fa fa-tag float-right fw-600" v-if="product.brand"> 
                            <span style="color: darkgreen;">
                                 {{ product.brand }}</span>
                        </i>
                    </div>
                    <p class="fw-700  mb-0 mt-0 cursor-pointer" style="font-size: 35px;" @click="onViewDetails"
                        v-tooltip="'View details'">
                        {{
                            product.title }}
                    </p>
                    <label class="rating mt-1">
                        <i class="fa fa-star fa-fw"></i>
                        {{ product.rating }} ({{ product.reviews.length }} reviews)
                        <span style="color: darkolivegreen;"> {{ product.stock }} left</span>
                    </label>
                    <slot name="date"></slot>
                    <label class="f-20 fw-600 mt-2" style="margin-left: 4px;">${{ product.price }}</label>
                </div>
                <div class="mt-2">
                    <label class="label-head mt-2 f-12">Description</label>
                    <p class="f-14  mt-0">{{ product.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.badge {
    color: #fff;
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 4px;
    margin-left: 5px;
    height: fit-content;
    width: fit-content;
}

.badge.beauty {
    background-color: #E91E63;
}

.badge.fragrance {
    background-color: #9C27B0;
}

.badge.furniture {
    background-color: #795548;
}

.badge.groceries {
    background-color: #4CAF50;
}

.rating {
    font-size: 14px;
}

.fa-star {
    color: gold;
}

.detail {
    text-align: left;
}

.label-head {
    color: grey;
}

.detail-box {
    border: 1px solid #ccc;
    padding: 7px;
    border-radius: 8px;
    text-align: left;
    background: white;
}

.detail-box p {
    color: darkgray;
    font-weight: 600;
}

.detail-box span {
    color: black;
    font-weight: 600;
}
</style>