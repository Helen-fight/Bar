<template>
  <div>
    <div class="tab flex-h flex-hsb">
      <div
        class="tab-item"
        v-for="(item, index) in tab"
        :key="index"
        :class="tabIndex === index ? 'on' : ''"
        @click="tabFn(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <!--start: 存酒-->
    <div v-if="tabIndex === 0">
      <p class="note">找到房号（台号）二维码【扫一扫】存酒</p>
      <div class="scan-btn">扫一扫</div>
    </div>
    <!--end: 存酒-->
    <!--start: 取酒-->
    <div v-else-if="tabIndex === 1">
      <div class="take-box flex-h">
        <p class="take-text">自助取酒请扫房台二维码</p>
        <div class="take-scan">扫一扫</div>
      </div>

      <div class="wine-list">
        <div class="item-box" v-for="(item, index) in list" :key="index">
          <div class="wine-item flex-h flex-hsb">
            <img class="wine-img" src="" alt="" />
            <div class="wine-content">
              <p class="wine-name">
                Heineken/喜力啤酒{{ index + 1 }}<span>(支)</span>
              </p>
              <div class="flex-h flex-hsb flex-vc">
                <span>存酒数量：2</span>
                <div class="count-box flex-h">
                  <span>-</span>
                  <input class="wine-num" :value="index + 1" type="number" />
                  <span>+</span>
                </div>
              </div>
              <p class="price-box">剩余时间：20天</p>
            </div>
          </div>
          <div class="take-btn-box">
            <span class="take-btn">取酒</span>
          </div>
        </div>
      </div>
    </div>
    <!--end: 取酒-->
    <!--start: 存取记录-->
    <div class="wine-list" style="padding-bottm: 0" v-else>
      <div
        class="wine-item history flex-h flex-hsb"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="wine-img" src="" alt="" />
        <div class="wine-content">
          <div class="flex-h flex-hsb">
            <p class="wine-name">
              Heineken/喜力啤酒{{ index + 1 }}<span>(支)</span>
            </p>
            <span class="save-text">已存</span>
          </div>
          <p>存酒数量：2</p>
          <p class="price-box">剩余时间：20天</p>
        </div>
      </div>
    </div>
    <!--end: 存取记录-->
  </div>
</template>

<script>
export default {
  name: "TakeWine",
  data() {
    return {
      tab: [
        {
          id: 0,
          name: "我要存酒"
        },
        {
          id: 1,
          name: "我要取酒"
        },
        {
          id: 2,
          name: "存酒记录"
        },
        {
          id: 3,
          name: "过期酒水"
        }
      ],
      tabIndex: 0,
      list: [1, 2, 3]
    };
  },
  mounted() {
    if (this.$route.query && this.$route.query.tabIndex) {
      this.tabIndex = Number(this.$route.query.tabIndex);
    }
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
.note {
  margin-top: 4.6rem;
  font-size: 0.26rem;
  color: #353432;
  text-align: center;
}
.scan-btn {
  margin: 0.52rem 0.75rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.38rem;
  color: #fff;
  background-color: #009ce3;
  border-radius: 0.1rem;
}
.take-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  .take-text {
    width: 72%;
    background-color: #3e3e3e;
  }
  .take-scan {
    width: 28%;
    background-color: #68da6b;
  }
}
.wine-list {
  padding-top: 1.15rem;
  padding-bottom: 1rem;
  .item-box {
    margin-bottom: 0.14rem;
  }
  .wine-item {
    padding: 0.36rem;
    margin-bottom: 1px;
    background-color: #fff;
    &.history {
      margin-bottom: 0.14rem;
    }
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
    .save-text {
      font-size: 0.24rem;
      color: #a7a7a7;
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
      margin-top: 0.1rem;
    }
  }
  .take-btn-box {
    background-color: #fff;
    padding: 0.13rem 0.6rem;
    text-align: right;
    .take-btn {
      display: inline-block;
      width: 1.3rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      border-radius: 20px;
      background-color: #f88346;
      color: #fff;
    }
  }
}
</style>
