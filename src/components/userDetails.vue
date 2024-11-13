<script setup>

defineProps({
    loggedUser: {
        type: Object
    }
})
</script>

<template>
    <div class="card cont">
        <div class="img-div">
            <img src="../assets/user.png" alt="">
        </div>
        <div class="detail">
            <p class="fw-700 f-18 mb-0">{{ loggedUser?.f_name + ' ' + loggedUser?.l_name }}</p>
            <p style="margin: 0;color: gray;" class="f-14 fw-600">{{ loggedUser?.role === '1' ? 'User' : '' }}</p>
            <p style="margin: 0;color: gray;" class="f-14 fw-600">{{ loggedUser?.phone  }}</p>
        </div>

    </div>

</template>

<style scoped>
.img-div {
    height: 175px;
    width: 175px;
    background-color: #b4dbed38;
    border-radius: 8px;

}

img {
    width: 100%;
    height: 100%;
}

.cont {
    margin-top: 50px;
    text-align: center;
    padding: 20px;
    border-radius: 8px;

}
</style>