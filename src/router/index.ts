import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";

// Auth
import Login from "@/pages/Auth/Login.vue";

// Admin
import Index from "@/components/Index/Index.vue";
import AdminDashboard from "@/pages/Admin/AdminDashboard/AdminDashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/jaksel/admin/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    component: Index,
    children: [
      {
        path: "",
        redirect: { name: "AdminDashboard" },
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
