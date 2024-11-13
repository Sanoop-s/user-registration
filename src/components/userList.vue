<script setup>

defineProps({
    userList: {
        type: Array
    }
})
</script>

<template>
    <div class="card card-top">
        <div style="padding: 0px 15px;">
            <table>
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Email address</th>
                        <th>Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in userList" :key="index">
                        <td>{{ user.f_name + ' ' + user.l_name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                    </tr>
                    <tr v-if="userList?.length === 0">No data found.</tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
