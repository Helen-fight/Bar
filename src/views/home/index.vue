<template>
  <div>
    <div class="home-wrap">
      <div class="scan-btn" @click="scanFn"></div>
      <div class="menu flex-h flex-hsb">
        <div
          class="menu-item flex-h flex-hc flex-vc"
          v-for="(item, index) in menu"
          :key="index"
          @click="goto(item.path)"
        >
          <i class="home-icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <p class="look-store"><span>查看门店</span></p>
      <div class="flex-h">
        <div class="add-btn" @click="openLocation">Add</div>
        <a class="add-btn" href="tel:15280568356">Telephone</a>
      </div>
      <p class="address">
        上海浦东新区东方路3539号2号楼3楼 <br />3rd floor,building 2, 3539
        Dongfang Road, Pudong New Area, Shanghai
      </p>
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
import { userInfoKey } from "@/assets/js/config";
import wx from "weixin-js-sdk";
export default {
  name: "Home",
  data() {
    return {
      menu: [
        {
          id: 0,
          name: "我要订台",
          icon: "",
          path: ""
        },
        {
          id: 1,
          name: "点单结账",
          icon: "home-icon2",
          path: "/wine"
        },
        {
          id: 2,
          name: "存/取酒",
          icon: "home-icon3",
          path: "/take-wine"
        },
        {
          id: 3,
          name: "呼叫服务",
          icon: "home-icon4",
          path: ""
        },
        {
          id: 4,
          name: "积分商城",
          icon: "home-icon5",
          path: ""
        },
        {
          id: 5,
          name: "我的订单",
          icon: "home-icon6",
          path: "/consume-history"
        }
      ]
    };
  },
  components: {
    tabbar
  },
  mounted() {
    let that = this;
    if (window.localStorage.getItem(userInfoKey)) {
      let userInfo = JSON.parse(window.localStorage.getItem(userInfoKey));
      if (userInfo.mobile === "") {
        that.$router.push("/bind-phone");
      }
    }
  },
  methods: {
    goto(path) {
      if (path === "/wine") {
        // 点酒的时候先判断本地是否有缓存房间号，没有的话跳到扫一扫界面
        let tableNum = window.localStorage.getItem("table");
        if (!tableNum) {
          this.$router.push("/scan");
          return;
        }
      }

      if (path) this.$router.push(path);
      else this.$messagebox.alert("功能开发中，敬请期待", "提示");
    },
    scanFn() {
      // 扫一扫，成功后调用后端接口获取房间号
      let that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          console.log(result, "扫码结果");
          if (result.indexOf("table=") < 0) {
            that.$toast("扫码错误，请扫描正确的二维码");
            return;
          }
          let tableNum = result.split("table=")[1];
          window.localStorage.setItem("table", tableNum);
          that.$router.push({ path: "/wine" });
        }
      });
    },
    openLocation() {
      // 使用微信内置地图查看门店位置
      wx.openLocation({
        latitude: 24.481622, // 纬度，浮点数，范围为90 ~ -90
        longitude: 118.198303, // 经度，浮点数，范围为180 ~ -180。
        name: "中航紫金广场B栋", // 位置名
        address: "中航紫金广场B栋", // 地址详情说明
        scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin bgImg($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100%;
}
.home-wrap {
  position: relative;
  height: 13.8rem;
  color: #fff;
  @include bgImg("../../assets/img/home/bg_home@2x.png");
  .scan-btn {
    position: absolute;
    right: 0.58rem;
    top: 1.25rem;
    width: 0.64rem;
    height: 0.64rem;
    @include bgImg("../../assets/img/home/sao_icon.png");
  }
  .menu {
    padding: 4.8rem 0.5rem 0.1rem;
    flex-wrap: wrap;
    .menu-item {
      width: 3rem;
      height: 1rem;
      margin-bottom: 0.46rem;
      text-align: center;
      border: 1px solid #fe344b;
      background-color: #121212;
      border-radius: 0.2rem;
    }
    .home-icon {
      width: 0.42rem;
      height: 0.42rem;
      @include bgImg("../../assets/img/home/home_icon6.png");
      margin-right: 0.3rem;
    }
    .home-icon2 {
      @include bgImg("../../assets/img/home/home_icon5.png");
      margin-right: 0.3rem;
    }
    .home-icon3 {
      @include bgImg("../../assets/img/home/home_icon4.png");
      margin-right: 0.3rem;
    }
    .home-icon4 {
      @include bgImg("../../assets/img/home/home_icon3.png");
      margin-right: 0.3rem;
    }
    .home-icon5 {
      @include bgImg("../../assets/img/home/home_icon1.png");
      margin-right: 0.3rem;
    }
    .home-icon6 {
      @include bgImg("../../assets/img/home/home_icon2.png");
      margin-right: 0.3rem;
    }
  }
  .look-store {
    font-size: 0.32rem;
    margin-left: 0.5rem;
    margin-bottom: 0.45rem;
  }
  .add-btn {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    color: #fff;
    border-radius: 25px;
    border: 1px solid #ff314f;
  }
  .address {
    color: #acacac;
    margin: 0.42rem 0.5rem;
    line-height: 0.42rem;
  }
}
</style>
