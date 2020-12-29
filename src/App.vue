<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { authorize } from "@/assets/js/authorize";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    let userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      // 没有用户信息的话跳转微信授权
      authorize();
    }
  },
  mounted() {
    let query = this.$route.query;
    if (query && query.code) {
      //  获取code调取后端登录接口获取用户信息
      this.login(query.code);
    }
  },
  methods: {
    getJssdkConfig() {
      // 调接口获取jssdk配置
      this.request({
        url: "",
        data: {},
        successFn: res => {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "", // 必填，公众号的唯一标识
            timestamp: "", // 必填，生成签名的时间戳
            nonceStr: "", // 必填，生成签名的随机串
            signature: "", // 必填，签名，见附录1
            jsApiList: ["scanQRCode", "openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      });
    },
    login(code) {
      // 调用登录接口
      console.log(code);
      this.request({
        url: "/api/v1/user/getUserInfoByCode",
        data: {
          code: code
        },
        successFn(res) {
          console.log(res, "用户数据");
        }
      });
    }
  }
};
</script>

<style></style>
