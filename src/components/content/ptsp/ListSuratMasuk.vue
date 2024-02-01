<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { useCounterStore } from "@/strore/counter";

const storeCounter = useCounterStore()

const initDataTable = () => {
  // Inisialisasi DataTable
  $("#dataTable").DataTable();
};

const destroyDataTable = () => {
  // Membersihkan DataTable sebelum komponen dihancurkan
  $("#dataTable").DataTable().destroy();
};

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
  <hr />
  <div>
<table class="table" id="dataTable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">No. Arsip</th>
          <th scope="col">Dari</th>
          <th scope="col">Perihal</th>
          <th scope="col">Tanggal Surat</th>
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
          <td>
            <a href="">
              <i class="fa-regular fa-pen-to-square text-warning mr-2"></i>
            </a>
            <a href="#">
              <i class="fa-solid fa-circle-info text-info mr-2"></i>
            </a>
            <a href="#">
              <i class="fa-solid fa-trash-can text-danger mr-2"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table> -->

  </div>
</template>