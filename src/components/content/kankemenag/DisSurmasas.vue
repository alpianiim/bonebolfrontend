<script setup>
import axios from "axios"
import { useDisposisi } from "@/strore/disposisi"
import { onMounted } from "vue";

const storeDispos = useDisposisi()

async function getDispos() {
  try {
    const response = await axios.get('disposisi')
    storeDispos.dataDispo = response.data.data
  } catch (error) {
  }
}

onMounted(() => {
  getDispos()
})


</script>
<template>
  <h1 class='h3 mb-4 text-gray-800'>Disposisi</h1>
  <hr />
  {{ storeDispos.dataDispo.length }}
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
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
