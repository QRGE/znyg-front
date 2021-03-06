import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/updatePwd",
    component: () => import("@/views/updatePwd/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/real-time-record",
    children: [
      {
        path: "/real-time-record",
        name: "RealTimeRecord",
        component: () => import("@/views/record/realTime/index"),
        meta: {
          title: "鱼缸节点监测和控制",
          icon: "el-icon-view",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/node",
    component: Layout,
    redirect: "/node",
    children: [
      {
        path: "/node/info",
        name: "NodeInfo",
        component: () => import("@/views/fish/fishNode/index"),
        meta: {
          title: "鱼缸节点信息管理",
          icon: "线性鱼缸",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/history",
    component: Layout,
    children: [
      {
        path: "/history/records",
        name: "HistoryRecords",
        component: () => import("@/views/record/history/index"),
        meta: {
          title: "历史记录查询",
          icon: "el-icon-collection",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/log",
    component: Layout,
    meta: { title: "控制日志查询", icon: "el-icon-data-line" },
    children: [
      {
        path: "/log/web",
        name: "WebCommandLog",
        component: () => import("@/views/command/index"),
        meta: {
          title: "Web程序控制日志",
          icon: "el-icon-receiving",
        },
      },
      {
        path: "/log/host",
        name: "HostCommandLog",
        component: () => import("@/views/commandHost/index"),
        meta: {
          title: "上位机程序控制日志",
          icon: "el-icon-receiving",
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/userInfo/index"),
        meta: { title: "个人信息管理", icon: "el-icon-s-custom" },
        noCache: true,
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
