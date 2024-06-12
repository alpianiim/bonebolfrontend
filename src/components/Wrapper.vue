<script setup>
import Sidebar from "./Sidebar.vue"
import ContentWrapper from "./ContentWrapper.vue"
import { useRouter } from "vue-router"
import { useAuth, useOtentikasi } from "@/strore/auth";
import { watch, onMounted } from 'vue'

const router = useRouter()
const auth = useAuth();
const storeOten = useOtentikasi()

// jalankan fungsi getUser pertamakali ketika component wrapper di-mounted
onMounted(() => {
  auth.getUser()
  storeOten.getOtentikasi()
})


watch(() => auth.user.nomor_hp, (newValue) => {
  if (newValue == "") {
    router.push("update-user")
  }
})

</script>
<template>
  <div id="wrapper">
    <Sidebar />
    <ContentWrapper />
  </div>
</template>