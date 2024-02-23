<script setup>
</script>

<template>
  <div class="container-fluid">
    <!-- Page Heading -->
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in">
      <div  :key="route">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>