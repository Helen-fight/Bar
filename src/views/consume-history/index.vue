<template>
  <div class="consume-list">
    <div class="consume-item-box" v-for="(item, index) in list" :key="index">
      <div class="consume-item flex-h flex-hsb flex-vc">
        <div>
          <p>日期：2020.12.16</p>
          <p>消费金额：1990元</p>
        </div>
        <div
          class="detail-btn"
          :class="item.show ? 'show' : ''"
          @click="showDetail(index)"
        >
          详情
        </div>
      </div>
      <div class="detail-box" :class="item.show ? 'show' : ''">
        <div class="beer flex-h flex-hsb">
          <span>啤酒3瓶</span>
          <span>180元</span>
        </div>
        <div class="beer flex-h flex-hsb">
          <span>红酒5瓶</span>
          <span>200元</span>
        </div>
        <div class="beer flex-h flex-hsb">
          <span>威士忌6瓶</span>
          <span>800元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConsumeHistory",
  data() {
    return {
      list: [{ show: false }, { show: false }, { show: false }]
    };
  },
  methods: {
    showDetail(index) {
      this.list[index].show = !this.list[index].show;
    }
  }
};
</script>

<style lang="scss" scoped>
.consume-list {
  margin: 0.28rem 0.3rem 0;
  .consume-item-box {
    margin-bottom: 0.2rem;
  }
  .consume-item {
    padding: 0.36rem 0.4rem;
    line-height: 0.52rem;
    margin-bottom: 2px;
    background-color: #fff;
  }
  .detail-btn {
    width: 1.8rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border: 1px solid #f88346;
    border-radius: 22px;
    color: #f88346;
    background-image: url(../../assets/img/forward_icon.png);
    background-position: 1.3rem center;
    background-repeat: no-repeat;
    background-size: 0.1rem 0.18rem;
    &.show {
      background-image: url(../../assets/img/forward_icon2.png);
      background-size: 0.18rem 0.1rem;
    }
  }
  .detail-box {
    max-height: 0;
    background-color: #fff;
    overflow: hidden;
    transition: max-height 0.3s;
    -webkit-transition: max-height 0.3s;
    .beer {
      padding: 0 0.42rem;
      margin: 0.36rem 0;
    }
    &.show {
      max-height: 420px;
    }
  }
}
</style>
