<script setup>
import {nextTick, onBeforeUnmount, onMounted} from 'vue'

function initDataTable() {
  // Inisialisasi DataTable
  $('#dataTable').DataTable();
}

function destroyDataTable() {
  // Membersihkan DataTable sebelum komponen dihancurkan
  $('#dataTable').DataTable().destroy();
}

onMounted(() => {
  // Dipanggil setelah komponen dipasang
  initDataTable();
});

onBeforeUnmount(() => {
  // Dipanggil sebelum komponen dihancurkan
  destroyDataTable();
});

</script>

<template>
  <h1 class="h3 mb-4 text-gray-800">List Surat Masuk</h1>
  <hr>
<div >

  <table class="table" id="dataTable">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">No. Arsip</th>
        <th scope="col">Dari</th>
        <th scope="col">Perihal</th>
        <th scope="col">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
      
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</div>


</template>