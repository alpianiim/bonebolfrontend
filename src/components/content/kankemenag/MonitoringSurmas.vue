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

const getTrueDispos = async ()=>{
    try{
        const respon = await axios.get('disposisi/new')
        console.log(respon)
    }
    catch (error){

    }
}

onMounted (()=>{
    getTrueDispos()
})


</script>

<template>
    <h1 class='h3 mb-4 text-gray-800'> Monitoring</h1>
    <hr />
    <divAlert />


    
</template>
<style scoped></style>