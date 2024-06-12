<script setup>

import { useAuth, useOtentikasi } from '@/strore/auth';
const auth = useAuth()
const storeOten = useOtentikasi()
</script>

<template>
  <!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-info sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">PELI<sup>ta</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link class="nav-link" href="#" to="/dashboard" active-class="active">
        <i class="fas fa-fw fa-tachometer-alt"></i>

        <span>Dashboard</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" href="#" to="/todo-list" active-class="active">
        <i class="fa-solid fa-list"></i>
        <span>Todo List</span></router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />
    <div v-for="peran in storeOten.peran " :key="peran">

      <li class="nav-item mb-0" v-if="peran.id_group == '2' && peran.id_peran == '7'">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAdmin" aria-expanded="true"
          aria-controls="collapseAdmin">
          <i class="fa-regular fa-clipboard"></i>
          <span>Admin</span>
        </a>
        <div id="collapseAdmin" class="collapse" aria-labelledby="headingAdmin" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Managament User</h6>
            <router-link active-class="active" class="collapse-item" to="/buat-otentikasi">Buat Otentikasi</router-link>
            <router-link active-class="active" class="collapse-item" to="/list-otentikasi">List Otentikasi</router-link>
          </div>
        </div>
      </li>

      <li class="nav-item" v-if="peran.id_group == '1' && peran.id_peran == '1'">
        <a class=" nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
          aria-expanded="true" aria-controls="collapseUtilities">
          <i class="fa-regular fa-clipboard"></i>
          <span>Surat Masuk</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Kepala</h6>
            <router-link class="collapse-item" to="/disposisi-suratmasuk" active-class="active">Disposisi</router-link>
            <router-link class="collapse-item" to="/monitoring-disposisi" active-class="active">Disposisi
              Lanjutan</router-link>
            <router-link class="collapse-item" to="/monitoring-tindaklanjut" active-class="active">Tindak
              Lanjut</router-link>
          </div>
        </div>
      </li>
      <li class="nav-item" v-if="peran.id_group == '2' && peran.id_peran == '3'">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
          aria-controls="collapseTwo">
          <i class="fa-regular fa-clipboard"></i>
          <span>Surat Masuk</span>
        </a>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">PTSP</h6>
            <router-link active-class="active" class="collapse-item" to="/ptsp-suratmasuk">Input Surat
              Masuk</router-link>
            <router-link active-class="active" class="collapse-item" to="/ptsp-monitoring">Monitoring
              Disposisi</router-link>
          </div>
        </div>
      </li>
    </div>





    <!-- PTSP -->
    <!-- <div v-if="auth.user_group == 3">

      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
          aria-expanded="true" aria-controls="collapseUtilities">
          <i class="fa-regular fa-clipboard"></i>
          <span>Surat Masuk</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Kepala</h6>
            <router-link class="collapse-item" to="/disposisi-suratmasuk" active-class="active">Disposisi</router-link>
            <router-link class="collapse-item" to="/monitoring-disposisi" active-class="active">Disposisi
              Lanjutan</router-link>
            <router-link class="collapse-item" to="/monitoring-tindaklanjut" active-class="active">Tindak
              Lanjut</router-link>
          </div>
        </div>
      </li>
    </div> -->

    <div v-if="auth.user_group == 4">

      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#unsurpimpinan" aria-expanded="true"
          aria-controls="unsurpimpinan">
          <i class="fa-regular fa-clipboard"></i>
          <span>Surat Masuk</span>
        </a>
        <div id="unsurpimpinan" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Kasubag/Kasi</h6>
            <router-link class="collapse-item" to="/disposisipimpinan-suratmasuk" active-class="active">Surat
              Masuk</router-link>
            <router-link class="collapse-item" to="/monitoringpimpinan-suratmasuk"
              active-class="active">Monitoring</router-link>
          </div>
        </div>
      </li>
    </div>

    <div v-if="auth.user_group == 5">
      <!-- Petugas -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#petugas" aria-expanded="true"
          aria-controls="petugas">
          <i class="fa-regular fa-clipboard"></i>
          <span>Surat Masuk</span>
        </a>
        <div id="petugas" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Disposisi Surat</h6>
            <router-link class="collapse-item" to="/disposisipimpinan-suratmasuk" active-class="active">Surat
              Masuk</router-link>
            <router-link class="collapse-item" to="/monitoringpimpinan-suratmasuk"
              active-class="active">Monitoring</router-link>
          </div>
        </div>
      </li>
    </div>


    <div v-if="storeOten.dataOten.id_group == '2' || storeOten.dataOten.id_group == '3'">
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser" aria-expanded="true"
          aria-controls="collapseUser">
          <i class="fa-regular fa-clipboard"></i>
          <span>Tindak Lanjut</span>
        </a>
        <div id="collapseUser" class="collapse" aria-labelledby="collapseUser" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Pelaksana Tugas</h6>
            <router-link active-class="active" class="collapse-item" to="/tindaklanjut-suratmasuk">Surat
              Masuk</router-link>
            <!-- <router-link active-class="active" class="collapse-item" to="/ptsp-monitoring">Monitoring -->
            <!-- Disposisi</router-link> -->
          </div>
        </div>
      </li>
    </div>



    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>

<style scope></style>
