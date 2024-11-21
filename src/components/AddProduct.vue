<script setup>
import { onMounted, ref } from 'vue';
import { getRequest, postRequest } from '../axios/axiosClient';
import { router } from '../routes';
import Swal from 'sweetalert2';
import { useToast } from 'vue-toast-notification';

const onRouteBack = () => {
    router.push({
        name: 'home'
    })
}
const categories = ref([]);
const selectedFiles = ref();
const imageSrc = ref();
const toast = useToast()

const formData = ref({
    title: '',
    brand: '',
    stock: '',
    weight: '',
    category: '',
    price: '',
    discountPercentage: '',
    shippingInformation: '',
    description: '',
    warrantyInformation: '',
    rating: '',
    thumbnail: ''
})

const getCategories = async () => {
    try {
        const response = await getRequest('/products/categories');
        console.log(response);
        categories.value = response.data ?? []

    } catch (e) {

    }
}

onMounted(() => {
    getCategories()
});

const handleImageUpload = (e) => {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    selectedFiles.value = (files[0]);
    const src = URL.createObjectURL(files[0]);
    imageSrc.value = (src);
    formData.value.thumbnail = e.target.files[0];

};

const handleRemoveImage = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "Want to delete image",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            selectedFiles.value = '';
            imageSrc.value = '';
        }
    });

};

const onSubmit = async () => {
    console.log(formData.value);
    try {
        const response = await postRequest('/products/add', formData.value);
        console.log(response);
        if (response.response.statusText === "Created") {
            toast.success('Product addedd successfully');
            router.push({
                name: 'home'
            })
        } else {
            toast.error('Something went wrong')
        }
    } catch (e) {
        console.log(e)
    }
}


</script>
<template>
    <div style="text-align: left;">
        <div style="display: flex;justify-content: space-between;padding:10px 20px;align-items: center;">
            <span class="fw-700 f-20 mb-0 ">Add product</span>
            <button class="btn-primary" style="width: auto;font-size: 14px" @click="onRouteBack"><i
                    class="fa fa-arrow-left"></i>
                Back</button>
        </div>
        <div class="card cont "
            style="padding: 20px;border: 1px solid #ddd;text-align: left;max-height: 60vh;overflow-x: auto;">
            <form @submit.prevent="onSubmit">
                <v-row>
                    <v-col :cols="12" sm="8" md="8" lg="8">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" placeholder="Title" v-model="formData.title" required>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Stock</label>
                        <input type="text" class="form-control" placeholder="Stock" v-model="formData.stock" required>
                    </v-col>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Weight</label>
                        <input type="text" class="form-control" placeholder="Weight" v-model="formData.weight" required>
                    </v-col>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Category</label>
                        <select class="form-control" placeholder="Category" style="width: 100%;height: 33px;" required
                            v-model="formData.category">
                            <option value="" disabled selected>Select category</option>
                            <option v-for="category in categories" :value="category.slug">{{ category.name }}</option>
                        </select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Price</label>
                        <input type="text" class="form-control" placeholder="Price" v-model="formData.price" required>
                    </v-col>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Discount</label>
                        <input type="text" class="form-control" placeholder="Discount"
                            v-model="formData.discountPercentage" required>
                    </v-col>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Shipping</label>
                        <input type="text" class="form-control" placeholder="Shipping"
                            v-model="formData.shippingInformation" required>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Brand</label>
                        <input type="text" class="form-control" placeholder="Brand" v-model="formData.brand" required>
                    </v-col>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Rating</label>
                        <input type="text" class="form-control" placeholder="Rating" v-model="formData.rating" required>
                    </v-col>
                    <v-col :cols="12" sm="4" md="4" lg="4">
                        <label class="form-label">Warranty</label>
                        <input type="text" class="form-control" placeholder="Warranty"
                            v-model="formData.warrantyInformation" required>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12">
                        <label class="form-label">Description</label>
                        <textarea type="text" rows="5" class="form-control" placeholder="Description"
                            v-model="formData.description" required></textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12" class="d-flex justify-center align-center">
                        <div class="file-container">
                            <div v-if="!imageSrc">
                                <form>
                                    <input type="file" id="media" accept="image/*"
                                        @change="(event) => { handleImageUpload(event) }" />
                                    <div>
                                        <section>
                                            <i class="fa fa-upload"></i>
                                            <p class="mt-0">Upload image.</p>
                                        </section>
                                    </div>
                                </form>
                            </div>
                            <div v-else class="image-uploaded">
                                <div class="trash-div">
                                    <span class="trash" @click="handleRemoveImage"><i class="fa fa-trash"></i></span>
                                </div>
                                <img :src="imageSrc" alt="" style="height: 100%;width: 100%;">
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12">
                        <button type="submit" class="btn-primary">Save</button>
                    </v-col>
                </v-row>
            </form>
        </div>
    </div>
</template>
<style scoped>
form {
    width: 100%;
}

.file-container {
    position: relative;
    cursor: pointer;
    text-align: center;
    width: 32%;
    height: 150px;

}

@media (max-width:600px) {
    .file-container {
        width: 100%;
    }
}

.image-uploaded {
    position: relative;
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.file-container form {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 1.5px dashed #a0a0a0;
    cursor: pointer;
}

.file-container form input {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
}

.file-container form section {
    top: 55%;
    margin-top: -100px;
}

.trash-div {
    position: absolute;
    /* margin-right: -25px; */
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align: end;

}

.trash {
    margin-top: -12px;
    /* margin-right: -25px; */
    z-index: 1;
    background-color: #e91e63;
    height: 24px;
    width: 20px;
    color: white;
    border-radius: 8px;
    text-align: center;
    position: absolute;
}
</style>