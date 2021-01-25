import Vue from "vue";
import VueRouter from "vue-router";
import DashboardView from "../views/DashboardView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Panel Główny",
    component: DashboardView,
  },
  {
    path: "/klienci",
    name: "Klienci",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/CustomersView.vue"),
  },
  {
    path: "/Stihl",
    name: "Stihl",
    meta: {
      name: "stihl",
    },
    component: () => import("../views/ProductView.vue"),
  },
  {
    path: "/Kosiarki",
    name: "Kosiarki",
    meta: {
      name: "mower",
    },
    component: () => import("../views/ProductView.vue"),
  },
  {
    path: "/Rowery",
    name: "Rowery",
    meta: {
      name: "bike",
    },
    component: () => import("../views/ProductView.vue"),
  },
  {
    path: "/Naprawy",
    name: "naprawy",
    meta: {
      name: "repairs",
    },
    component: () => import("../views/ProductView.vue"),
  },
  {
    path: "/:id",
    name: "Klient",
    component: () => import("../views/CustomerPage.vue"),
  },
  {
    path: "/:id/:id1",
    name: "Produkt",
    component: () => import("../views/ProductPage.vue"),
  },
  {
    path: "/:id/:id1/:id2",
    name: "Naprawa",
    component: () => import("../components/repair/RepairPage.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
