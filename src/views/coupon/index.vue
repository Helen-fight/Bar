<template>
  <!--优惠券-->
  <div>
    <div class="tab flex-h flex-hsb">
      <div
        class="tab-item"
        v-for="(item, index) in tab"
        :key="index"
        :class="tabIndex === index ? 'on' : ''"
        @click="tabFn(index)"
      >
        {{ item.name + "(" + item.num + ")" }}
      </div>
    </div>
    <div class="coupon-list">
      <div
        class="coupon-item flex-h flex-hsb flex-vc"
        v-for="(item, index) in list"
        :key="index"
      >
        <div>
          <div class="flex-h flex-vc">
            <i class="coupon-icon"></i>
            <div>
              <p class="coupon-price">5元代金券</p>
              <p>满50减5</p>
            </div>
          </div>
          <p class="validity">领取后当天生效，有效期9天</p>
        </div>
        <div class="get-box">
          <div class="get-btn" :class="index % 2 === 0 ? 'used' : ''">
            立即领取
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  data() {
    return {
      tab: [
        {
          id: 0,
          name: "未领取",
          num: 2
        },
        {
          id: 1,
          name: "未使用",
          num: 2
        },
        {
          id: 2,
          name: "已使用",
          num: 2
        },
        {
          id: 3,
          name: "已过期",
          num: 2
        }
      ],
      tabIndex: 0,
      list: [1, 2, 3, 4, 5, 6]
    };
  },
  methods: {
    tabFn(index) {
      this.tabIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 0.3rem;
  height: 0.9rem;
  background-color: #fff;
  .tab-item {
    padding-top: 0.36rem;
    padding-bottom: 0.23rem;
    border-bottom: 2px solid #fff;
    color: #999;
    &.on {
      color: #222;
      border-bottom: 2px solid #f88346;
    }
  }
}
.coupon-list {
  margin: 1.2rem 0.3rem 0;
  .coupon-item {
    padding: 0.32rem 0.28rem 0.23rem;
    background-color: #fff;
    margin-bottom: 0.26rem;
    color: #999;
    .coupon-icon {
      width: 0.65rem;
      height: 0.65rem;
      background: url(../../assets/img/coupon.png) no-repeat;
      background-size: 100%;
      margin-right: 0.32rem;
    }
    .coupon-price {
      font-size: 0.34rem;
      color: #222;
      font-weight: 600;
      margin-bottom: 0.28rem;
    }
    .validity {
      margin-top: 0.23rem;
      font-size: 0.22rem;
    }
    .get-box {
      height: 1.2rem;
      padding-left: 0.23rem;
      border-left: 1px dashed #ddd;
      .get-btn {
        width: 1.8rem;
        height: 0.6rem;
        margin-top: 0.3rem;
        line-height: 0.6rem;
        text-align: center;
        color: #fff;
        background: linear-gradient(0deg, #ffc000, #ff9329);
        border-radius: 22px;
        &.used {
          background: linear-gradient(0deg, #e9e9e9, #adadad);
        }
      }
    }
  }
}
</style>
