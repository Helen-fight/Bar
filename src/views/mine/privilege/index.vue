<template>
  <!--我的专属特权-->
  <div>
    <div class="privilege-no" v-if="!privilege">
      <div class="privilege-no-icon"></div>
      <p>您还没有开通专属特权</p>
    </div>
    <div class="privilege-box" v-else>
      <div class="contain">
        <div class="main">
          <div class="flex-h flex-vc">
            <span class="icon-crown"></span>
            <span class="big-title">黄金会员卡</span>
          </div>

          <div class="desc-title">特权说明</div>
          <div class="desc-main">
            100元/张，一年有效期。<br />
            1.可享受2-4楼房费会员折扣.<br />
            2.可购买超市会员酒水套餐.<br />
            3.享受会员生日赠送及免费布置.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Privilege",
  data() {
    return {
      privilege: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@mixin bgImg($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100%;
}
.privilege-no {
  font-size: 0.26rem;
  text-align: center;
  .privilege-no-icon {
    width: 1.5rem;
    height: 1.36rem;
    @include bgImg("../../../assets/img/mine/nodata.png");
    margin: 2.8rem auto 0.32rem;
  }
}
.privilege-box {
  margin: 0.8rem 0.2rem;
  .contain {
    width: 100%;
    height: 3.74rem;
    @include bgImg("../../../assets/img/mine/memberCard/goldCard.png");
    .main {
      padding: 0.5rem;
      font-size: 0.24rem;
      .icon-crown {
        width: 0.44rem;
        height: 0.44rem;
        @include bgImg("../../../assets/img/mine/myCard/icon-gold-crown.png");
        margin-right: 0.11rem;
      }
      .big-title {
        font-size: 0.48rem;
        font-weight: bold;
        color: #000;
      }
      .desc-title {
        margin: 0.3rem 0 0.26rem 0.6rem;
        font-size: 0.32rem;
        font-weight: bold;
      }
      .desc-main {
        margin-left: 0.6rem;
        line-height: 0.42rem;
      }
    }
  }
}
</style>
