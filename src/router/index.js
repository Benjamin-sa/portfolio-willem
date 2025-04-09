import { createRouter, createWebHistory } from "vue-router";
import { preloadRouteAssets } from "@/services/preloadService";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      preloadAssets: true,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/views/ProjectsPage.vue"),
    meta: {
      preloadAssets: true,
    },
  },
  {
    path: "/projects/:id",
    name: "ProjectDetail",
    component: () => import("@/views/ProjectDetailPage.vue"),
    props: true,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutPage.vue"),
    meta: {
      preloadAssets: true,
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/ContactPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/portfolio-willem/" : "/"
  ),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Before route enters, preload assets for the route if necessary
router.beforeEach((to, from, next) => {
  // For routes that should preload assets
  if (to.meta.preloadAssets) {
    preloadRouteAssets(to.path);
  }
  next();
});

export default router;
