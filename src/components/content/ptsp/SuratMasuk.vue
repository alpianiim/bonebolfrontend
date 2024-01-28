<script setup>
import {ref, reactive} from 'vue'
 const apiData = ref();
    const pakai = reactive({
      state1: false,
      state2: false,
      state3: false,
    });

       function submitForm(e) {
      let nomorSurat = e.target.elements.nomorSurat.value;
      let radioStatus =
        pakai.state1 == true ? e.target.elements.radioStatus.value : "-";
      let tanggalSurat = e.target.elements.tanggalSurat.value;
      let radioSifat =
        pakai.state2 == true ? e.target.elements.radioSifat.value : "-";
      let diterimaTanggal = e.target.elements.diterimaTanggal.value;
      let nomorAgenda = e.target.elements.nomorAgenda.value;
      let radio = pakai.state3 == true ? e.target.elements.radio.value : "-";
      let perihal = e.target.elements.perihal.value;
      let fileSuratMasuk = e.target.elements.fileSuratMasuk.value;

      const formData = {
        nomorSurat,
        radioStatus,
        tanggalSurat,
        radioSifat,
        diterimaTanggal,
        nomorAgenda,
        radio,
        perihal,
        fileSuratMasuk,
      };
      // axios
      //   .post("ptsp-api", formData)
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Posting Error:", error);
      //   });
      console.log(formData)
    }

    //  const deteksi = computed(() => {

    // });
</script>

<template>
 <h1 class="h3 mb-4 text-gray-800">Surat Masuk</h1>
 <hr>
<form @submit.prevent="submitForm">
 <div class="row border mb-2">
  <div class="col-12 col-md-6">
   <div class="input-group input-group-sm">
    <div class="input-group-prepend">
     <span class="input-group-text" id="inputGroup-sizing-sm">Nomor Surat :</span>
    </div>
   </div>
   <div class="input-group input-group-sm">
    <input type="text" class="form-control" name="nomorSurat">
   </div>
  </div>

  <div class="col col-md-6">
   <div class="d-flex">
    <div class="input-group input-group-sm">
     <div class="input-group-prepend">
      <div class="input-group-text">
       Status :
      </div>
     </div>
    </div>
    <div class="custom-control custom-switch">
     <input type="checkbox" class="custom-control-input" id="customSwitch1" @change="pakai.state1=!pakai.state1">
     <label class=" custom-control-label" for="customSwitch1"></label>
    </div>
   </div>

   <div class="d-flex justify-content-center" v-if="pakai.state1">
    <div class="input-group-sm mr-md-2">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radioStatus" id="gridRadios2" value="asli">
       <span>Asli</span>
      </div>
     </div>
    </div>
    <div class=" input-group-sm ">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radioStatus" id="gridRadios3" value="tembusan">
       <span>Tembusan</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>

 <div class="row border mb-2">
  <div class="col col-md-6">
   <div class="input-group input-group-sm">
    <div class="input-group-prepend">
     <span class="input-group-text" id="inputGroup-sizing-sm">Tanggal Surat :</span>
    </div>
   </div>
   <div class="input-group input-group-sm">
    <input type="text" class="form-control" name="tanggalSurat">
   </div>
  </div>

  <div class="col col-md-6">
   <div class="d-flex">
    <div class="input-group input-group-sm">
     <div class="input-group-prepend">
      <div class="input-group-text">
       Sifat :
      </div>
     </div>
    </div>
    <div class="custom-control custom-switch">
     <input type="checkbox" class="custom-control-input" id="customSwitch2" :checked="pakai.state" @change="pakai.state2=!pakai.state2">
     <label class="custom-control-label" for="customSwitch2"></label>
    </div>
   </div>

   <div class="d-flex justify-content-center" v-if="pakai.state2">
    <div class="input-group-sm mr-md-2">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radioSifat" id="gridRadios2" value="sangat_segera">
       <span>Sangat Segera/Kilat</span>
      </div>
     </div>
    </div>
    <div class=" input-group-sm mr-md-2">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radioSifat" id="gridRadios3" value="segera">
       <span>Segera</span>
      </div>
     </div>
    </div>
    <div class=" input-group-sm">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radioSifat" id="gridRadios3" value="biasa">
       <span>Biasa</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>

 <div class="row mb-2 border">
  <div class="col col-md-6 ">
   <div class="input-group input-group-sm">
    <div class="input-group-prepend">
     <span class="input-group-text" id="inputGroup-sizing-sm">Diterima Tanggal :</span>
    </div>
   </div>
   <div class="input-group input-group-sm">
    <input type="text" class="form-control" name="diterimaTanggal">
   </div>
  </div>
 </div>

 <div class="row border mb-2 ">
  <div class="col col-md-6">
   <div class="input-group input-group-sm">
    <div class="input-group-prepend">
     <span class="input-group-text" id="inputGroup-sizing-sm">Nomor Agenda :</span>
    </div>
   </div>
   <div class="input-group input-group-sm">
    <input type="text" class="form-control" name="nomorAgenda">
   </div>
  </div>
  <div class="col col-md-6">
   <div class="d-flex">
    <div class="input-group input-group-sm">
     <div class="input-group-prepend ">
      <div class="input-group-text">
       &nbsp;
      </div>
     </div>
    </div>
    <div class="custom-control custom-switch">
     <input type="checkbox" class="custom-control-input" id="customSwitch3" :checked="pakai.state3" @change="pakai.state3=!pakai.state3">
     <label class="custom-control-label" for="customSwitch3"></label>
    </div>
   </div>
   <div class="d-flex justify-content-center" v-if="pakai.state3">
    <div class="input-group-sm mr-md-2">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radio" id="gridRadios2" value="sangat_rahasia">
       <span>Sangat Rahasia</span>
      </div>
     </div>
    </div>
    <div class=" input-group-sm mr-md-2">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radio" id="gridRadios3" value="rahasia">
       <span>Rahasia</span>
      </div>
     </div>
    </div>
    <div class=" input-group-sm">
     <div class="input-group-prepend">
      <div class="input-group-text">
       <input type="radio" name="radio" id="gridRadios3" value="biasa">
       <span>Biasa</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>

 <div class="row border mb-2">
  <div class="col col-md-6">
   <div class="input-group input-group-sm">
    <div class="input-group-prepend">
     <span class="input-group-text" id="inputGroup-sizing-sm">Dari Perihal</span>
    </div>
    <textarea type="text" name="perihal" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></textarea>
   </div>
  </div>
  <div class="col col-md-6">
   <div class="input-group input-group-sm mb-2">
    <div class="input-group-prepend">
     <span class="input-group-text" id="inputGroupFileAddon01">Upload Surat Masuk</span>
    </div>
    <div class="custom-file">
     <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" name="fileSuratMasuk">
     <label class="custom-file-label" for="inputGroupFile01">Pilih File</label>
    </div>
   </div>
  </div>

 </div>
 <button type="submit" class="btn btn-primary">Kirim</button>
</form>
 </template>
