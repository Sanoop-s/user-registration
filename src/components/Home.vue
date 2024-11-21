<script setup>
import Swal from 'sweetalert2';
import { router } from '../routes';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import UserList from './userList.vue';
import UserDetails from './userDetails.vue';
import { computed, onMounted,ref } from 'vue';

defineProps({
  msg: String,
})

const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
const userList = ref(JSON.parse(localStorage.getItem('users')))

const filteredUsers = computed(() => {
  return userList.value.filter(user => user.role == "1");
})

</script>

<template>
    <div v-if="loggedUser.role === '0'" style="margin-top: 20px;max-height: 400px;overflow-x: auto;"
      class="custom-scroll">
      <UserList :userList="filteredUsers" />
    </div>
    <div v-else>
      <UserDetails :loggedUser="loggedUser" />
    </div>
</template>

<style scoped>
.img-responsive {
  object-fit: contain;
  width: 30px;
  height: 30px;
  /* border-radius: 100px; */
  cursor: pointer;
}
</style>
