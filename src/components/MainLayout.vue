<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { router } from '../routes';

const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
const userName = loggedUser.f_name + ' ' + (loggedUser.l_name ?? '');

const onLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Want to Logout!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({
        name: "login"
      });
      localStorage.removeItem('loggedUser')
      toast.success('Logout successfull')
    }
  });
}
</script>

<template>
  <div class="container" style="display: block;">
    <div class="head">
      <div>
        <h2 v-if="loggedUser.role === '0'" style="margin: 0;">User list</h2>
        <h2 v-else style="margin: 0;">User</h2>
      </div>
      <div class="text-center">
        <i class="fa fa-sign-out f-18" @click="onLogout" style="cursor: pointer;"></i>
        <p style="margin: 0;" class="fw-600 f-16">{{ userName }}</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.head {
  background-color: #ffffff;
  padding: 10px 30px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
