<template>
  <!--扫码-->
  <div>
    <div class="banner"></div>
    <p class="scan-text">找到房号（台号）二维码【扫一扫】自助下单</p>
    <div class="scan-btn" @click="scanFn">扫一扫</div>
  </div>
</template>

<script>
export default {
  name: "Scan",
  data() {
    return {};
  },
  methods: {
    scanFn() {
      let that = this;
      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          console.log(result, "扫码结果");
          that.request({
            url: "",
            data: {},
            successFn(response) {
              // 获取到房间号，保存到本地缓存,然后跳转点酒页面
              window, localStorage.setItem("room", response.data.code);
              that.$router.replace("/wine");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 3rem;
  width: 3rem;
  margin: 1.3rem auto;
  background: url(../../assets/img/scan_bg.png) no-repeat;
  background-size: 100%;
}
.scan-text {
  color: #fff;
  text-align: center;
  margin-top: 0.9rem;
  margin-bottom: 0.52rem;
}
.scan-btn {
  margin: 0 0.7rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.38rem;
  color: #fff;
  border-radius: 0.1rem;
  background-color: #ff314f;
}
</style>
