<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from "axios";
import { useAlert } from "@/strore/alert";
import alertHandling from '@/components/Alert.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useAuth } from "@/strore/auth";
import { useUrl } from "@/strore/urlServer"


const storeAlert = useAlert()
const auth = useAuth();
const storeUrl = useUrl()

onBeforeRouteLeave(() => {
  storeAlert.$reset()
})

const batal = () => {
  storeAlert.$reset();
  state.editUsername = false
  state.editUsernomor = false
  state.user.img = ""
  state.user.nameImage = ""
  state.user.namaLengkap = auth.user.nama_lengkap
}


const state = reactive({
  user: {
    id: "",
    namaLengkap: "",
    nomorHp: "",
    jenisKelamin: "",
    img: "",
    nameImage: "",
    imgFile: ""
  },
  imgRide : true,
  editUsername: false,
  editUsernomor: false
})

onMounted(() => {
  auth.getUser()
  // imgHand()
})



const submitErrorTe = ref(false)
const submitErrorWa = ref(false)


const handleFileChange = (event) => {
  storeAlert.$reset()
  state.user.img = ""
  state.imgRide= false
  const file = event.target.files[0];
  const types = ['image/png', 'image/jpg', 'image/jpeg'];
  state.user.imgFile = file
  state.user.nameImage = file.name
  if (!types.includes(file.type)) {
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = "File harus bertipe png, jpg, atau jpeg"
    return
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    state.user.img = e.target.result
  };
  reader.readAsDataURL(file);
}


const handleSubmit = async () => {
  storeAlert.$reset()
  if (state.user.nomorHp === "") {
    state.user.nomorHp = auth.user.nomor_hp
  }
  if (state.user.namaLengkap === "") {
    state.user.namaLengkap = auth.user.nama_lengkap
  }
  if (state.user.jenisKelamin === "") {
    state.user.jenisKelamin = auth.user.jenis_kelamin
  }
  const formData = new FormData();
  Object.keys(state.user).forEach((key) => {
    formData.append(key, state.user[key]);
    // if (key !== "img") {
    // }
  });

  try {
    const res = await axios.put(`user/${auth.user.id}`, state.user);
    storeAlert.succesAlert.statusAlert = true
    storeAlert.succesAlert.message = res.data.message
    auth.getUser()
  } catch (error) {
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = error.response.data.message
    storeAlert.errorAlert.statusText = error.response.statusText
  }
}


const handleUploadFile = async () => {
  storeAlert.$reset()
  const formData = new FormData();
  formData.append("img", state.user.imgFile);
  try {
    const res = await axios.post('user/img/' + auth.user.id, formData);
    storeAlert.succesAlert.statusAlert = true
    storeAlert.succesAlert.message = res.data.message
    state.user.nameImage = res.data.nameImage
    state.imgRide = true
    state.user.img = ""
    auth.getUser()
  } catch (error) {
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = error.response.data.message
    storeAlert.errorAlert.statusText = error.response.statusText
  }
}



const nomorHpValid = (event) => {
  const value = event.target.value
  const nomorHpRegex = /^08\d{8,12}$/
  return nomorHpRegex.test(value)
}
const nomorHpErrorMessage = (event) => {
  const value = event.target.value
  const message = `Nomor Hp tidak valid, format nomor Hp harus 08XXXXXXXXXX, `
  const minLength = 10
  const maxLength = 13
  const length = value.length

  if (length < minLength) {
    return `${message}dan minimal ${minLength} angka`
  }
  if (length > maxLength) {
    return `${message}dan maksimal ${maxLength} angka`
  }
  return ''
}
const handleKeyUp = (event) => {
  if (auth.user.nomor_hp === "") {
    storeAlert.$reset()
    return
  }
  const isValid = nomorHpValid(event)
  const errorMessage = nomorHpErrorMessage(event)
  if (!isValid) {
    submitErrorWa.value = false
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = errorMessage
  }
  if (isValid) {
    submitErrorWa.value = true
    storeAlert.errorAlert.statusAlert = false
  }
}


const fullNameValid = (event) => {
  const value = event.target.value
  const fullNameRegex = /^[a-zA-Z. ]{6,}$/
  return fullNameRegex.test(value)
}

const fullNameErrorMessage = (event) => {
  const value = event.target.value
  const message = 'Nama lengkap tidak valid, hanya huruf, spasi, titik, dan tanda petik  yang diizinkan.'
  const minLength = 6
  const length = value.length
  if (length < minLength) {
    return `${message} minimal ${minLength} huruf`
  }
  return ''
}

const handleKeyUpText = (event) => {
  if (auth.user.nama_lengkap === "") {
    storeAlert.$reset()
    return
  }
  const isValid = fullNameValid(event)
  const errorMessage = fullNameErrorMessage(event)
  if (!isValid) {
    submitErrorTe.value = false
    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = errorMessage
  }
  if (isValid) {
    submitErrorTe.value = true
    storeAlert.errorAlert.statusAlert = false
  }

}



</script>

<template>
  <h1 class='h3 mb-4 text-gray-800'>Profil</h1>
  <hr />
  <div class="card">
    <div class="card-body">
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
                <span class="input-group-text" id="inputGroup-sizing-sm">Nama Lengkap :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input v-model="state.user.namaLengkap" type="text" class="form-control" name="Username"
                autocomplete="off" required v-if="state.editUsername" @input="fullNameValid" @keyup="handleKeyUpText" />
              <span class="mt-2" v-if="!state.editUsername"
                @click="state.editUsername = true, state.user.namaLengkap = auth.user.nama_lengkap">{{
                auth.user.nama_lengkap }}</span>
            </div>

            <div class="mt-4 input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Whatsapp :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input v-model=state.user.nomorHp type="text" class="form-control" name="Password" required
                v-if="state.editUsernomor" @input="validateNomorHp" @keyup="handleKeyUp" />
              <span class="mt-2" v-if="!state.editUsernomor"
                @click="state.editUsernomor = true, state.user.nomorHp = auth.user.nomor_hp">{{ auth.user.nomor_hp
                }}</span>
            </div>
            <div class="mt-4 input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Jenis Kelamin :</span>
              </div>
            </div>
            <div class='border border-secondary rounded p-2 custom-boxRol'>
              <div class="d-flex">
                <div class="custom-control custom-checkbox mr-4">
                  <input type="radio" class="boxRol" v-model="auth.user.jenis_kelamin" id="customCheck1"
                    name="customRadio" value="1" @click="state.user.jenisKelamin = '1'">
                  <label
                    class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2 m-0 shadow-lg"
                    for="customCheck1"
                    :class="{ 'badge-primary': auth.user.jenis_kelamin === '1', 'badge-light': auth.user.jenis_kelamin !== '1' }">Laki
                    - Laki</label>
                </div>
                <div class="custom-contro2 custom-checkbox mr-4">
                  <input type="radio" class="boxRol" v-model="auth.user.jenis_kelamin" id="customCheck2"
                    name="customRadio" value="2" @click="state.user.jenisKelamin = '2'">
                  <label class=" boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2 m-0"
                    for="customCheck2"
                    :class="{ 'badge-primary  shadow-lg': auth.user.jenis_kelamin === '2', 'badge-light': auth.user.jenis_kelamin !== '2' }">Perempuan</label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <alertHandling />
            <div class="alert alert-info">
              Untuk mengubah Nama Lengkap dan Nomor Whatsapp harap untuk mengklik salah satu kolom
              tersebut
            </div>
            <div class="alert alert-info" v-if="state.user.img || state.imgRide">
              <span class="h6">Gambar profil </span><br />

              <div style="display: flex; justify-content: center; align-items: center;">
                <img v-if="state.user.img" height="60%" class="w-50 rounded shadow" :src='state.user.img'
                  alt="Uploaded Image">
                <img v-if="state.imgRide" height="60%" class="w-50 rounded shadow"
                  :src='storeUrl.urlServer + "userimage/" + auth.user.img' alt="Uploaded Image">
              </div>
            </div>
            <div class="alert alert-secondary">



              <form @submit.prevent="handleUploadFile">

                <div class="input-group input-group-sm mt-2">
                  <div class="custom-file">
                    <input @change="handleFileChange" type="file" class="custom-file-input"
                      id="validatedInputGroupCustomFile" required>
                    <label class="custom-file-label" for="validatedInputGroupCustomFile"
                      v-bind:data-file-name="state.user.nameImage">{{
                      state.user.nameImage || 'Pilih File' }}</label>
                  </div>
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" @click="handleUploadFile">
                      <i class=" fa-solid fa-upload"></i>
                      Upload</button>
                  </div>
                </div>
              </form>
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