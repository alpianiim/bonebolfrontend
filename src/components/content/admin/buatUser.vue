<script setup>
import { reactive } from 'vue';
import axios from "axios";
import { useAlert } from "@/strore/alert";
import alertHandling from '@/components/Alert.vue'
import { onBeforeRouteLeave } from 'vue-router'
const stortAlert = useAlert()

const state = reactive({
  user: {
    username: "",
    password: "",
    roleGroup: "",
  },
  file: {
    name: ""
  },
  dataExcel: null,
});

const handleSubmit = async () => {
  stortAlert.$reset()
  const formData = new FormData();
  Object.keys(state.user).forEach((key) => {
    formData.append(key, state.user[key]);
  });

  try {
    const res = await axios.post("otentikasi", formData);
    stortAlert.succesAlert.statusAlert = true
    stortAlert.succesAlert.message = res.data.message
    state.user.username = "";
    state.user.password = ""
    state.user.confirm_password = ""
  } catch (error) {
    stortAlert.errorAlert.message = error.response.data.message
    stortAlert.errorAlert.statusAlert = true
    stortAlert.errorAlert.statusText = error.response.statusText
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0];
  state.file.name = file.name
  state.user.dataExcel = file
}

const handleUploadFile = async () => {
  stortAlert.$reset()
  const formData = new FormData();
  formData.append("excel", state.user.dataExcel);

  try {
    const res = await axios.post("otentikasi/excel-upload", formData);
    stortAlert.succesAlert.statusAlert = true
    stortAlert.succesAlert.message = res.data.message
  } catch (error) {
    stortAlert.errorAlert.message = error.response.data.message
    stortAlert.errorAlert.statusAlert = true
    stortAlert.errorAlert.statusText = error.response.statusText
  }
}






const downloadExcelFile = async () => {
  try {
    const response = await axios.get(
      "otentikasi/excel-download",
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dataUser.xlsx");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    stortAlert.errorAlert.message = error.response.data.message
    stortAlert.errorAlert.statusAlert = true
    stortAlert.errorAlert.statusText = error.response.statusText
  }
};


onBeforeRouteLeave(() => {
  stortAlert.$reset()

})


const batal = (() => {
  state.user.username = "";
  state.user.password = ""
  state.user.confirm_password = ""
})

</script>

<template>
  <h1 class='h3 mb-4 text-gray-800'>Buat Otentikasi</h1>
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
            <div class="input-group input-group-sm" >
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Username :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input v-model="state.user.username" type="text" class="form-control" name="Username" autocomplete="off"
                required />
            </div>

            <div class="mt-4 input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Password :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input v-model=state.user.password type="password" class="form-control" name="Password" required />
            </div>
            <div class="mt-4 input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Role Grup :</span>
              </div>
            </div>
            <div class='border border-secondary rounded p-2 custom-boxRol'>
              <div class="d-flex">
                <div class="custom-control custom-checkbox mr-4">
                  <input type="radio" class="boxRol" v-model="state.user.roleGroup" id="customCheck1" name="customRadio"
                    value="1">
                  <label
                    class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2 m-0 shadow-lg"
                    for="customCheck1"
                    :class="{ 'badge-primary': state.user.roleGroup === '1', 'badge-light': state.user.roleGroup !== '1' }">Admin</label>
                </div>
                <div class="custom-contro2 custom-checkbox mr-4">
                  <input type="radio" class="boxRol" v-model="state.user.roleGroup" id="customCheck2" name="customRadio"
                    value="2">
                  <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2  m-0"
                    for="customCheck2"
                    :class="{ 'badge-primary  shadow-lg': state.user.roleGroup === '2', 'badge-light': state.user.roleGroup !== '2' }">PTSP</label>
                </div>
                <div class="custom-contro2 custom-checkbox mr-4">
                  <input type="radio" class="boxRol" v-model="state.user.roleGroup" id="customCheck3" name="customRadio"
                    value="3">
                  <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2  m-0"
                    for="customCheck3"
                    :class="{ 'badge-primary  shadow-lg': state.user.roleGroup === '3', 'badge-light': state.user.roleGroup !== '3' }">Kepala</label>
                </div>
                <div class="custom-contro2 custom-checkbox mr-4">
                  <input type="radio" class="boxRol" name="customRadio" v-model="state.user.roleGroup" id="customCheck4"
                    value="4">
                  <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2  m-0"
                    for="customCheck4"
                    :class="{ 'badge-primary  shadow-lg': state.user.roleGroup === '4', 'badge-light': state.user.roleGroup !== '4' }">Kasubag/Kasi</label>
                </div>
                <div class="custom-contro2 custom-checkbox mr-4 ">
                  <input type="radio" class="boxRol" name="customRadio" v-model="state.user.roleGroup" id="customCheck5"
                    value="5">
                  <label class="boxRol-label-only boxRol-label border border-secondary badge badge-pill p-2  m-0"
                    for="customCheck5"
                    :class="{ 'badge-primary  shadow-lg': state.user.roleGroup === '5', 'badge-light': state.user.roleGroup !== '5' }">Arsiparis</label>
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
            <div class="alert alert-secondary">

              Anda bisa unggah user sekaligus, menggunakan format yang di sediakan. Silahkan
              <a style="color: blue; text-decoration: underline; cursor: pointer" @click="downloadExcelFile">DOWNLOAD
                Disini.</a>

              <form action="">

                <div class="input-group input-group-sm mt-2">
                  <div class="custom-file">
                    <input @change="handleFileChange" type="file" class="custom-file-input"
                      id="validatedInputGroupCustomFile" required>
                    <label class="custom-file-label" for="validatedInputGroupCustomFile"
                      v-bind:data-file-name="state.file.name">{{
        state.file.name || 'Pilih File' }}</label>
                  </div>
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" @click="handleUploadFile">
                      <i class=" fa-solid fa-upload"></i>
                      Upload</button>
                  </div>
                </div>
              </form>

              <!-- <div class="input-group input-group-sm mt-2">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Unggah User</span>
                  </div>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01" name="fileSuratMasuk" @change="handleFileChange" />
                    <label class="custom-file-label" for="inputGroupFile01" v-bind:data-file-name="state.file.name">{{
        state.file.name || 'Pilih File' }}</label>
                  </div>
                </div>
              </div>
              <div class="mt-2 d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-primary mt-2" @click="handleUploadFile">
                  <i class="fa-solid fa-paper-plane"></i>
                  Simpan Data
                </button>
              </div> -->
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
