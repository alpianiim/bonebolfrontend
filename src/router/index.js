import {createRouter, createWebHistory} from 'vue-router'
import Dashbord from "../components/content/Dashbord.vue"
import Todolist from "../components/content/Todolist.vue";
import Surmas from "../components/content/ptsp/SuratMasuk.vue";
import listSurmas from "../components/content/ptsp/ListSuratMasuk.vue";

const routes = [
  {
    path: "/",
    component: Dashbord,
  },
  {
    path: "/todo-list",
    component: Todolist,
  },
  {
    path: "/ptsp-surat-masuk",
    component: Surmas,
  },
  {
    path: "/ptsp-list-surat-masuk",
    component: listSurmas,
  },
];
 const router = createRouter({
   history: createWebHistory(),
   routes,
 });

 export default router
