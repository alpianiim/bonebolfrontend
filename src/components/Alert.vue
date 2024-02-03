<script setup>
import {useAlert} from "@/strore/alert"
import { computed } from "vue"
const storeAlert = useAlert()
</script>

<template>
  <div v-if="storeAlert.succesAlert.statusAlert" class="alert alert-success alert-dismissible fade show text-center" role="alert">
    <strong>Sukses..!</strong>
    <p>
       {{ storeAlert.succesAlert.message }}
      </p>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div v-if="storeAlert.errorAlert.statusAlert" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    <strong>GAGAL...!</strong>
    <p>
      <strong >{{ storeAlert.errorAlert.statusText }}</strong><br />
      <span >{{ storeAlert.errorAlert.message }}</span>
    </p>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<style scoped></style>