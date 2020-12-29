<template>
  <div class="memberCard-wrap">
    <div class="title">申请会员卡</div>
    <div class="item" v-for="item in cardList" :key="item.id">
      <div class="flex-h flex-hsb">
        <div class="sub-title">
          开通黄金卡赠送金额：<span class="f-36 c-orange">100000</span>元
        </div>
        <div
          class="sub-title flex-h flex-vc"
          @click="item.showDetail = !item.showDetail"
        >
          <span>详情</span><i class="icon-right"></i>
        </div>
      </div>
      <ul class="flex-h flex-wrap detail" v-show="item.showDetail">
        <li>默认账户：<span class="c-orange">10000</span>元</li>
        <li>综合金额：<span class="c-orange">0</span>元</li>
        <li>酒水账户：<span class="c-orange">0</span>元</li>
        <li>房台账户：<span class="c-orange">0</span>元</li>
        <li>赠送积分：<span class="c-orange">1000</span>分</li>
      </ul>
      <div class="contain">
        <div class="main">
          <div class="flex-h flex-hsb flex-vc">
            <div class="flex-h flex-vc">
              <span class="icon-crown"></span>
              <span class="big-title">黄金会员卡</span>
            </div>
            <span class="btn" @click="applyCard(item)">去申请</span>
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

    <!-- 弹窗 -->
    <mt-popup
      v-model="showPopup"
      position="bottom"
      style="width: 100%; border-radius: .2rem .2rem 0 0;"
    >
      <div class="popup-container" slot>
        <div class="popup-header">
          <div class="flex-h flex-vc">
            <span class="icon-crown"></span>
            <span class="big-title">申请黄金卡</span>
            <span class="f-bold c-orange"
              ><span class="f-46">1000</span>元/张</span
            >
          </div>
          <span class="icon-close" @click="showPopup = false"></span>
        </div>
        <div class="popup-main">
          <div class="flex-h flex-vc">
            <div class="f-bold label">用卡保障：</div>
            <div class="value">申请后立即获得权限</div>
          </div>
          <div class="flex-h flex-vc">
            <div class="f-bold label">贵宾邀请码：</div>
            <div class="value">
              <input
                class="invite-code"
                type="text"
                v-model="inviteCode"
                placeholder="点击输入贵宾邀请码"
              />
            </div>
          </div>
          <div class="flex-h flex-vc">
            <div class="f-bold label">黄金卡说明：</div>
            <div class="value">永久/无需续费</div>
          </div>
          <div class="flex-h flex-vc">
            <div class="f-bold label">生效日期：</div>
            <div class="c-orange value">即买即生效</div>
          </div>
          <div class="btn-pay" @click="getWXPay">微信支付</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  name: "MemberCard",
  data() {
    return {
      showPopup: false,
      popup: {
        title: '黄金卡',
        price: 1000
      },
      inviteCode: "",
      cardList: [
        {
          id: 1,
          showDetail: false,
          title: "黄金会员卡"
        },
        {
          id: 2,
          showDetail: false,
          title: "白金会员卡"
        },
        {
          id: 3,
          showDetail: false,
          title: "至尊会员卡"
        }
      ]
    };
  },
  methods: {
    goto(path) {
      if (path === "") {
        MessageBox.alert("功能开发中，敬请期待", "提示");
        return false;
      }
      this.$router.push(path);
    },
    applyCard(item) {
      this.showPopup = true;
      this.inviteCode = "";
    },
    getWXPay(){

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
.c-orange {
  color: #fda251;
}
.f-46 {
  font-size: 0.46rem;
}
.f-bold {
  font-weight: bold;
}
.flex-wrap {
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.memberCard-wrap {
  padding: 0 0.2rem 0.3rem;
  min-height: 100vh;
  background-color: #222;
  .c-orange {
    color: #ff912d;
  }
  .f-36 {
    font-size: 0.36rem;
  }
  .item {
    padding: 0.5rem 0 0.1rem 0;
  }
  .title {
    padding: 0.5rem 0 0 0.3rem;
    font-size: 0.4rem;
    font-weight: 500;
    color: #fff;
  }
  .sub-title {
    margin: 0 0.22rem;
    font-size: 0.24rem;
    color: #cacaca;
    .icon-right {
      width: 0.09rem;
      height: 0.18rem;
      margin-left: 0.1rem;
      background-image: url("../../../assets/img/mine/mine_icon3.png");
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
  .detail {
    margin: 0.24rem 0.3rem 0 0.3rem;
    padding: 0.1rem 0;
    background-color: #000;
    > li {
      margin: 0.1rem 0;
      width: 50%;
      font-size: 0.24rem;
      color: #cacaca;
      &::before {
        content: "";
        display: inline-block;
        margin: 0 0.12rem;
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        background-color: #ff912d;
        vertical-align: middle;
      }
    }
  }
  .contain {
    margin: 0.2rem 0 0 0;
    width: 100%;
    height: 3.74rem;
    @include bgImg("../../../assets/img/mine/memberCard/goldCard.png");
    .main {
      padding: 0.4rem 0.5rem;
      font-size: 0.24rem;
      color: #222;
      line-height: 0.3rem;
      .icon-crown {
        display: inline-block;
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.11rem;
        @include bgImg("../../../assets/img/mine/myCard/icon-gold-crown.png");
      }
      .big-title {
        font-size: 0.48rem;
        line-height: 0.48rem;
        font-weight: bold;
        color: #000;
      }
      .btn {
        width: 1.6rem;
        height: 0.56rem;
        line-height: 0.56rem;
        color: #000;
        border-radius: 0.28rem;
        background-color: #f8e9c1;
        text-align: center;
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
  // 弹窗
  .popup-container {
    min-height: 3.5rem;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .popup-header {
    position: relative;
    padding: 0.36rem 0.2rem;
    min-height: 0.5rem;
    border-bottom: solid 1px #f2f2f2;
    border-radius: 0.2rem 0.2rem 0 0;
    .icon-crown {
      margin-right: 0.15rem;
    }
    .big-title {
      font-size: 0.38rem;
    }
    .icon-close {
      position: absolute;
      right: 0.32rem;
      top: 0.32rem;
      width: 0.48rem;
      height: 0.48rem;
      border: solid 1px #b9b9b9;
      border-radius: 50%;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.3rem;
        height: 1px;
        margin-left: -0.15rem;
        background-color: #b9b9b9;
        transform: rotate(45deg);
        transform-origin: center;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.3rem;
        height: 1px;
        margin-left: -0.15rem;
        background-color: #b9b9b9;
        transform: rotate(-45deg);
        transform-origin: center;
      }
    }
  }
  .popup-main {
    padding: 0.2rem 0;
    > div {
      margin: 0.3rem 0.48rem;
      font-weight: 0.28rem;
      color: #222;
      .invite-code {
        height: 0.64rem;
        line-height: 0.64rem;
        padding-left: 0.16rem;
        background-color: #f2f2f2;
        border: solid 1px #cacaca;
        border-radius: 0.04rem;
      }
    }
    .btn-pay {
      margin: 0.54rem auto;
      width: 6.6rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.32rem;
      color: #fff;
      text-align: center;
      border-radius: 0.5rem;
      background: #58c665;
    }
  }
}
</style>
