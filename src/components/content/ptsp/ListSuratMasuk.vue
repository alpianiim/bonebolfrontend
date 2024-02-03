<script setup>
import axios from 'axios'
import { ref, onMounted, nextTick} from "vue";
import { useSuratMasuk } from "@/strore/suratMasuk";
import { useAlert } from "@/strore/alert";
import $ from 'jquery'

import alertHandling from '@/components/Alert.vue'


const storeSuratMasuk = useSuratMasuk()
const stortAlert = useAlert()
const alert =  ref()
 

async function tampilanData (){
  try{
    const response = await axios.get('/apikemenagbonebol/suratmasuk')
      storeSuratMasuk.tampilData = response.data.data
      nextTick(()=>{
        $('#mtable').DataTable()
      })
    }
    catch(error){
    // console.log("🚀 ~ tampilanData ~ error:", error.response.data)
    stortAlert.errorAlert.message = error.response.data.message
    stortAlert.errorAlert.statusAlert = true 
    stortAlert.errorAlert.statusText =  error.response.statusText

    }
}

const hapusData = (id) => {
  alert.value = false
  let idSurmas = id
  let confir = confirm('Yakin untuk menghapus data')
  if(confir){
   
    axios.delete('/apikemenagbonebol/suratmasuk/'+idSurmas)
    .then((response) =>{
      storeSuratMasuk.tampilData = response.data.data
      alert.value = response.data.status
      tampilanData()
    })
    .catch((error)=>{
      alert.value = false
    })
  }else{
    alert('ee tidak jadi')
  }
}



onMounted (()=>{
  stortAlert.$reset()
  tampilanData()
})


</script>

<template>
  <h1 class="h3 mb-4 text-gray-800">List Surat Masuk</h1>
  <hr />
  <alertHandling />
  <div>
    <div
    v-if="alert"
    class="alert alert-success alert-dismissible fade show text-center"
    role="alert"
  >
    <strong>Data surat masuk</strong> berhasil di hapus
    
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

<table class="table" id="mtable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">No. Arsip</th>
          <th scope="col">Dari</th>
          <th scope="col">Perihal</th>
          <th scope="col">Tanggal Surat</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
     <tr v-for="(surmas, index) in storeSuratMasuk.tampilData " :key='index'>
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ surmas.idSurmas }}</td>
          <td>{{ surmas.dari }}</td>
          <td>{{ surmas.perihal }}</td>
          <td>{{ surmas.tanggalsurat }}</td>
          <td>
            <a href="">
              <i class="fa-regular fa-pen-to-square text-warning mr-2"></i>
            </a>
            <a href="#">
              <i class="fa-solid fa-circle-info text-info mr-2"></i>
            </a>
            <a @click="hapusData(surmas.idSurmas)" >
              <i class="fa-solid fa-trash-can text-danger mr-2"></i>
            </a>
          </td>
        </tr>
      </tbody> 
    </table> 



  </div>
</template>

<style scoped>

</style>