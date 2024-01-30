import { createApp} from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = "http://localhost:8080";


import router from './router'

createApp(App).use(router).mount("#app");


