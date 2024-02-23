<script setup>
import { onMounted } from "vue"
import { useDetailSurmas } from "@/strore/detailSurmas"
import { useRoute } from "vue-router"

const route = useRoute()
const storeDetail = useDetailSurmas()
storeDetail.getDetail(route.params.params)

</script>

<template>
  <h1 class="h3 mb-4 text-gray-800">Detail</h1>
  <span v-if="storeDetail.detail.disposisi == 0" class="badge badge-danger">Belum Disposisi</span>
  <span v-if="storeDetail.detail.disposisi == 1" class="badge badge-success">Sudah Disposisi</span>
  <hr />
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-end">
        <router-link class="btn btn-info btn-sm" to="/ptsp-monitoring">
          <i class="fa-regular fa-circle-left"></i>
          Kembali
        </router-link>
      </div>
      <hr>

      <div class="row no-gutters">
        <div class="col-12 col-md-7">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Nomor Arsip</p>
              </div>
              <div class="col-12 col-md-7">
                : <strong>{{ storeDetail.detail.nomor_arsip }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Nomor Surat</p>
              </div>
              <div class="col-12 col-md-7">
                : <strong>{{ storeDetail.detail.nomorsurat }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Status</p>
              </div>
              <div class="col-12 col-md-7">
                : <strong>{{ storeDetail.detail.status }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Tanggal Surat</p>
              </div>
              <div class="col-12 col-md-7">
                : <strong>{{ storeDetail.detail.tanggalsurat }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Sifat</p>
              </div>
              <div class="col-12 col-md-7">
                : <strong>{{ storeDetail.detail.sifat }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Lampiran</p>
              </div>
              <div class="col-12 col-md-7">
                : <strong>{{ storeDetail.detail.lampiran }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Di Terima</p>
              </div>
              <div class="col-12 col-md-8">
                : <strong>{{ storeDetail.detail.diterima }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Nomor Agenda</p>
              </div>
              <div class="col-12 col-md-8">
                : <strong>{{ storeDetail.detail.diterima }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Status Sifat</p>
              </div>
              <div class="col-12 col-md-8">
                : <strong>{{ storeDetail.detail.statussifat }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Dari</p>
              </div>
              <div class="col-12 col-md-8">
                : <strong>{{ storeDetail.detail.dari }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <p class="card-text mb-0">Perihal</p>
              </div>
              <div class="col-12 col-md-8">
                : <strong>{{ storeDetail.detail.perihal }}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <iframe :src="'http://192.168.1.21/apikemenagbonebol/file/' + storeDetail.detail.filesurat" frameborder="0"
            width="100%" height="650px"></iframe>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped></style>