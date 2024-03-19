<script setup>
import { computed, onMounted, ref } from "vue";
import { useDisposisi } from "@/strore/disposisi"
import { useUrl } from "@/strore/urlServer"
import axios from "axios"
import divAlert from "@/components/alert.vue"
import { useAlert } from "@/strore/alert"
import { onBeforeRouteLeave } from "vue-router";

const storeUrl = useUrl()
const storeAlert = useAlert()
const storDispo = useDisposisi()
const detailSurat = ref(false)
const daftarSurat = ref(true)
const currentPage = ref(1);
const perPage = ref(1)

async function getDispos() {
  try {
    const respons = await axios.get('/disposisi')
    storDispo.dataDispo = respons.data.data
  }
  catch (error) {
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = error.response.data.message
    storeAlert.errorAlert.statusText = error.response.statusText
  }
}


const onPageChange = (pageNumber) => {
  currentPage.value = pageNumber
  detailSurat.value = false
}

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return storDispo.dataDispo.slice(start, end)
})


const sesuaiCatatan = computed(() => {
  if (storDispo.isDispo.petunjuk === 'Sesuai Catatan') return false
  return true
})


const handleDetail = ((id, filesurat) => {
  detailSurat.value = true
  daftarSurat.value = false
  storDispo.isDispo.idDisposisi = id
  storDispo.fileSurmas = filesurat
  storeAlert.$reset()

})

const submitDispos = async () => {
  storeAlert.$reset()
  const formData = new FormData()
  Object.keys(storDispo.isDispo).forEach((key) => {
    formData.append(key, storDispo.isDispo[key])
  })
  try {
    const respon = await axios.post('disposisi', formData)
    storeAlert.succesAlert.statusAlert = true
    storeAlert.succesAlert.message = respon.data.message
    detailSurat.value = false
    daftarSurat.value = true
    storDispo.clearDispo()
    getDispos()
  }
  catch (error) {
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = error.response.data.message
    storeAlert.errorAlert.statusText = error.response.statusText
  }

}

const handleDaftar = (() => {
  detailSurat.value = false
  daftarSurat.value = true
  storDispo.clearDispo()
  storeAlert.$reset()
})

onMounted(() => {
  getDispos()
})

onBeforeRouteLeave(() => {
  storeAlert.$reset()
})

</script>

<template>
  <h1 class='h3 mb-4 text-gray-800'>Disposisi Surat Masuk</h1>
  <hr />
  <divAlert />
  <div class="card mb-3">
    <div class="card-body">
      <Transition name="slide-fade">
        <div class=" border rounded-lg shadow-sm mb-3 p-3" v-if="daftarSurat">
          <p class="text-center">
            <strong :class="storDispo.dataDispo.length == 0 ? 'text-success' : 'text-warning'">{{
          storDispo.dataDispo.length
        }}</strong> Surat Masuk Belum di Disposisi
          </p>
          <hr>
          <div v-if="storDispo.dataDispo.length == 0" class="text-center text-success">
            SAAT INI BELUM ADA SURAT MASUK
          </div>

          <div v-for="(item, index) in currentPageData" :key="index">
            <div class="d-flex row">
              <div class="col-12 col-md-3">
                <h3 class="h6"> Nomor Arsip</h3>
              </div>
              <div class="col-12 col-md-9">
                <h3 class="h6"> {{ item.nomor_arsip }} </h3>
              </div>
              <div class="col-12 col-md-3">
                <h3 class="h6"> Nomor Surat</h3>
              </div>
              <div class="col-12 col-md-9">
                <h3 class="h6"> {{ item.nomorsurat }} </h3>
              </div>
              <div class="col-12 col-md-3">
                <h3 class="h6"> Dari</h3>
              </div>
              <div class="col-12 col-md-9">
                <h3 class="h6"> {{ item.dari }} </h3>
              </div>
              <div class="col-12 col-md-3">
                <h3 class="h6"> Perihal</h3>
              </div>
              <div class="col-12 col-md-9">
                <h3 class="h6"> {{ item.perihal }} </h3>
              </div>
            </div>
            <div class="d-flex">
              <a class="btn btn-info btn-sm ml-auto" @click="handleDetail(item.idis, item.filesurat)">
                <i class="fa-solid fa-arrow-down"></i>
                Disposisi/Detail
              </a>
            </div>
          </div>

          <hr>
          <div class="d-flex justify-content-center">
            <vue-awesome-paginate pagination-container-class="pagination pagination-sm"
              paginate-buttons-class="page-link" :total-items="storDispo.dataDispo.length" :items-per-page="perPage"
              :on-click="onPageChange" v-model="currentPage" />
          </div>

        </div>

      </Transition>
      <Transition>
        <form @submit.prevent="submitDispos">
          <div class="d-flex row" v-if="detailSurat">
            <div class="col-12 col-md-12 d-flex">
              <a class="btn btn-info btn-sm ml-auto" @click="handleDaftar">
                <i class="fa-solid fa-arrow-up"></i>
                Lihat Daftar Surat</a>
              <button type="submit" class="btn btn-primary btn-sm ml-2">
                <i class="fa-solid fa-paper-plane"></i>
                Posting</button>
            </div>
            <div class="col-12 col-md-5">
              <div class="mb-5">
                <h3 class='h6 text-gray-800'>Disposisi Kakankemenag Kepada</h3>
                <hr>
                <div class="d-flex justify-content-between">
                  <label class="form-check-label" for="kasubag">Kasubag Tata Usaha</label>
                  <div class="form-group form-check">
                    <input type="radio" name="option" value="kasubag" class="form-check-input" id="kasubag"
                      v-model="storDispo.isDispo.disposKakan">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <label class="form-check-label" for="pendma">Kasi Pendidikan Madrasah</label>
                  <div class="form-group form-check">
                    <input type="radio" name="option" value="pendma" class="form-check-input" id="pendma"
                      v-model="storDispo.isDispo.disposKakan">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <label class="form-check-label" for="pakis">Kasi Pakis</label>
                  <div class="form-group form-check">
                    <input type="radio" name="option" value="pakis" class="form-check-input" id="pakis"
                      v-model="storDispo.isDispo.disposKakan">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <label class="form-check-label" for="phu">Kasi PHU</label>
                  <div class="form-group form-check">
                    <input type="radio" name="option" value="phu" class="form-check-input" id="phu"
                      v-model="storDispo.isDispo.disposKakan">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <label class="form-check-label" for="bimas">Kasi Bimas Islam</label>
                  <div class="form-group form-check">
                    <input type="radio" name="option" value="bimas" class="form-check-input" id="bimas"
                      v-model="storDispo.isDispo.disposKakan">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <label class="form-check-label" for="zakat">Penyelenggara Zakat dan Wakaf</label>
                  <div class="form-group form-check">
                    <input type="radio" name="option" value="zakat" class="form-check-input" id="zakat"
                      v-model="storDispo.isDispo.disposKakan">
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="validatedInputGroupSelect">Petunjuk</label>
                  </div>
                  <select class="custom-select" id="validatedInputGroupSelect" v-model="storDispo.isDispo.petunjuk">
                    <option value="ll" selected="true" disabled>--Pilih--</option>
                    <option value="Setuju">Setuju</option>
                    <option value="Tolak">Tolak</option>
                    <option value="Teliti/Pendapat">Teliti/Pendapat</option>
                    <option value="Untuk Diketahui">Untuk Diketahui</option>
                    <option value="Selesaikan">Selesaikan</option>
                    <option value="Sesuai Catatan">Sesuai Catatan</option>
                    <option value="Untuk Perhatian">Untuk Perhatian</option>
                    <option value="Edarkan">Edarkan</option>
                    <option value="Koordinasikan">Koordinasikan</option>
                    <option value="Jawab">Jawab</option>
                    <option value="Perbaiki">Perbaiki</option>
                    <option value="Bicarakan Dengan Saya">Bicarakan Dengan Saya</option>
                    <option value="Bicarakan Bersama">Bicarakan Bersama</option>
                    <option value="Simpan">Simpan</option>
                    <option value="Disiapkan">Disiapkan</option>
                    <option value="Harap Dihadiri / Diwakili">Harap Dihadiri / Diwakili</option>
                    <option value="Dihadiri Kepala">Dihadiri Kepala</option>
                  </select>
                </div>
                <div class="invalid-feedback">
                  Harus pilih salah satu
                </div>
              </div>
              <div class="mb-5">
                <label for="validationTextarea">Catatan :</label>
                <textarea class="form-control" id="validationTextarea" :disabled="sesuaiCatatan"
                  v-model="storDispo.isDispo.catatan"></textarea>
                <div class="invalid-feedback">
                  Tidak bisa kosong
                </div>
              </div>

            </div>
            <div class="col-12 col-md-7">
              <h3 class='h6 mb-4 text-gray-800'>Surat Masuk</h3>
              <div style=" overflow: hidden; margin: 15px auto; max-width: 880px;">
                <iframe class="content_viewport" scrolling="no"
                  :src="storeUrl.urlServer + 'file/' + storDispo.fileSurmas" frameborder="0" width="100%"
                  height="600px"></iframe>
              </div>
            </div>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
