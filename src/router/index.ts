import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import ErrorPage from "@/pages/Error/ErrorPage/ErrorPage.vue";

// Auth
import Login from "@/pages/Auth/Login.vue";

// Admin
import Index from "@/components/Index/Index.vue";
import AdminDashboard from "@/pages/Admin/AdminDashboard/AdminDashboard.vue";
import Cookies from "js-cookie";
import { useAuth } from "@/composables/useAuth";

const auth = useAuth();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
    },
  },
  {
    path: "/jaksel/admin/login",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.path === "/jaksel/admin/login") {
        const token = Cookies.get("token");
        if (token) {
          next("/admin");
        } else {
          next();
        }
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    component: Index,
    children: [
      {
        path: "",
        redirect: { name: "AdminDashboard" },
        meta: {
          auth: true,
        },
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    const token = Cookies.get("token");
    if (!token) {
      next("/");
    } else {
      const { status } = await auth.myProfile();
      if (status) {
        next();
      } else {
        Cookies.remove("token");
        window.location.reload();
      }
    }
  } else {
    next();
  }
});

export default router;
