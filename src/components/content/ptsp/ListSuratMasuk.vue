<script setup>
import axios from 'axios'
import { ref, onMounted, nextTick } from "vue";
import { useSuratMasuk } from "@/strore/suratMasuk";
import { useAlert } from "@/strore/alert";
import { onBeforeRouteLeave } from "vue-router";
import $ from 'jquery'

import alertHandling from '@/components/Alert.vue'


const storeSuratMasuk = useSuratMasuk()
const stortAlert = useAlert()
const alert = ref()


async function tampilanData() {
  try {
    const response = await axios.get('suratmasuk')
    storeSuratMasuk.tampilData = response.data.data
    nextTick(() => {
      $('#mtable').DataTable()
    })
  }
  catch (error) {
    stortAlert.errorAlert.message = error.response.data.message
    stortAlert.errorAlert.statusAlert = true
    stortAlert.errorAlert.statusText = error.response.statusText

  }
}

async function kirimAgain(id) {
  stortAlert.$reset()
  $('#mtable').DataTable().destroy();
  try {
    const response = await axios.put('suratmasuk/' + id)
    stortAlert.succesAlert.statusAlert = true
    stortAlert.succesAlert.message = response.data.message
  }
  catch (error) {
    stortAlert.errorAlert.message = error.response.data.message
    stortAlert.errorAlert.statusAlert = true
    stortAlert.errorAlert.statusText = error.response.statusText
  }
}

const hapusData = (id) => {
  stortAlert.$reset()
  $('#mtable').DataTable().destroy();
  let idSurmas = id
  let confir = confirm('Yakin untuk menghapus data')
  if (confir) {

    axios.delete('suratmasuk' + idSurmas)
      .then((response) => {
        stortAlert.succesAlert.statusAlert = true
        stortAlert.succesAlert.message = response.data.message
        storeSuratMasuk.tampilData = response.data.data
        tampilanData()
      })
      .catch((error) => {
        stortAlert.errorAlert.message = error.response.data.message
        stortAlert.errorAlert.statusAlert = true
        stortAlert.errorAlert.statusText = error.response.statusText
        tampilanData()
      })
  } else {
    alert('ee tidak jadi')
  }
}

onBeforeRouteLeave(() => {
  stortAlert.$reset()
  storeSuratMasuk.$reset()
})

onMounted(() => {
  tampilanData()
})
</script>

<template>
  <h1 class="h3 mb-4 text-gray-800">List Surat Masuk</h1>
  <hr />
  <alertHandling />
  <div>
    <div v-if="alert" class="alert alert-success alert-dismissible fade show text-center" role="alert">
      <strong>Data surat masuk</strong> berhasil di hapus

      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card mb-3">
      <div class="card-body ">
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-sm" id="mtable">
            <thead>
              <tr class="p-0">
                <th scope="col">#</th>
                <th scope="col">Nomor Arsip</th>
                <th scope="col">Dari</th>
                <th scope="col">Perihal</th>
                <th scope="col">Tanggal Surat</th>
                <th scope="col">Status</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody class="p-0">
              <tr v-for="(surmas, index) in storeSuratMasuk.tampilData " :key='index'>
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ surmas.nomor_arsip }}</td>
                <td>{{ surmas.dari }}</td>
                <td>{{ surmas.perihal }}</td>
                <td>{{ surmas.tanggalsurat }}</td>
                <td class="text-center">
                  <span v-if="surmas.disposisi == 0" class="badge badge-danger">Belum Disposisi</span>
                  <span v-if="surmas.disposisi == 1" class="badge badge-success">Sudah Disposisi</span>
                </td>
                <td class="text-center">
                  <div class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-circle-info text-info mr-2"></i>
                    </a>
                    <div class="dropdown-menu">
                      <span class="ml-4">#{{ index + 1 }}</span>
                      <hr>
                      <router-link class="dropdown-item" :to="'/detail-suratmasuk/' + surmas.nomor_arsip">
                        <i class="fa-solid fa-circle-info"></i>
                        Detail
                      </router-link>
                      <button class="dropdown-item" type="button" @click="kirimAgain(surmas.id)">
                        <i class="fa-solid fa-paper-plane"></i>
                        Kirim lagi
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

<style scoped></style>