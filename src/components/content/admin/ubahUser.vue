<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAlert } from "@/strore/alert";
import { useRoute } from "vue-router";
const user = ref({});
const userId = Number(useRoute().params.id);
const storeAlert = useAlert();

const getUser = async () => {
    try {
        const { data } = await axios.get(`otentikasi/${userId}`);
        user.value = data.data;
    } catch (error) {
        storeAlert.errorAlert.message = error.response.data.message;
        storeAlert.errorAlert.statusAlert = true;
        storeAlert.errorAlert.statusText = error.response.statusText;
    }
};
getUser();
</script>


<template>
    <h1 class='h3 mb-4 text-gray-800'>Ubah Otentikasi</h1>
    <hr />
    <div class='card'>
        <div class='card-body'>
            <form @submit.prevent="handleSubmit">
                <div class="d-flex justify-content-end mb-3">
                    <button @click="batal" type="button" class="btn btn-sm btn-warning mr-2">
                        <i class="fa-brands fa-x-twitter"></i>
                        Batal
                    </button>
                    <button type="submit" class="btn btn-sm btn-info">
                        <i class="fa-solid fa-paper-plane"></i>
                        Simpan
                    </button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 col-md-6 mb-4">
                        <div class="input-group input-group-sm">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Username :</span>
                            </div>
                        </div>
                        <div class="input-group input-group-sm">
                            <input  type="text" class="form-control" name="Username"
                                autocomplete="off" required />
                        </div>

                        <div class="mt-4 input-group input-group-sm">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Password :</span>
                            </div>
                        </div>
                        <div class="input-group input-group-sm">
                            <input  type="password" class="form-control" name="Password"
                                required />
                        </div>
                        <div class="mt-4 input-group input-group-sm">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Konfirmasi Password :</span>
                            </div>
                        </div>
                        <div class="input-group input-group-sm">
                            <input  type="password" class="form-control"
                                name="KonfirmasiPassword" required />
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-4">
                        <alertHandling />
                        <div class="alert alert-info">
                            Password minimal harus memiliki panjangan 10 karakter, sebaiknya samakan dengan Username dan
                            tidak boleh spasi.
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
