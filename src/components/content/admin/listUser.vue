<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'
import { useAlert } from '@/strore/alert'
import divAlert from '@/components/Alert.vue'
import $ from 'jquery'
import { onBeforeRouteLeave } from 'vue-router'


const userData = ref([])
const storeAlert = useAlert()
const idUse = sessionStorage.getItem("id");

const getData = async () => {
 try {
  const response = await axios.get('/otentikasi');
  userData.value = response.data.data;
  nextTick(() => {
   $('#utable').DataTable()
  })
 } catch (error) {
  storeAlert.errorAlert.statusAlert = true
  storeAlert.errorAlert.message = error.response.data.message
  storeAlert.errorAlert.statusText = error.response.statusText
 }
}

const hapusUser = async (id) => {
 if (idUse == id) {
  alert('Tidak Bisa Menghapus User Ini')
  return false
 }
 storeAlert.$reset()
 $('#utable').DataTable().destroy()
 let confirmation = window.confirm('Apakah Anda Yakin Ingin Menghapus User?')
 if (!confirmation) {
  $('#utable').DataTable()
  return
 }
 try {
  const response = await axios.delete('/otentikasi/' + id);
  storeAlert.succesAlert.statusAlert = true
  storeAlert.succesAlert.message = response.data.message
  $('#utable').DataTable().destroy()
  getData()
 } catch (error) {
  storeAlert.errorAlert.statusAlert = true
  storeAlert.errorAlert.message = error.response.data.message
  storeAlert.errorAlert.statusText = error.response.statusText
 }
}

// memanggil fungsi getData saat komponen dirender
getData();



// mereset store alert setelah data di render


onBeforeRouteLeave(() => {
 storeAlert.errorAlert.statusAlert = false
 storeAlert.errorAlert.message = ''
 storeAlert.errorAlert.statusText = ''
})


</script>

<template>
 <h1 class="h3 mb-4 text-gray-800">List User Otentikasi</h1>
 <hr />
 <divAlert />
 <div>
  <div class="card mb-3">
   <div class="card-body ">
    <div class="table-responsive">
     <table class="table table-bordered table-hover table-sm" id="utable">
      <thead>
       <tr class="p-0">
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Nama Lengkap</th>
        <th scope="col">Whatsapp</th>
        <th scope="col">User Group</th>
        <th scope="col">Aksi</th>
       </tr>
      </thead>
      <tbody class="p-0">
       <tr v-for="(user, index) in userData" :key="index" class="p-0">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ user.username }}</td>
        <td>{{ user.nama_lengkap }}</td>
        <td>{{ user.nomor_hp }}</td>
        <td>
         <span v-if="user.user_group === '0'" class="badge badge-success">Pegawai</span>
         <span v-else-if="user.user_group === '1'" class="badge badge-info">Admin</span>
         <span v-else-if="user.user_group === '2'" class="badge badge-primary">PTSP</span>
         <span v-else-if="user.user_group === '3'" class="badge badge-danger">Kepala
          Kantor</span>
         <span v-else-if="user.user_group === '4'" class="badge badge-warning">Kasubag/Kasi</span>
         <span v-else-if="user.user_group === '5'" class="badge badge-dark">Arsiparis</span>
        </td>
        <td class="text-center">
         <div class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
           <i class="fa-solid fa-circle-info text-info mr-2"></i>
          </a>
          <div class="dropdown-menu">
           <span class="ml-4">#{{ index + 1 }}</span>
           <hr>
           <router-link class="dropdown-item" :to="'/ubah-user/' + user.id">
            <i class="fa-solid fa-circle-info"></i>
            Detail
           </router-link>
           <button class="dropdown-item" type="button" @click="hapusUser(user.id)"
            :disabled="user.hak_akses === 'Super Admin'">
            <i class="fa-solid fa-trash"></i>
            Hapus
           </button>
          </div>
         </div>
        </td>
       </tr>
      </tbody>
     </table>
    </div>
   </div>
  </div>
 </div>
</template>


<style lang="scss" scoped></style>