<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAlert } from "@/strore/alert";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import alertHandling from '@/components/Alert.vue'
const user = ref({});
const userId = Number(useRoute().params.id);
const storeAlert = useAlert();
const sendPass = ref()
const idUse = sessionStorage.getItem("id");

const batal = () => {
 storeAlert.$reset();
};

const handleSubmit = async () => {
 try {
  const payload = {
   username: user.value.username,
   password: sendPass.value,
   userGroup: user.value.user_group
  };
  const { data } = await axios.put(`otentikasi/${userId}`, payload);
  storeAlert.succesAlert.message = data.message;
  storeAlert.succesAlert.statusAlert = true;
 } catch (error) {
  storeAlert.errorAlert.message = error.response.data.message;
  storeAlert.errorAlert.statusAlert = true;
  storeAlert.errorAlert.statusText = error.response.statusText;
 }
};

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

onBeforeRouteLeave(() => {
 storeAlert.$reset();
})

</script>


<template>
 <h1 class='h3 mb-4 text-gray-800'>Ubah Otentikasi</h1>
 <hr />
 <div class='card'>
  <div class='card-body'>
   <form @submit.prevent="handleSubmit">
    <div class="d-flex justify-content-end mb-3">
     <router-link to="/list-otentikasi" class="btn btn-sm btn-primary mr-2">
      <i class="fa-solid fa-circle-arrow-left"></i>
      Kembali
     </router-link>
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
       <div class="input-group-prepend" v-if="idUse != userId">
        <span class="input-group-text" id="inputGroup-sizing-sm">Username :</span>
       </div>
      </div>
      <div class="input-group input-group-sm" v-if="idUse != userId">
       <input v-model="user.username" type="text" class="form-control" name="Username" autocomplete="off" required />
      </div>

      <div class="mt-4 input-group input-group-sm">
       <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Password : </span>
       </div>
      </div>
      <div class="input-group input-group-sm">
       <input type="password" class="form-control" name="Password" v-model="sendPass" />
      </div>
      <div class="mt-4 input-group input-group-sm" v-if="idUse != userId">
       <div class=" input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Role Grup :</span>
       </div>
      </div>
      <div class='border border-secondary rounded p-2 custom-boxRol' v-if="idUse != userId">
       <div class="d-flex">
        <div class="custom-control custom-checkbox">
         <input type="radio" class="boxRol" v-model="user.user_group" id="customCheck1" name="customRadio" :value="1"
          :checked="user.user_group === '1'" @focus="user.user_group = '1'">
         <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2 m-0 shadow-lg"
          for="customCheck1"
          :class="{ 'badge-primary': user.user_group === '1', 'badge-light': user.user_group !== '1' }">Admin</label>
        </div>
        <div class="custom-control custom-checkbox mr-4">
         <input type="radio" class="boxRol" v-model="user.user_group" id="customCheck2" name="customRadio" :value="2"
          :checked="user.user_group === '2'" @focus="user.user_group = '2'">
         <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2 m-0 shadow-lg"
          for="customCheck2"
          :class="{ 'badge-primary': user.user_group === '2', 'badge-light': user.user_group !== '2' }">PTSP</label>
        </div>
        <div class="custom-contro2 custom-checkbox mr-4">
         <input type="radio" class="boxRol" v-model="user.user_group" id="customCheck3" name="customRadio" value="3"
          :checked="user.user_group === '3'" @focus="user.user_group = '3'">
         <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2  m-0"
          for="customCheck3"
          :class="{ 'badge-primary  shadow-lg': user.user_group === '3', 'badge-light': user.user_group !== '3' }">Kepala</label>
        </div>
        <div class="custom-contro2 custom-checkbox mr-4">
         <input type="radio" class="boxRol" name="customRadio" v-model="user.user_group" id="customCheck4" value="4"
          :checked="user.user_group === '4'" @focus="user.user_group = '4'">
         <label class=" boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2 m-0"
          for="customCheck4"
          :class="{ 'badge-primary  shadow-lg': user.user_group === '4', 'badge-light': user.user_group !== '4' }">Kasubag/Kasi</label>
        </div>
        <div class="custom-contro2 custom-checkbox mr-4 ">
         <input type="radio" class="boxRol" name="customRadio" v-model="user.user_group" id="customCheck5" value="5"
          :checked="user.user_group === '5'" @focus="user.user_group = '5'">
         <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2  m-0"
          for="customCheck5"
          :class="{ 'badge-primary  shadow-lg': user.user_group === '5', 'badge-light': user.user_group !== '5' }">Arsiparis</label>
        </div>
       </div>
      </div>
     </div>

     <div class="col-12 col-md-6 mb-3">
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


<style scoped>
.boxRol-label-only {
 display: inline-block;
 padding-left: 0.5rem;
}

.boxRol {
 position: absolute;
 z-index: -1;
 opacity: 0;
}

.boxRol-label {
 position: relative;
 cursor: pointer;
}


.box-check-checked {
 background-color: #43908d;
 color: #fff;
}

.custom-boxRol:focus {
 color: #6e707e;
 background-color: #fff;
 border-color: #bac8f3;
 outline: 0;
 box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, .25);
}
</style>
