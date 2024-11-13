<script setup>
const props = defineProps({
    tasks: {
        type: Array,
        required: true
    },
});
const emit = defineEmits(['check-click','delete-click'])

</script>
<template>
    <ul class="ul-list custom-scroll">
        <li v-for="task in tasks" :key="task.name">
            <label :class="{ completed: task.completed }">
                <input type="checkbox" v-model="task.completed" @change="emit('check-click', $event, task)">
                <span>{{ task.value }}</span>
            </label>
            <button class="btn-remove float-right" @click="emit('delete-click', task.value)">Remove</button>
        </li>
        <li v-if="tasks?.length == 0">
            <span>No tasks to display.</span>
        </li>
    </ul>
</template>
<style scoped>
.ul-list {
    list-style: none;
    padding: 8px;
    text-align: left;
    max-height: 400px;
    overflow-x: auto;
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

li {
    border-radius: 5px;
    text-align: left;
    padding: 8px;
    margin-bottom: 5px;
    min-height: 35px;
    height: auto;
    background-color: #cccccc26;
    box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

li:hover {
    background-color: #ffffff;
    cursor: pointer;
    transform: scale(1.01);
    transition: transform 0.3s ease;
}

.float-right {
    float: right;
}

.btn-remove {
    color: #dc3545 !important;
    background-color: #dc35451f;
    padding: 2px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    width: auto;

}

.btn-remove:hover {
    border-color: #dc3545;
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
</style>