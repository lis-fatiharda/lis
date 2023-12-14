import { createRouter, createWebHistory } from "vue-router";
import Routes from "./routes";

const routes = Routes;

const router = createRouter({
    history: createWebHistory(/*process.env.BASE_URL*/),
    routes,
});

export default router;
