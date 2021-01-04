<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { authorize } from "@/assets/js/authorize";
import { userInfoKey } from "@/assets/js/config";
import wx from "weixin-js-sdk";
export default {
  name: "App",
  data() {
    return {
      isLogin: false
    };
  },
  mounted() {
    this.getJssdkConfig(); // 获取jssdk配置
  },
  watch: {
    $route(to, from) {
      let userInfo = window.localStorage.getItem(userInfoKey);
      if (!userInfo) {
        // 没有用户信息的话跳转微信授权
        let query = this.$route.query;
        if (query && query.code) {
          //  获取code调取后端登录接口获取用户信息
          this.login(query.code); // 获取jssdk配置
          return;
        }
        authorize();
      }
    }
  },
  methods: {
    getJssdkConfig() {
      // 调接口获取jssdk配置
      this.request({
        url: "/api/v1/user/get_jssdk",
        data: {
          url: window.location.href.split("#")[0]
        },
        successFn: res => {
          console.log(res, "jssdk配置");
          let data = res.data;
          wx.config({
            //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appid, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ["scanQRCode", "openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            console.log("jssdk配置成功");
          });
          wx.error(re => {
            console.log(re, "jssdk配置失败");
          });
        }
      });
    },
    login(code) {
      // 调用登录接口
      console.log(code);
      let that = this;
      this.request({
        url: "/api/v1/user/getUserInfoByCode",
        data: {
          code: code
        },
        successFn(res) {
          console.log(res, "用户数据");
          window.localStorage.setItem(userInfoKey, JSON.stringify(res.data));
          console.log(res.data.mobile, "手机号");
          if (res.data.mobile === "") {
            that.$router.push("/bind-phone");
          }
        }
      });
    }
  }
};
</script>

<style></style>
