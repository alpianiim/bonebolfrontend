<script setup>
import { useHak } from '@/strore/hakakses';
import { useRouter } from "vue-router"
import { useAuth } from "@/strore/auth";
import { watch } from 'vue'

const router = useRouter()
const auth = useAuth();


</script>

<template>
  <h1 class='h3 mb-4 text-gray-800'>Dashboard</h1>

  <hr />
  <div class='card'>
    <div class='card-body'>


    </div>
  </div>
</template>

<style scoped></style>
