import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/home"),
      meta: {
        title: "首页"
      }
    },
    {
      path: "/mine",
      name: "Mine",
      component: () => import("@/views/mine"),
      meta: {
        title: "我的"
      }
    },{
      path: "/mine/memberCard",
      name: "MemberCard",
      component: () => import("@/views/mine/memberCard/memberCard"),
      meta: {
        title: "会员卡"
      }
    },{
      path: "/mine/myCard",
      name: "MyCard",
      component: () => import("@/views/mine/myCard/myCard"),
      meta: {
        title: "我的会员卡"
      }
    },
    {
      path: "/ticket",
      name: "Ticket",
      component: () => import("@/views/ticket"),
      meta: {
        title: "快速验票"
      }
    },
    {
      path: "/scan",
      name: "Scan",
      component: () => import("@/views/scan"),
      meta: {
        title: "扫一扫"
      }
    },
    {
      path: "/reserve",
      name: "Reserve",
      component: () => import("@/views/reserve"),
      meta: {
        title: "预定台房"
      }
    },
    {
      path: "/wine",
      name: "Wine",
      component: () => import("@/views/wine"),
      meta: {
        title: "在线酒水"
      }
    },
    {
      path: "/settlement",
      name: "Settlement",
      component: () => import("@/views/wine/settlement"),
      meta: {
        title: "结算"
      }
    },
    {
      path: "/coupon",
      name: "Coupon",
      component: () => import("@/views/coupon"),
      meta: {
        title: "我的优惠卡包"
      }
    },
    {
      path: "/consume-history",
      name: "ConsumeHistory",
      component: () => import("@/views/consume-history"),
      meta: {
        title: "消费历史订单"
      }
    },
    {
      path: "/take-wine",
      name: "TakeWine",
      component: () => import("@/views/take-wine"),
      meta: {
        title: "存取酒及记录"
      }
    },
    {
      path: "/bind-phone",
      name: "BindPhone",
      component: () => import("@/views/bind-phone"),
      meta: {
        title: "绑定手机号"
      }
    }
  ]
});
