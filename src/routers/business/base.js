export default [
    {
        path: "base/index",
        name: "BaseIndex",
        component: () => import("components/business/base/Index.vue"),
        meta: {
            auth: true,
        },
    },
    {
        path: "base/profile",
        name: "BaseProfile",
        component: () => import("components/business/base/Profile.vue"),
        meta: {
            auth: true,
        },
    },
    {
        path: "base/login",
        name: "BaseLogin",
        component: () => import("components/business/base/Login.vue"),
    },
    {
        path: "base/register",
        name: "BaseRegister",
        component: () => import("components/business/base/Register.vue"),
    },
];
