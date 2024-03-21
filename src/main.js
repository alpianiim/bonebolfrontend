import { createApp, onMounted, onBeforeUnmount } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";
import axios from "axios";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import router from "./router";
import { useAuth } from "@/strore/auth";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = "http://192.168.1.34/apikemenagbonebol/";
axios.defaults.withCredentials = true;
const axiosInterceptor = axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

window.addEventListener(
  "storage",
  () => {
    const newToken = sessionStorage.getItem("token");
    if (axios.defaults.headers.common.Authorization) {
      axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }
  },
  false
);

// (async () => {
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const auth = useAuth();
// await auth.getUser()

app.use(router).use(VueAwesomePaginate);
app.mount("#app");
// })()
