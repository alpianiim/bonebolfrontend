<script setup>
import Sidebar from "./Sidebar.vue"
import ContentWrapper from "./ContentWrapper.vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/strore/auth";
import { watch } from 'vue'

const router = useRouter()
const auth = useAuth();

auth.getUser()


watch(
  () => sessionStorage.getItem("otentikasi"),
  (newValue, oldValue) => {
    if (newValue === 'false' && oldValue === undefined) {
      console.log('melakukan redirect')
      router.push("/login")
    }
  },
  { immediate: true }
)


</script>
<template>
  <div id="wrapper">
    <Sidebar />
    <ContentWrapper />
  </div>
</template>