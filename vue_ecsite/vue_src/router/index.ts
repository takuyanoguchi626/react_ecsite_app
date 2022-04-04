import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/orderConfirm",
    component: () => import("../views/OrderConfirm.vue"),
  },
  {
    path: "/itemDetail/:id",
    component: () => import("../views/ItemDetail.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/ItemList.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/backToLogin",
    component: () => import("../views/BackToLogin.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/RegisterUser.vue"),
  },
  {
    path: "/top",
    component: () => import("../views/Top.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Top.vue"),
  },
  {
    path: "/logout",
    component: () => import("../views/Logout.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/CartList.vue"),
  },
  {
    path: "/orderHistory",
    component: () => import("../views/OrderHistory.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../views/OrderFinished.vue"),
  },
  {
    path: "/recommendation",
    component: () => import("../views/Recommendation.vue"),
  },
  {
    path: "*",
    component: () => import("../views/404error.vue"),
  },
  {
    path: "/404error",
    component: () => import("../views/404error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
