<script setup>
import { router } from '../routes';
import NoData from '../assets/nodata.png'


const props =defineProps({
    product: {
        type: Object
    },
})


const onViewDetails = () => {
    console.log(props)
    let encId = window.btoa(props.product.id)
    router.push({
        name: 'product',
        params: { id: encId }
    });    
}

</script>

<template>
    <div class="card" style="padding: 20px;border: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between;">
            <div style="display: grid;">
                <p class="fw-700 f-20 mb-0 mt-0 cursor-pointer" @click="onViewDetails" v-tooltip="'View details'">{{
                    props.product.title }}</p>
                <label class="mt-1"><i class="fa fa-star fa-fw"></i>{{ props.product.rating }} ({{ props.product.reviews.length }}
                    reviews)</label>
                <slot name="date"></slot>
                <label class="f-20 fw-600" style="margin-left: 4px;">${{ props.product.price }}</label>
            </div>
            <span :class="`fw-700 f-15 mb-0 mt-0 badge ${props.product.category}`">{{ props.product.category }}</span>
        </div>
        <p style="color: grey;" class="f-12 fw-600 mt-1">{{ props.product.description }}</p>
    </div>
    
</template>

<style scoped>
.badge {
    background-color: #273cb0;
    color: #fff;
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 4px;
    margin-left: 5px;
    height: fit-content;
}

.badge.beauty {
    background-color: #E91E63;
}

.badge.fragrances {
    background-color: #9C27B0;
}

.badge.furniture {
    background-color: #795548;
}

.badge.groceries {
    background-color: #4CAF50;
}

label {
    font-size: 14px;
}

.fa-star {
    color: gold;
}
</style>