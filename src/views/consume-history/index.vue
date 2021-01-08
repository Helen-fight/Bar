<template>
  <!--消费记录-->
  <div>
    <div
      class="consume-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      v-if="list.length > 0"
    >
      <div class="consume-item-box" v-for="(item, index) in list" :key="index">
        <div class="consume-item flex-h flex-hsb flex-vc">
          <div>
            <p>日期：{{ item.add_time }}</p>
            <p>消费金额：{{ item.sell_price }}元</p>
          </div>
          <div
            class="detail-btn flex-h flex-hc flex-vc"
            @click="showDetail(index)"
          >
            <span>详情</span>
            <i class="icon-forward" :class="item.show ? 'show' : ''"></i>
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
    <p v-else class="no-data">暂无消费记录</p>
  </div>
</template>

<script>
export default {
  name: "ConsumeHistory",
  data() {
    return {
      list: [],
      pn: 1,
      loading: true,
      hasmore: true
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      let that = this;
      if (!this.hasmore) return;
      this.request({
        url: "/api/v1/product/order_list",
        loading: true,
        data: {
          page: this.pn
        },
        successFn(res) {
          console.log(res, "订单列表");
          if (res.data.length != 0) {
            res.data.forEach(item => {
              item.show = false;
            });
            that.pn++;
            that.list = that.list.concat(res.data);
          } else {
            if (that.pn !== 1) {
              that.$toast("已无更多数据");
              that.hasmore = false;
            }
          }
        }
      });
    },
    showDetail(index) {
      this.list[index].show = !this.list[index].show;
    }
  }
};
</script>

<style lang="scss" scoped>
.consume-list {
  margin: 0.28rem 0.2rem 0;
  .consume-item-box {
    margin-bottom: 0.2rem;
  }
  .consume-item {
    padding: 0.36rem 0.12rem;
    line-height: 0.52rem;
    margin-bottom: 2px;
    background-color: #070707;
    color: #fff;
  }
  .detail-btn {
    width: 1.8rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border: 1px solid #ff314f;
    border-radius: 22px;
    color: #ff314f;
    .icon-forward {
      width: 0.1rem;
      height: 0.18rem;
      margin-left: 0.16rem;
      margin-top: 2px;
      background: url(../../assets/img/forward_icon.png) no-repeat;
      background-size: 100%;
      transition: rotate ease 0.5s;
      &.show {
        transform: rotate(90deg);
      }
    }
  }
  .detail-box {
    max-height: 0;
    background-color: #070707;
    color: #fff;
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
.no-data {
  margin-top: 5rem;
  text-align: center;
  color: #fff;
}
</style>
