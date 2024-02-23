<script setup>
import axios from "axios"
import { useDisposisi } from "@/strore/disposisi";
import { onMounted, ref, reactive } from "vue"

const storeDis = useDisposisi()


async function getDispos() {
    try {
        const respons = await axios.get('/disposisi')
        storeDis.dataDispo = respons.data.data
    }
    catch (error) {

    }
}


onMounted(() => {
    getDispos()
})


</script>

<template>
    <h1 class='h3 mb-4 text-gray-800'> Monitoring Surat Masuk </h1>
    <hr />

    
</template>
<style scoped></style>