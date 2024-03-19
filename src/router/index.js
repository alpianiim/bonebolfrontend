import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/strore/auth"

const routes = [
  {
    path: "/login",
    component: () => import("@/components/layout/Login.vue"),
    name: 'login',
    meta: {
      pageAuth: true
    }
  },
  {
    path: "/",
    component: () => import("@/components/Wrapper.vue"),
    meta: {
      harusAuth: true
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/components/content/Dashbord.vue"),
        harusAuth: true
      },
      {
        path: "todo-list",
        component: () => import("@/components/content/Todolist.vue"),
        harusAuth: true
      },
      {
        path: "ptsp-suratmasuk",
        component: () => import("@/components/content/ptsp/SuratMasuk.vue"),
        harusAuth: true
      },
      {
        path: "ptsp-monitoring",
        component: () => import("@/components/content/ptsp/ListSuratMasuk.vue"),
        harusAuth: true
      },
      // kakemenag

      {
        path: "detail-suratmasuk/:params",
        component: () => import("@/components/content/ptsp/show/Details.vue"),
        harusAuth: true
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
        harusAuth: true
      },
      // kakemenag

      {
        path: "disposisi-suratmasuk",
        component: () => import("@/components/content/kankemenag/DisSurmas.vue"),
        harusAuth: true
      },
      {
        path: "monitoring-suratmasuk",
        component: () =>
          import("@/components/content/kankemenag/MonitoringSurmas.vue"),
        harusAuth: true
      },

      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/components/NotFound.vue"),
        harusAuth: true
      },
    ]

  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const auth = useAuth()
  // const otentikasi = localStorage.getItem("otentikasi");
  const otentikasi = sessionStorage.getItem('otentikasi');
  // if (!auth.otantikasi && to.harusAuth && !otentikasi) next({name:'login'})
  // else next()
  if (to.meta.harusAuth) {
    if (otentikasi) { 
      next();
    } else {
      next({
        name: 'login'
      })
    }
  }
  
  if (to.meta.pageAuth) {
    if (!otentikasi) {
      next()
    } else {
      next(from)
    }
  }
})

export default router;
