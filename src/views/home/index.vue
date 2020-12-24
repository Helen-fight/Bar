<template>
  <div>
    <div class="banner">
      <div class="scan-btn" @click="scanFn"></div>
    </div>
    <div class="menu-box">
      <div class="menu-main flex-h flex-hsb">
        <div class="line-wine" @click="goto('/wine')">
          <p class="wine-text">在线酒水</p>
          <p>下单免排队</p>
        </div>
        <div>
          <div class="flex-h flex-hsb">
            <div class="call-serve" @click="goto('/reserve')">
              <p>预定<br />台房</p>
            </div>
            <div class="call-serve reserve" @click="goto('')">
              <p>呼叫<br />服务</p>
            </div>
          </div>
          <div class="save-box" @click="goto('/take-wine')">
            <p class="save-text">存取酒</p>
            <p>好酒只为好时光</p>
          </div>
        </div>
      </div>
      <div class="address-box flex-h flex-hsb flex-vc" @click="lookStore">
        <div>
          <p class="check-box">
            <span>查看门店</span>
            <i class="address-icon"></i>
          </p>
          <p>厦门市集美区同集大道668号</p>
        </div>
        <a class="call-btn" href="tel:15280568356"></a>
      </div>
    </div>
    <div class="store-box flex-h flex-hsb">
      <div class="store" @click="goto('')">
        <p class="store-text">限时秒杀</p>
      </div>
      <div class="store score" @click="goto('')">
        <p class="store-text">积分商城</p>
      </div>
    </div>
    <div class="member-card flex-h flex-hsb" @click="goto('/mine/memberCard')">
      <div>
        <p class="my-card">我的会员卡</p>
        <p>会员积分可兑换丰富灵感周边</p>
      </div>
      <div class="card-icon"></div>
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    tabbar
  },
  methods: {
    goto(path) {
      if (path) this.$router.push(path);
      else this.$messagebox.alert("功能开发中，敬请期待", "提示");
    },
    lookStore() {
      this.$messagebox.alert("功能开发中，敬请期待", "提示");
    },
    scanFn() {
      this.$toast("微信扫码");
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  height: 7.34rem;
  background: url(../../assets/img/home/banner.png) no-repeat;
  background-size: 100%;
  .scan-btn {
    position: absolute;
    left: 0.38rem;
    top: 0.5rem;
    width: 0.64rem;
    height: 0.64rem;
    background: url(../../assets/img/home/sao_icon.png) no-repeat;
    background-size: 100%;
  }
}
.menu-box {
  position: relative;
  margin: -3rem 0.28rem 0.23rem;
  border-radius: 0.2rem 0.2rem 0 0;
  background-color: #fff;
  z-index: 2;
  .menu-main {
    padding: 0.2rem;
    margin-bottom: 0.16rem;
    border-radius: 0.2rem 0.2rem 0 0;
    border-bottom: 0.04rem solid #f5f5f5;
    .line-wine {
      width: 2.38rem;
      height: 3.22rem;
      background: url(../../assets/img/home/line_wine.png) no-repeat;
      background-size: 100%;
      font-size: 0.2rem;
      text-align: center;
      .wine-text {
        font-size: 0.34rem;
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.2rem;
      }
    }
    .call-serve {
      width: 1.6rem;
      height: 1.16rem;
      padding-top: 0.3rem;
      padding-left: 0.3rem;
      background-image: url(../../assets/img/home/yuding.png);
      background-repeat: no-repeat;
      background-size: 100%;
      font-size: 0.3rem;
      font-weight: 700;
      line-height: 0.42rem;
    }
    .reserve {
      background-image: url(../../assets/img/home/call_serve.png);
    }
    .save-box {
      width: 3.6rem;
      height: 1.58rem;
      padding-left: 0.36rem;
      margin-top: 0.18rem;
      font-size: 0.2rem;
      background: url(../../assets/img/home/save_wine.png) no-repeat;
      background-size: 100%;
      .save-text {
        font-size: 0.34rem;
        font-weight: 600;
        padding-top: 0.42rem;
        margin-bottom: 0.2rem;
      }
    }
  }
  .address-box {
    padding: 0.31rem 0.35rem;
    font-size: 0.24rem;
    .check-box {
      font-size: 0.34rem;
      margin-bottom: 0.24rem;
      font-weight: 600;
    }
    .address-icon {
      display: inline-block;
      width: 0.29rem;
      height: 0.29rem;
      background: url(../../assets/img/home/forward_icon.png) no-repeat;
      background-size: 100%;
      vertical-align: middle;
    }
    .call-btn {
      width: 0.72rem;
      height: 0.72rem;
      padding-left: 0.42rem;
      border-left: 0.04rem solid rgba(#000, 0.2);
      background: url(../../assets/img/home/call_icon.png) 0.42rem 0 no-repeat;
      background-size: 0.72rem 0.72rem;
    }
  }
}
.store-box {
  margin: 0 0.28rem 0.23rem;
  .store {
    width: 3.34rem;
    height: 2.84rem;
    background-image: url(../../assets/img/home/miaosha.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .store-text {
    font-size: 0.32rem;
    font-weight: 600;
    margin-top: 0.39rem;
    margin-left: 0.37rem;
  }
  .score {
    background-image: url(../../assets/img/home/integral.png);
  }
}
.member-card {
  padding: 0.5rem 0.7rem;
  background-color: #fff;
  font-size: 0.24rem;
  color: #919192;
  .my-card {
    font-size: 0.32rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 0.16rem;
  }
  .card-icon {
    width: 0.67rem;
    height: 0.64rem;
    background: url(../../assets/img/home/member_icon.png) no-repeat;
    background-size: 100%;
  }
}
</style>
