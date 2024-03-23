<script setup>
import Sidebar from "./Sidebar.vue"
import ContentWrapper from "./ContentWrapper.vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/strore/auth";
import { watch, onMounted } from 'vue'

const router = useRouter()
const auth = useAuth();

// jalankan fungsi getUser pertamakali ketika component wrapper di-mounted
onMounted(() => {
  auth.getUser()
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