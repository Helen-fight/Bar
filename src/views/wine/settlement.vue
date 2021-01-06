<template>
  <!--酒水结算-->
  <div>
    <div class="room-box flex-h flex-hsb flex-vc">
      <p>
        当前房间号：<span class="room">{{ table }}</span>
      </p>
      <i class="room-icon" @click="backHome"></i>
    </div>
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
            <div class="count-box flex-h">
              <span>-</span>
              <input
                class="wine-num"
                v-model="item.buyNum"
                type="number"
                pattern="[0-9]*"
              />
              <span>+</span>
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
      <div class="account-btn" @click="settleFn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settlement",
  data() {
    return {
      table: "",
      list: [],
      total: []
    };
  },
  mounted() {
    if (window.sessionStorage.getItem("orderData")) {
      let orderData = JSON.parse(window.sessionStorage.getItem("orderData"));
      this.list = orderData.data;
      this.total = orderData.total;
    }
    console.log(this.list, "lll");
    this.table = window.localStorage.getItem("table");
  },
  methods: {
    backHome() {
      this.$router.replace({ path: "/" });
    }
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
      height: 20px;
    }
    .wine-name {
      margin-bottom: 0.2rem;
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
      height: 0.45rem;
      line-height: 0.45rem;
      font-size: 0.22rem;
      input {
        width: 0.6rem;
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
