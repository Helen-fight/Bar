<template>
  <!--酒水结算-->
  <div>
    <Top :table="table" />
    <div class="wine-list">
      <div
        class="wine-item flex-h flex-hsb"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="wine-img" :src="item.img" alt="" />
        <div class="wine-content">
          <p class="wine-name">
            {{ item.name }}<span> ({{ item.unit }})</span>
          </p>
          <div class="flex-h flex-hsb flex-vc">
            <span class="huiyuan">会员价</span>
            <div class="count-box flex-h flex-vc">
              <span @click="addNum(item, 'reduce')">-</span>
              <input
                class="wine-num"
                v-model="item.buyNum"
                disabled
                type="number"
                pattern="[0-9]*"
              />
              <span @click="addNum(item, 'add')">+</span>
            </div>
          </div>
          <div class="price-box">
            <p>
              <span>￥{{ item.sell_price }}</span
              ><span class="origin-price">￥{{ item.oriprice }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="account-box flex-h flex-hsb flex-vc">
      <div class="flex-h flex-vc">
        <span>合计：</span>
        <div>
          <p class="price">￥{{ total[0] }}</p>
          <p class="origin-text">
            原价<span>￥{{ total[1] }}</span>
          </p>
        </div>
      </div>
      <div class="account-btn" @click="settleEvent">下单</div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import Top from "./top";
export default {
  name: "Settlement",
  data() {
    return {
      table: "",
      list: []
    };
  },
  components: {
    Top
  },
  computed: {
    total() {
      let arr = [0, 0];
      this.list.forEach(item => {
        arr[0] = (
          Number(arr[0]) +
          Number(item.sell_price) * item.buyNum
        ).toFixed(2);
        arr[1] = (Number(arr[1]) + Number(item.oriprice) * item.buyNum).toFixed(
          2
        );
      });
      return arr;
    }
  },
  mounted() {
    if (window.sessionStorage.getItem("orderData")) {
      let orderData = JSON.parse(window.sessionStorage.getItem("orderData"));
      this.list = orderData;
    }
    this.table = window.localStorage.getItem("table");
  },
  methods: {
    backHome() {
      this.$router.replace({ path: "/" });
    },
    addNum(item, type) {
      if (type === "add") {
        if (item.buyNum > Number(item.num)) {
          this.$toast("库存告急，小二已快马加班备货中");
          return;
        }
        item.buyNum++;
      } else if (type === "reduce") {
        if (item.buyNum > 0) item.buyNum--;
      }
    },
    settleEvent() {
      let that = this;
      if (this.total[0] === 0) {
        this.$toast("清先点酒再下单");
        return;
      }
      this.$messagebox
        .confirm("确定下单吗", "下单提示")
        .then(action => {
          if (action === "confirm") {
            let arr = [];
            that.list.forEach(item => {
              if (item.buyNum !== 0) {
                let obj = {
                  id: item.id,
                  num: item.buyNum
                };
                arr.push(obj);
              }
            });
            that.request({
              url: "/api/v1/product/buy",
              data: {
                detail: arr,
                table_num: this.table
              },
              loading: true,
              successFn(res) {
                that.request({
                  url: "/api/v1/pay/pay",
                  data: {
                    orderid: res.data.orderid,
                    type: 2 // 1会员，2商品
                  },
                  successFn(response) {
                    let pay = response.data;
                    wx.chooseWXPay({
                      timestamp: pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                      nonceStr: pay.nonceStr, // 支付签名随机串，不长于 32 位
                      package: pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                      signType: pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      paySign: pay.paySign, // 支付签名
                      success: function(res2) {
                        // 支付成功后的回调函数
                        that.$toast("支付成功！");
                        window.sessionStorage.removeItem("orderData");
                        that.$router.replace("/consume-history");
                      }
                    });
                  }
                });
              }
            });
          }
        })
        .catch(() => {});
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/consume-history") {
      window.sessionStorage.setItem("orderData", JSON.stringify(this.list));
    }
    next();
  }
};
</script>

<style lang="scss" scoped>
.room-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  padding: 0 0.45rem;
  height: 1rem;
  background-color: #070707;
  font-size: 0.32rem;
  z-index: 3;
  color: #fff;
  .room {
    color: #ff314f;
  }
  .room-icon {
    width: 0.42rem;
    height: 0.42rem;
    background: url(../../assets/img/wine/icon_back_home.png) no-repeat;
    background-size: 100%;
  }
}
.wine-list {
  margin-top: 1.14rem;
  padding-bottom: 1.4rem;
  .wine-item {
    padding: 0.36rem;
    margin-bottom: 0.14rem;
    background-color: #070707;
    color: #fff;
    .wine-img {
      width: 1.4rem;
      height: 1.4rem;
      background-color: pink;
      border-radius: 3px;
    }
    .wine-content {
      width: 5.1rem;
    }
    .wine-name {
      padding-top: 4px;
      margin-bottom: 0.12rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        color: #ff314f;
      }
    }
    .huiyuan {
      width: 1rem;
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      font-size: 0.22rem;
      color: #fff;
      background-color: #ff314f;
    }
    .count-box {
      border: 1px solid #ddd;
      height: 0.4rem;
      font-size: 0.22rem;
      border-radius: 2px;
      input {
        width: 0.6rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        background-color: #070707;
        color: #fff;
      }
      span {
        width: 0.45rem;
        text-align: center;
        color: #ff314f;
      }
    }
    .price-box {
      margin-top: 0.12rem;
      color: #ff314f;
    }
    .origin-price {
      margin-left: 5px;
      font-size: 0.24rem;
      color: #959595;
      text-decoration: line-through;
    }
  }
}
.account-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 0.45rem;
  height: 1.2rem;
  background: #121212;
  color: #fff;
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.15);
  .price {
    font-size: 0.34rem;
    color: #ff314f;
    margin-bottom: 0.12rem;
  }
  .origin-text {
    color: #959595;
    span {
      text-decoration: line-through;
    }
  }
  .account-btn {
    width: 2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.34rem;
    color: #fff;
    background-color: #ff314f;
    border-radius: 22px;
  }
}
</style>
