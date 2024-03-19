<script setup>
import axios from "axios"
import { useAlert } from "@/strore/alert"
import { nextTick, onMounted, reactive } from "vue";
import divAlert from "@/components/alert.vue"
import { useAuth } from "@/strore/auth";
import { useRouter, onBeforeRouteUpdate } from 'vue-router'



const storeAlert = useAlert()
const auth = useAuth();

const router = useRouter()

const data = reactive({
  username: "",
  password: ""
}
)


const login = async () => {
  storeAlert.$reset()
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  try {
    const respon = await axios.post('login', formData)
    sessionStorage.setItem("token", respon.data.token);
    sessionStorage.setItem("otentikasi", true)

    nextTick(() => {
      router.go("/dashboard")
      auth.getUser()
    })

    // localStorage.setItem("otentikasi", true);

  } catch (err) {

    storeAlert.errorAlert.statusAlert = true
    storeAlert.errorAlert.message = err.response.data.message
    storeAlert.errorAlert.statusText = err.response.statusText
  }




}

onMounted(() => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("otentikasi");
})

// onBeforeRouteLeave(() => {
//   const otentikasi = sessionStorage.removeItem("otentikasi");
//   if (otentikasi==null) return false
//   else return true
//   // sessionStorage.removeItem("token");
//   // sessionStorage.removeItem("otentikasi");

// })

onBeforeRouteUpdate(() => {
  const otentikasi = sessionStorage.removeItem("otentikasi");
  if (otentikasi === null) return false
  else return true
  // sessionStorage.removeItem("token");
  // sessionStorage.removeItem("otentikasi");

})


</script>

<template>

  <div class="" style="height:100vb;">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-12 col-md-6">
          <div class="card o-hidden border-0 shadow-lg my-5 bg-gradient-info ">
            <div class="card-body p-0">

              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="p-5">
                    <divAlert />
                    <div class="text-center">
                      <h3 class="h5 text-gray-900 font-weight-bold">Sistem Informasi PELITA </h3>
                      <h3 class="h6 text-gray-900 font-weight-bold">Kantor Kementerian Agama Kebupaten Bone Bolango
                      </h3>
                    </div>
                    <form class="user" @submit.prevent="login">
                      <div class="form-group">
                        <input v-model="data.username" type="text" class="form-control form-control-user"
                          id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Username (NIP/NIK)" />
                      </div>
                      <div class="form-group">
                        <input v-model="data.password" type="password" class="form-control form-control-user"
                          id="exampleInputPassword" placeholder="Password" />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input type="checkbox" class="custom-control-input " id="customCheck" />
                          <label class="custom-control-label text-white" for="customCheck">Remember
                            Me</label>
                        </div>
                      </div>
                      <button type="submit" class="font-weight-bold btn btn-info btn-user btn-block">
                        L O G I N
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript-->
  </div>
</template>

<style scoped></style>
