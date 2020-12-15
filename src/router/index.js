import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/home")
    },
    {
      path: "/mine",
      name: "Mine",
      component: () => import("@/views/mine")
    },
    {
      path: "/ticket",
      name: "Ticket",
      component: () => import("@/views/ticket")
    },
    {
      path: "/scan",
      name: "Scan",
      component: () => import("@/views/scan")
    },
    {
      path: "/reserve",
      name: "Reserve",
      component: () => import("@/views/reserve")
    },
    {
      path: "/wine",
      name: "Wine",
      component: () => import("@/views/wine")
    }
  ]
});
