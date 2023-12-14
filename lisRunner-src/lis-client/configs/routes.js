const routes = [
    //***********************login-page***********************/
    //{path: "/login",name: "login",component: () => import("../components/login.vue"),},
    {
        path: "/login",
        name: "login",
        component: () => import("../layouts/erpLogin.vue"),
    },
    //***********************Main-page***********************/
    {
        path: "/",
        name: "home",
        component: () => import("../layouts/erp.vue"),
        //children: [{ path: "", component: () => import("../components/home.vue") }],
    },
];
export default routes;
