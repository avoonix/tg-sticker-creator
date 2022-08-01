import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Editor",
    component: () =>
      import(/* webpackChunkName: "edit" */ "@/views/Editor.vue"),
  },
  {
    path: "/404",
    name: "404",
    alias: "*",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
