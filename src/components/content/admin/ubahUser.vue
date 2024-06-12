<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useAlert } from "@/strore/alert";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import alertHandling from '@/components/Alert.vue'
const user = ref({});
const userId = Number(useRoute().params.id);
const storeAlert = useAlert();
const sendPass = ref()
const idUse = sessionStorage.getItem("id");
const peran = ref({})
const userPeran = ref({})

// // const increasePermision = () => {
//   tambahPermis.value++
// }

const getOtentikasi = async () => {
  try {
    const { data } = await axios.get(`otentikasi/${userId}`);
    user.value = data.data;
    userPeran.value = data.data_peran
  } catch (error) {
    storeAlert.errorAlert.message = error.response.data.message;
    storeAlert.errorAlert.statusAlert = true;
    storeAlert.errorAlert.statusText = error.response.statusText;
  }
};
getOtentikasi();

const getPeran = async () => {
  try {
    const res = await axios.get("user_peran");
    peran.value = res.data.data
  } catch (error) {
    console.log(error);
  }
};

getPeran();




const batal = () => {
  storeAlert.$reset();
};

const handleSubmit = async () => {
  storeAlert.$reset();
  try {
    const payload = {
      username: user.value.username,
      password: sendPass.value,

    };
    const { data } = await axios.put(`otentikasi/${userId}`, payload);
    storeAlert.succesAlert.message = data.message;
    storeAlert.succesAlert.statusAlert = true;
    getOtentikasi();
  } catch (error) {
    storeAlert.errorAlert.message = error.response.data.message;
    storeAlert.errorAlert.statusAlert = true;
    storeAlert.errorAlert.statusText = error.response.statusText;
  }
};

const handlePeran = async () => {
  storeAlert.$reset();
  try {
    const payload = {
      id_peran: user.value.id_peran,
      id_oten: userId
    };
    const { data } = await axios.post("tambahperan", payload);
    storeAlert.succesAlert.message = data.message;
    storeAlert.succesAlert.statusAlert = true;
    getOtentikasi();
  } catch (error) {
    storeAlert.errorAlert.message = error.response.data.message;
    storeAlert.errorAlert.statusAlert = true;
    storeAlert.errorAlert.statusText = error.response.statusText;
  }
}

const handleDelete = async (id_userperan) => {
  storeAlert.$reset();
  const payload = {
    id : id_userperan
  }
  try {
    const confirmation = window.confirm(
      'Apakah Anda yakin ingin menghapus peran ini?'
    );
    if (confirmation) {
      const { data } = await axios.post(`hapusperan`, payload);
      storeAlert.succesAlert.message = data.message;
      storeAlert.succesAlert.statusAlert = true;
      getOtentikasi();
    }
  } catch (error) {
    storeAlert.errorAlert.message = error.response.data.message;
    storeAlert.errorAlert.statusAlert = true;
    storeAlert.errorAlert.statusText = error.response.statusText;
  }
}


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
              <input v-model="user.username" type="text" class="form-control" name="Username" autocomplete="off"
                required />
            </div>

            <div class="mt-4 input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Password : </span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input type="password" class="form-control" name="Password" v-model="sendPass" />
            </div>
            <button @click="batal" type="button" class="btn btn-sm btn-warning mr-2 mt-3">
              <i class="fa-brands fa-x-twitter"></i>
              Batal
            </button>
            <button type="submit" class="btn btn-sm btn-info mt-3">
              <i class="fa-solid fa-paper-plane"></i>
              Simpan
            </button>
            <hr>
            <form @submit.prevent="handlePeran">
              <div class="mt-4 input-group input-group-sm" v-if="idUse != userId">
                <div class=" input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Peran User :</span>
                </div>
              </div>
              <div class="input-group mb-1">
                <select class="custom-select" id="inputGroupSelect01" v-model="user.id_peran">
                  <option selected value="" readonly>--Pilih--</option>
                  <option v-for="id in peran" :key="id.id_peran" :value="id.id_peran">{{ id.peran }}</option>
                </select>
              </div>
              <button type="reset" class="btn btn-sm btn-warning mr-2 mt-3">
                <i class="fa-brands fa-x-twitter"></i>
                Batal
              </button>
              <button type="submit" class="btn btn-sm btn-info mt-3">
                <i class="fa-solid fa-plus"></i> Tambah Group Peran</button>
            </form>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <alertHandling />
            <div class="alert alert-info">
              Password minimal harus memiliki panjangan 10 karakter, sebaiknya samakan dengan Username dan
              tidak boleh spasi.
            </div>
            <div class="alert alert-light shadow-sm">
              <div class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr class="text-center">
                      <th>User Group</th>
                      <th>User Peran</th>
                      <th>Hapus Perab</th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr class="text-center" v-for="id in userPeran" :key="id.id_peran">
                      <td class="text-center">{{ id.group }}</td>
                      <td class="text-center">{{ id.peran }}</td>
                      <td class="text-center"><a class="text-danger" @click="handleDelete(id.id_userperan)"
                          style="cursor:pointer !important;">
                          <i class="fa-solid fa-trash"></i></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>

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
