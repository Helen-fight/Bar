<template>
  <!--酒水结算-->
  <div>
    <div class="room-box flex-h flex-hsb flex-vc">
      <p>当前房间号：<span class="room">C18</span></p>
      <i class="room-icon"></i>
    </div>
    <div class="wine-list">
      <div
        class="wine-item flex-h flex-hsb"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="wine-img" src="" alt="" />
        <div class="wine-content">
          <p class="wine-name">
            Heineken/喜力啤酒{{ index + 1 }}<span>(支)</span>
          </p>
          <div class="flex-h flex-hsb flex-vc">
            <span class="huiyuan">会员价</span>
            <div class="count-box flex-h">
              <span>-</span>
              <input class="wine-num" :value="index + 1" type="number" />
              <span>+</span>
            </div>
          </div>
          <div class="price-box">
            <p><span>￥36</span><span class="origin-price">￥50.00</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="account-box flex-h flex-hsb flex-vc">
      <div class="flex-h flex-vc">
        <span>合计：</span>
        <div>
          <p class="price">￥8100</p>
          <p class="origin-text">原价<span>￥9600</span></p>
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
      list: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  methods: {}
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
  background-color: #fff;
  font-size: 0.32rem;
  z-index: 3;
  .room {
    color: #f88346;
  }
  .room-icon {
    width: 0.42rem;
    height: 0.42rem;
    background: url(../../assets/img/wine/wine_icon.png) no-repeat;
    background-size: 100%;
  }
}
.wine-list {
  margin-top: 1.14rem;
  margin-bottom: 1.4rem;
  .wine-item {
    padding: 0.36rem;
    margin-bottom: 0.14rem;
    background-color: #fff;
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
        color: #f88346;
      }
    }
    .huiyuan {
      width: 1rem;
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      font-size: 0.22rem;
      color: #fff;
      background-color: #f88346;
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
      }
      span {
        width: 0.45rem;
        text-align: center;
        color: #f88346;
      }
    }
    .price-box {
      margin-top: 0.12rem;
      color: #f88346;
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
  background: #fff;
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.15);
  .price {
    font-size: 0.34rem;
    color: #f88346;
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
    background-color: #f88346;
    border-radius: 22px;
  }
}
</style>
