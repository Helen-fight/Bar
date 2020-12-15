<template>
  <div>
    <div class="room-box flex-h flex-hsb flex-vc">
      <p>当前房间号：<span class="room">C18</span></p>
      <i class="room-icon"></i>
    </div>
    <div class="menu-box">
      <div
        class="menu-item"
        v-for="(item, index) in list"
        :key="index"
        :class="index === menuIndex ? 'on' : ''"
        @click="menuFn(index)"
      >
        威士忌系列{{ index }}
      </div>
    </div>
    <div class="wine-list"></div>
    <div class="account-box flex-h flex-hsb flex-vc">
      <div class="flex-h flex-vc">
        <span>合计：</span>
        <div>
          <p class="price">￥8100</p>
          <p class="origin-text">原价<span>￥9600</span></p>
        </div>
      </div>
      <div class="account-btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wine",
  data() {
    return {
      list: [1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      menuIndex: 0
    };
  },
  methods: {
    menuFn(index) {
      this.menuIndex = index;
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
  background-color: #fff;
  font-size: 0.32rem;
  .room {
    color: #f88346;
  }
  .room-icon {
    width: 0.42rem;
    height: 0.42rem;
    background: url(../../assets/img/wine_icon.png) no-repeat;
    background-size: 100%;
  }
}
.wine-list {
  margin: 1.15rem 0.2rem 1.4rem 2.2rem;
  background-color: #fff;
}
.menu-box {
  position: fixed;
  left: 0.19rem;
  top: 1.15rem;
  bottom: 1.4rem;
  width: 1.9rem;
  padding: 0.2rem 0;
  background-color: #fff;
  border-radius: 0.1rem;
  overflow-y: scroll;
  .menu-item {
    padding: 0.3rem 0;
    padding-left: 0.2rem;
    font-size: 0.24rem;
    color: #8e8e8e;
    &.on {
      position: relative;
      background-color: #f5f5f5;
      color: #f88346;
    }
    &.on::before {
      position: absolute;
      left: 2px;
      top: 0.42rem;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #f88346;
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
