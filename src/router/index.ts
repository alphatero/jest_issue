import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Chart from "../views/Chart.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Correction from "../views/Correction.vue";
import CorrectionStep1 from "../components/Correction_1.vue";
import CorrectionStep2 from "../components/Correction_2.vue";
import CorrectionStep3 from "../components/Correction_3.vue";
import CorrectionStep4 from "../components/Correction_4.vue";
import Parameter from "../views/Parameter.vue";
import Connection from "../views/Connection.vue";
import System from "../views/System.vue";
import Update from "../views/Update.vue";
import Info from "../views/Info.vue";
import Data from "../views/Data.vue";

import Service from "../websocket";

const service = Service(window.ip);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 0 }));
    },
    children: [
      {
        path: "chart",
        name: "Chart",
        beforeEnter: () => {
          service.send(JSON.stringify({ page: 1 }));
        },
        component: Chart,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 11 }));
    },
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 12 }));
    },
    component: Signup,
  },
  {
    path: "/correction",
    name: "Correction",
    redirect: { name: "CorrectionStep1" },
    component: Correction,

    children: [
      {
        path: "step1",
        name: "CorrectionStep1",
        component: CorrectionStep1,
        alias: "cor",
        beforeEnter: () => {
          service.send(JSON.stringify({ page: 2 }));
        },
      },
      {
        path: "step2",
        name: "CorrectionStep2",
        beforeEnter: () => {
          service.send(JSON.stringify({ page: 3 }));
        },
        component: CorrectionStep2,
      },
      {
        path: "step3",
        name: "CorrectionStep3",
        beforeEnter: () => {
          service.send(JSON.stringify({ page: 4 }));
        },
        component: CorrectionStep3,
      },
      {
        path: "step4",
        name: "CorrectionStep4",
        beforeEnter: () => {
          service.send(JSON.stringify({ page: 5 }));
        },
        component: CorrectionStep4,
      },
    ],
  },
  {
    path: "/parameter",
    name: "Parameter",
    component: Parameter,
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 6 }));
    },
  },
  {
    path: "/data",
    name: "Data",
    component: Data,
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 7 }));
    },
  },
  {
    path: "/connection",
    name: "Connection",
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 8 }));
    },
    component: Connection,
  },
  {
    path: "/system",
    name: "System",
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 9 }));
    },
    component: System,
  },
  {
    path: "/update",
    name: "Update",
    component: Update,
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 9 }));
    },
  },
  {
    path: "/info",
    name: "Info",
    beforeEnter: () => {
      service.send(JSON.stringify({ page: 10 }));
    },
    component: Info,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, _from, next) => {
  const isLogin = parseInt(sessionStorage.getItem("isLogin") || "", 10);
  if (
    to.name === "Home" ||
    to.name === "Chart" ||
    to.name === "Login" ||
    to.name === "Signup" ||
    to.name === "Info"
  ) {
    return next();
  }

  sessionStorage.setItem("toPath", to.path);
  if (Number.isNaN(isLogin) || isLogin === 0) {
    return next({ name: "Login" });
  }

  console.log(to.path);

  next();
});
export default router;
