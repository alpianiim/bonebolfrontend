import { defineStore } from "pinia";
import axios from "axios"
import { ref } from "vue";
import { useRouter } from 'vue-router'



export const useAuth = defineStore('auth-store', () => {
  const token = ref(null)
  const user = ref({})
  const otentikasi = ref(false)


  // Fungsi untuk melakukan login
  function authLogin(data) {
    return new Promise((resolve, reject) => {
      axios.post('login', data)
        .then(res => {
          if (res.status == 200) {
            token.value = `Bearer ${res.data.token}`;
            user.value = res.data.user;
            otentikasi.value = true;
            resolve(res.data)
          } else {
            reject(res.response.data.message)
          }
        })
        .catch(err => reject(err))
    })

  }

  // fungsi logout /keluar dari session


  const getUser = () => {
    axios.get('user')
      .then(res => {
        otentikasi.value = true
        user.value = res.data.data
      })
      .catch(e => {
        sessionStorage.removeItem("otentikasi")
        // sessionStorage.removeItem("token")
        otentikasi.value = false
      });
  }


  // Getter yang akan di gunakan pada komponen lainnya untuk mengakses isi state diatas
  return {
    token,
    user,
    otentikasi,
    authLogin,
    getUser
  }

})