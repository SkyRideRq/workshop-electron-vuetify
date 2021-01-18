import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Szukaj",
    component: Search,
  },
  {
    path: "/klienci",
    name: "Klienci",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Customers.vue"),
  },
  {
    path: "/Stihl",
    name: "Stihl",
    component: () => import("../views/Stihl.vue"),
  },
  {
    path: "/Kosiarki",
    name: "Kosiarki",
    component: () => import("../views/Mowers.vue"),
  },
  {
    path: "/Rowery",
    name: "Rowery",
    component: () => import("../views/Bikes.vue"),
  },
  {
    path: "/:id",
    name: "Klient",
    component: () => import("../views/CustomerPage.vue"),
  },
  {
    path: "/:id/:id1",
    name: "Produkt",
    component: () => import("../components/product/ProductPage.vue"),
  },
  {
    path: "/:id/:id1/:id2",
    name: "Naprawa",
    component: () => import("../components/repair/RepairPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
