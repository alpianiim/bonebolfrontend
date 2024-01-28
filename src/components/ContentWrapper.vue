<script setup>
import Topbar from "./Topbar.vue"
import Container from "./ContainerFluid.vue"

</script>
<template>
       <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
         <Topbar />
         <Container />
        </div>
         <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2020</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
       </div>
 </template>
