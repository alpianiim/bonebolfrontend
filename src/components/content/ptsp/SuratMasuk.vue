<script setup>
import { useSuratMasuk } from "@/strore/suratMasuk";
import { reactive } from "vue";
import axios from "axios";
import { useAlert } from "@/strore/alert";
import divAlert from "@/components/Alert.vue"
import { onBeforeRouteLeave } from "vue-router";
const storeSuratMasuk = useSuratMasuk();
const storeAlert = useAlert();

const pakai = reactive({
  state1: false,
  state2: false,
  state3: false,
});



const fileSuratMasuk = (event) => {
  const fileSelected = event.target.files[0];
  storeSuratMasuk.data.fileSuratMasuk = fileSelected;
};
//  const deteksi = computed(() => {

// });


onBeforeRouteLeave(() => {
  storeAlert.$reset()
  storeSuratMasuk.$reset()
})

const batal = () => {
  storeAlert.$reset()
  storeSuratMasuk.$reset()

}

const submitForm = () => {
  storeAlert.$reset()
  const formData = new FormData();
  Object.keys(storeSuratMasuk.data).forEach((key) => {
    formData.append(key, storeSuratMasuk.data[key]);
  });
  axios
    .post("suratmasuk", formData)
    .then((response) => {
      storeAlert.succesAlert.statusAlert = true
      storeAlert.succesAlert.message = response.data.message
      storeSuratMasuk.$reset()

    })
    .catch((error) => {
      storeAlert.errorAlert.statusAlert = true
      storeAlert.errorAlert.message = error.response.data.message
      storeAlert.errorAlert.statusText = error.response.statusText
    });
};

</script>

<template>
  <h1 class="h3 mb-4 text-gray-800">Surat Masuk</h1>
  <hr />
  <divAlert />
  <div class="card mb-3">
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="d-flex justify-content-end mb-3">
          <button @click="batal" type="button" class="btn btn-sm btn-warning mr-2">
            <i class="fa-brands fa-x-twitter"></i>
            Batal
          </button>
          <button type="submit" class="btn btn-sm btn-info">
            <i class="fa-solid fa-paper-plane"></i>
            Posting
          </button>
        </div>
        <hr>
        <div class="row  mb-2">
          <div class="col-12 col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Nomor Surat :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input v-model="storeSuratMasuk.data.nomorSurat" type="text" class="form-control" name="nomorSurat" />
            </div>
          </div>

          <div class="col col-md-6">
            <div class="d-flex">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <div class="input-group-text">Status :</div>
                </div>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1"
                  @change="pakai.state1 = !pakai.state1" />
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </div>

            <div class="d-flex justify-content-center" v-if="pakai.state1">
              <div class="input-group-sm mr-md-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radioStatus" id="gridRadios2" value="asli"
                      v-model="storeSuratMasuk.data.radioStatus" />
                    <span>Asli</span>
                  </div>
                </div>
              </div>
              <div class="input-group-sm">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radioStatus" id="gridRadios3" value="tembusan"
                      v-model="storeSuratMasuk.data.radioStatus" />
                    <span>Tembusan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row  mb-2">
          <div class="col-12 col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Tanggal Surat :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" name="tanggalSurat" v-model="storeSuratMasuk.data.tanggalSurat" />
            </div>
          </div>

          <div class="col col-md-6">
            <div class="d-flex">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <div class="input-group-text">Sifat :</div>
                </div>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch2" :checked="pakai.state2"
                  @change="pakai.state2 = !pakai.state2" />
                <label class="custom-control-label" for="customSwitch2"></label>
              </div>
            </div>

            <div class="d-flex justify-content-center" v-if="pakai.state2">
              <div class="input-group-sm mr-md-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radioSifat" id="gridRadios2" value="sangat_segera"
                      v-model="storeSuratMasuk.data.radioSifat" />
                    <span>Sangat Segera/Kilat</span>
                  </div>
                </div>
              </div>
              <div class="input-group-sm mr-md-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radioSifat" id="gridRadios3" value="segera"
                      v-model="storeSuratMasuk.data.radioSifat" />
                    <span>Segera</span>
                  </div>
                </div>
              </div>
              <div class="input-group-sm">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radioSifat" id="gridRadios3" value="biasa"
                      v-model="storeSuratMasuk.data.radioSifat" />
                    <span>Biasa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="row mb-2 ">
          <div class="col col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Diterima Tanggal :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" name="diterimaTanggal"
                v-model="storeSuratMasuk.data.diterimaTanggal" />
            </div>
          </div>
          <div class="col col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Lampiran</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" name="lampiranj" v-model="storeSuratMasuk.data.lampiran" />
            </div>
          </div>
        </div>



        <div class="row  mb-2">
          <div class="col-12 col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Nomor Agenda :</span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" name="nomorAgenda" v-model="storeSuratMasuk.data.nomorAgenda" />
            </div>
          </div>
          <div class="col col-md-6">
            <div class="d-flex">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <div class="input-group-text">&nbsp;</div>
                </div>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch3" :checked="pakai.state3"
                  @change="pakai.state3 = !pakai.state3" />
                <label class="custom-control-label" for="customSwitch3"></label>
              </div>
            </div>
            <div class="d-flex justify-content-center" v-if="pakai.state3">
              <div class="input-group-sm mr-md-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radio" id="gridRadios2" value="sangat_rahasia"
                      v-model="storeSuratMasuk.data.radio" />
                    <span>Sangat Rahasia</span>
                  </div>
                </div>
              </div>
              <div class="input-group-sm mr-md-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radio" id="gridRadios3" value="rahasia"
                      v-model="storeSuratMasuk.data.radio" />
                    <span>Rahasia</span>
                  </div>
                </div>
              </div>
              <div class="input-group-sm">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="radio" name="radio" id="gridRadios3" value="biasa"
                      v-model="storeSuratMasuk.data.radio" />
                    <span>Biasa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row  mb-2">
          <div class="col-12 col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">
                  Dari :
                </span>
              </div>
            </div>
            <div class="input-group input-group-sm">
              <input type="text" name="dari" class="form-control" v-model="storeSuratMasuk.data.dari" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">
                  Perihal :
                </span>
              </div>
              <div class="input-group input-group-sm">
                <input type="text" name="perihal" class="form-control" v-model="storeSuratMasuk.data.perihal" />
              </div>
            </div>
          </div>
        </div>

        <div class="row  mb-2">
          <div class="col col-md-12">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">Upload Surat Masuk</span>
              </div>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01" name="fileSuratMasuk" @change="fileSuratMasuk" />
                <label class="custom-file-label" for="inputGroupFile01">{{ storeSuratMasuk.data.fileSuratMasuk.name
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="progress mb-2" style="height: 2px;">
          <div class="progress-bar progress-bar-striped" role="progressbar" style="width:" aria-valuenow="10"
            aria-valuemin="0" aria-valuemax="100"></div>
        </div>

      </form>
    </div>
  </div>
</template>
