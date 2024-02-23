import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/content/Dashbord.vue"),
  },
  {
    path: "/todo-list",
    component: () => import("@/components/content/Todolist.vue"),
  },
  {
    path: "/ptsp-suratmasuk",
    component: () => import("@/components/content/ptsp/SuratMasuk.vue"),
  },
  {
    path: "/ptsp-monitoring",
    component: () => import("@/components/content/ptsp/ListSuratMasuk.vue"),
  },
  // kakemenag

  {
    path: "/detail-suratmasuk/:params",
    component: () => import("@/components/content/ptsp/show/Details.vue"),
    // beforeEnter: (to, from, next) => {
    //   const kakemenag = false;
    //   if (kakemenag) {
    //     next();
    //   } else {
    //     next({ name: "NotFound" });
    //   }
    // },
  },
  {
    path: "/update-suratmasuk",

    component: () => import("@/components/content/ptsp/show/Update.vue"),
  },
  // kakemenag

  {
    path: "/disposisi-suratmasuk",
    component: () => import("@/components/content/kankemenag/DisSurmas.vue"),
  },
  {
    path: "/monitoring-suratmasuk",
    component: () =>
      import("@/components/content/kankemenag/MonitoringSurmas.vue"),
  },

  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("@/components/NotFound.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
