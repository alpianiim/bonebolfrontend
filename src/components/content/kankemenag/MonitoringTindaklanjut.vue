<script setup>
import axios from "axios"
import { useDisposisi } from "@/strore/disposisi";
import { onMounted, ref, reactive } from "vue"
import { useAlert } from "@/strore/alert";
import { onBeforeRouteLeave } from "vue-router";
import $ from 'jquery'
import divAlert from '@/components/Alert.vue'

const storeDis = useDisposisi()
const stortAlert = useAlert()



</script>

<template>
    <h1 class='h3 mb-4 text-gray-800'>Monitoring Tindak Lanjut  </h1>
    <hr />
    <divAlert />


    
</template>
<style scoped></style>