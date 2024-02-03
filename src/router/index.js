import { createRouter, createWebHistory } from "vue-router";
import Dashbord from "../components/content/Dashbord.vue";
import Todolist from "../components/content/Todolist.vue";
import Surmas from "../components/content/ptsp/SuratMasuk.vue";
import listSurmas from "../components/content/ptsp/ListSuratMasuk.vue";
// import { useAlert } from "@/strore/alert";

// const storeAlert = useAlert();
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
router.beforeEach((to, from, next) => {
  // Reset store Pinia sebelum navigasi
  //  storeAlert.$reset();
  next();
});
export default router;
