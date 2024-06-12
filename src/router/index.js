import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/strore/auth";
import { reactive, watch } from "vue";

const routes = [
  {
    path: "/login",
    component: () => import("@/components/layout/Login.vue"),
    name: "login",
    meta: {
      pageAuth: true,
    },
  },
  {
    path: "/update-user",
    component: () => import("@/components/layout/UpdateUser.vue"),
    name: "update-user",
    meta: {
      harusAuth: true,
    },
  },
  {
    path: "/",
    component: () => import("@/components/Wrapper.vue"),
    meta: {
      harusAuth: true,
    },
    children: [
      {
        path: "buat-otentikasi",
        component: () => import("@/components/content/admin/buatUser.vue"),
        // harusAuth: true,
        // beforeEnter: (to, from, next) => {
        //   const admin = sessionStorage.getItem("user_group");
        //   if (admin == 1) return next();
        //   else return next(from);
        // },
        // == 1 ? true : false
      },
      {
        path: "list-otentikasi",
        component: () => import("@/components/content/admin/listUser.vue"),
        // harusAuth: true,
        // beforeEnter: (to, from, next) => {
        //   const admin = sessionStorage.getItem("user_group");
        //   if (admin == 1) return next();
        //   else return next(from);
        // },
      },
      {
        path: "ubah-otentikasi",
        component: () => import("@/components/content/admin/ubahUser.vue"),
        // harusAuth: true,
        // beforeEnter: (to, from, next) => {
        //   const admin = sessionStorage.getItem("user_group");
        //   if (admin == 1) return next();
        //   else return next(from);
        // },
      },
      {
        path: "dashboard",
        component: () => import("@/components/content/Dashbord.vue"),
        name: "dashboard",
        // harusAuth: true,
      },
      {
        path: "todo-list",
        component: () => import("@/components/content/Todolist.vue"),
        // harusAuth: true,
      },
      {
        path: "ptsp-suratmasuk",
        component: () => import("@/components/content/ptsp/SuratMasuk.vue"),
        // harusAuth: true,
      },
      {
        path: "ptsp-monitoring",
        component: () => import("@/components/content/ptsp/ListSuratMasuk.vue"),
        // harusAuth: true,
      },
      // kakemenag

      {
        path: "detail-suratmasuk/:params",
        component: () => import("@/components/content/ptsp/show/Details.vue"),
        // harusAuth: true,
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
        path: "update-suratmasuk",
        component: () => import("@/components/content/ptsp/show/Update.vue"),
        // harusAuth: true,
      },
      // kakemenag

      {
        path: "disposisi-suratmasuk",
        component: () =>
          import("@/components/content/kankemenag/DisSurmas.vue"),
        // harusAuth: true,
      },
      {
        path: "monitoring-disposisi",
        component: () =>
          import("@/components/content/kankemenag/MonitoringSurmas.vue"),
        // harusAuth: true,
        // beforeEnter: (to, from, next) => {
        //   const admin = sessionStorage.getItem("user_group");
        //   if (admin == 3) return next();
        //   else return next(from);
        // },
      },
      {
        path: "monitoring-tindaklanjut",
        component: () =>
          import("@/components/content/kankemenag/MonitoringTindaklanjut.vue"),
        // harusAuth: true,
      },
      {
        path: "ubah-user/:id",
        name: "ubahUser",
        component: () => import("@/components/content/admin/ubahUser.vue"),
        // harusAuth: true,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/components/NotFound.vue"),
        // harusAuth: true,
      },
      {
        path: "profil",
        name: "profil",
        component: () => import("@/components/layout/Profil.vue"),
        // harusAuth: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();
  const otentikasi = reactive({
    value: JSON.parse(sessionStorage.getItem("otentikasi")) || false,
  });

  if (to.meta.harusAuth) {
    if (otentikasi.value) {
      next();
    } else {
      next({
        name: "login",
      });
    }
  }

  if (to.meta.pageAuth) {
    if (!otentikasi.value) {
      next();
    } else {
      next(from);
    }
  }
});

export default router;
