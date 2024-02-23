import { createApp, onMounted, onBeforeUnmount } from "vue";
import { createPinia } from "pinia";


import "./style.css";
import App from "./App.vue";
import axios from "axios";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = " http://192.168.1.38/apikemenagbonebol/";

const pinia = createPinia();

const app = createApp(App);
import router from "./router";

app.use(router).use(pinia).use(VueAwesomePaginate);
app.mount("#app");
