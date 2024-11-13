<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import TaskList from './TaskList.vue';

defineProps({
    msg: String,
})

const tasks = ref([]);
const value = ref('');
let required = ref(false);
let duplicate = ref(false);

onMounted(() => {
    const getTasks = JSON.parse(localStorage.getItem('tasklist'));
    if (getTasks?.length > 0) {
        tasks.value = getTasks
    }
})


const onAdd = () => {
    let inputVal = value.value ?? "";
    if (inputVal.trim() !== "") {
        required.value = false;
        let isDuplicate = tasks.value.some(task => task.value.toLowerCase() === inputVal.toLowerCase());
        if (isDuplicate) {
            duplicate.value = true;
        } else {
            let data = {
                value: inputVal,
                completed: false
            }
            tasks.value.push(data);
            localStorage.setItem('tasklist', JSON.stringify(tasks.value));
            value.value = '';
            duplicate.value = false;
        }
    } else {
        required.value = true;
    }
}

const onCheckClick = (event, task) => {
    if (event.target.checked) {
        task.completed = true;
        localStorage.setItem('tasklist', JSON.stringify(tasks.value));
    } else {
        task.completed = false;
        localStorage.setItem('tasklist', JSON.stringify(tasks.value));
    }
}

const onDelete = (val) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Want to delete task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            handleDelete(val)
        }
    });
}

const handleDelete = (val) => {
    const index = tasks.value.findIndex((task) => task.value === val);
    if (index > -1) {
        tasks.value.splice(index, 1);
        localStorage.setItem('tasklist', JSON.stringify(tasks.value));
    }
}

</script>

<template>
    <div class="card card-top" >
        <div style="padding: 0px 15px;">
            <p style="font-weight: 500;">Add Task</p>
            <div class="inputCont">
                <div style="width: 75%;">
                    <input type="text" class="form-control" v-model="value" placeholder="Task name">
                    <span class="text-danger" v-if="required">This field is required.</span>
                    <span class="text-danger" v-if="duplicate">This task already exists!</span>
                </div>
                <div style="width: 25%;">
                    <button type="button" class="addBtn float-right" @click="onAdd">+ Add</button>
                </div>
            </div>
        </div>
        <div class="card">
            <p style="font-weight: 500;">Task list</p>
            <TaskList :tasks="tasks" @delete-click="onDelete" @check-click="onCheckClick"></TaskList>
        </div>
    </div>
</template>

<style scoped>

.addBtn {
    margin-left: 10px;
    width: 60%;

}

.inputCont {
    text-align: left;
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
}

.text-danger {
    color: red;
}

.float-right {
    float: right;
}

h2 {
    margin-top: 0px;
}

.completed {
    text-decoration: line-through;
}

.custom-scroll::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

/* Handle */
.custom-scroll::-webkit-scrollbar-thumb {
    background-color: #9da1a594;
}

.custom-scroll::-webkit-scrollbar {
    width: 5px;
}

.form-control {
    height: 2rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    width: 100%;
    padding: 2px 10px;
}

.form-control:focus-visible {
    outline: #0b96ff auto 1px;
}


.card-top{
    margin-top: 15px;
    box-shadow: none;
    text-align: left;
}
</style>
