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

const toast = useToast(0);
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
const userList = ref(JSON.parse(localStorage.getItem('users')))
const userName = loggedUser.f_name + ' ' + (loggedUser.l_name ?? '');

const filteredUsers = computed(() => {
  console.log(userList)
  return userList.value.filter(user => user.role == "1");
})


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
        <h4 v-if="loggedUser.role === '0'">User list</h4>
        <h4 v-else>User</h4>
      </div>
      <div>
        <i class="fa fa-sign-out f-18" @click="onLogout" style="cursor: pointer;"></i>
        <p style="margin: 0;" class="fw-600 f-14">{{ userName }}</p>
      </div>
    </div>
    <div v-if="loggedUser.role === '0'" style="margin-top: 20px;max-height: 400px;overflow-x: auto;"
      class="custom-scroll">
      <UserList :userList="filteredUsers" />
    </div>
    <div v-else style="display: flex;align-items: center;justify-content: center; width: 100%;">
      <UserDetails :loggedUser="loggedUser" />
    </div>
  </div>
</template>

<style scoped>
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

.img-responsive {
  object-fit: contain;
  width: 30px;
  height: 30px;
  /* border-radius: 100px; */
  cursor: pointer;
}
</style>
