import { createApp, onMounted, onBeforeUnmount } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";
import axios from "axios";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = "http://localhost:8080";

const pinia = createPinia();
const app = createApp(App);

import router from "./router";

app.use(router).use(pinia);
app.mount("#app");
