import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import router from "../router";

export const useAuth = defineStore("auth-store", () => {
  const token = ref(null);
  const user = ref({});
  const otentikasi = ref(false);
  const user_group = ref();
  const id = ref();

  const getUser = () => {
    const id = sessionStorage.getItem("id");
    axios
      .get("user/" + id)
      .then((res) => {
        user_group.value = sessionStorage.getItem("user_group");
        otentikasi.value = true;
        user.value = res.data.data;
      })
      .catch((e) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("otentikasi");
        sessionStorage.removeItem("user_group");
        sessionStorage.removeItem("id");
        otentikasi.value = false;
      });
  };

  // Getter yang akan di gunakan pada komponen lainnya untuk mengakses isi state diatas
  return {
    token,
    user,
    otentikasi,
    getUser,
    user_group,
  };
});
