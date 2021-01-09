<template>
  <!--在线酒水-->
  <div>
    <Top :table="tableNum" />
    <div class="menu-box">
      <div
        class="menu-item"
        v-for="(item, index) in menu"
        :key="index"
        :class="index === menuIndex ? 'on' : ''"
        @click="goTarget(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="wine-list">
      <div
        class="wine-item"
        v-for="(item, index) in list"
        :key="index"
        :id="'page-' + (index + 1)"
      >
        <div class="wine-title-box flex-h flex-vc">
          <span class="wine-title">{{ item.name }}</span>
        </div>
        <div
          class="wine flex-h flex-hsb"
          v-for="(subitem, idx) in item.data"
          :key="idx"
          :class="subitem.num === '0' ? 'sell-null' : ''"
        >
          <div class="wine-img-box">
            <img class="wine-img" :src="subitem.img" alt="" />
            <div class="wine-no" v-if="subitem.num === '0'">
              <img src="../../assets/img/wine/wine_null.png" alt="" />
            </div>
          </div>
          <div class="wine-content">
            <p class="wine-name">
              {{ subitem.name }}<span> ({{ subitem.unit }})</span>
            </p>
            <div class="hy-box flex-h flex-hsb flex-vc">
              <span class="huiyuan">会员价</span>
              <div
                class="count-box flex-h flex-vc"
                v-if="subitem.buyNum > 0 || subitem.buyNum === ''"
              >
                <span @click="addNum(subitem, 'reduce')">-</span>
                <input
                  v-model="subitem.buyNum"
                  class="wine-num"
                  type="number"
                  pattern="[0-9]*"
                />
                <span @click="addNum(subitem, 'add')">+</span>
              </div>
            </div>
            <div class="price-box flex-h flex-hsb flex-vc">
              <p>
                <span>￥{{ subitem.sell_price }}</span
                ><span class="origin-price">￥{{ subitem.oriprice }}</span>
              </p>
              <div
                class="add-btn"
                v-if="subitem.buyNum === 0"
                @click="addNum(subitem, 'add')"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 1.1rem"></div>
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
import Top from "./top";
export default {
  name: "Wine",
  data() {
    return {
      menu: [],
      list: [],
      menuIndex: 0,
      roomHeight: 0,
      listDom: [],
      tableNum: "",
      lastNum: 0 // 保存商品上一个购买数量
    };
  },
  components: {
    Top
  },
  computed: {
    total() {
      let arr = [0, 0];
      for (var i = 0, len = this.list.length; i < len; i++) {
        if (this.list[i].data.length > 0) {
          this.list[i].data.forEach(item => {
            arr[0] = arr[0] + Number(item.sell_price) * item.buyNum;
            arr[1] = arr[1] + Number(item.oriprice) * item.buyNum;
          });
        }
      }
      return arr;
    }
  },
  mounted() {
    this.tableNum = window.localStorage.getItem("table");
    this.getdata();
  },
  methods: {
    getdata() {
      //  获取酒水列表
      let that = this;
      this.request({
        url: "/api/v1/product/index",
        loading: true,
        successFn(res) {
          if (res.data.length) {
            let orderData = window.sessionStorage.getItem("orderData")
              ? JSON.parse(window.sessionStorage.getItem("orderData"))
              : null;
            res.data.forEach(item => {
              if (item.data.length) {
                item.data.forEach(subitem => {
                  if (orderData && orderData.length) {
                    that.setBuynum(orderData, subitem);
                  } else {
                    subitem.buyNum = 0;
                  }
                });
              }
              that.menu.push(item.name);
            });
            that.list = res.data;
          }
          that.initScroll();
        }
      });
    },
    setBuynum(data, item) {
      let count = 0;
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === item.id) {
          item.buyNum = data[i].buyNum;
          break;
        }
        count++;
      }
      if (count === data.length) item.buyNum = 0;
    },
    addNum(item, type) {
      if (Number(item.num) === 0) return; // 卖完了
      if (type === "add") {
        item.buyNum++;
      } else if (type === "reduce") {
        item.buyNum--;
      }
    },
    initScroll() {
      this.roomHeight =
        document.getElementsByClassName("room-box")[0].offsetHeight + 8;
      this.listDom = document.querySelectorAll(".wine-item");
      document.addEventListener("scroll", this.onScroll);
    },
    menuFn(index) {
      this.menuIndex = index;
    },
    onScroll() {
      let dom_scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      var viewHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight; // 可视区高度
      var docHeight = document.getElementsByClassName("wine-list")[0]
        .offsetHeight; //文档的总高度
      this.listDom.forEach((item, index) => {
        if (dom_scrollTop >= item.offsetTop - this.roomHeight - 10) {
          this.menuIndex = index;
        }
        if (dom_scrollTop + viewHeight >= docHeight) {
          this.menuIndex = this.listDom.length - 1;
        }
      });
    },
    //点击进行锚点定位
    goTarget(index) {
      if (this.menuIndex === index) return false;
      var name = "#page-" + (index + 1); //需要跳转的id
      let target = document.querySelector("body");
      var anchor = this.$el.querySelector(name);
      this.menuIndex = index;
      let sTop = anchor.offsetTop - this.roomHeight;
      document.body.scrollTop = sTop;
      /* if (document.body) {
        document.body.scrollTop = sTop;
      } else if (document.documentElement) {
        document.documentElement.scrollTop = sTop;
      } else {
        window.pageYOffset = sTop;
      } */
    },
    settleFn() {
      if (this.total[0] === 0) {
        this.$toast("请先点酒下单");
        return;
      }
      let arr = this.getBuyWine();
      window.sessionStorage.setItem("orderData", JSON.stringify(arr));
      this.$router.push("/settlement");
    },
    getBuyWine() {
      let arr = [];
      for (let i = 0, len = this.list.length; i < len; i++) {
        if (this.list[i].data.length > 0) {
          this.list[i].data.forEach(item => {
            if (item.buyNum !== 0) arr.push(item);
          });
        }
      }
      return arr;
    }
  },
  beforeRouteLeave(to, from, next) {
    // 把买的数量不为0的添加到缓存
    if (to.path !== "/settlement") {
      let arr = this.getBuyWine();
      if (arr.length > 0)
        window.sessionStorage.setItem("orderData", JSON.stringify(arr));
    }
    next();
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
.wine-list {
  margin: 1.15rem 0.2rem 0 2.2rem;
  .wine-item {
    padding: 0.18rem;
    border-radius: 0.1rem;
    color: #fff;
    margin-bottom: 0.1rem;
  }
  .wine-title-box {
    padding-top: 2px;
    font-size: 0.24rem;
    margin-bottom: 0.22rem;
    .wine-title {
      white-space: nowrap;
      flex-shrink: 0;
      margin-right: 0.36rem;
    }
  }
  .wine {
    padding: 0.22rem 0;
    border-bottom: 1px solid#070707;
    .wine-img-box {
      position: relative;
      width: 1.4rem;
      height: 1.4rem;
    }
    .wine-no {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(#b1b1b1, 0.7);
      img {
        width: 0.89rem;
        height: 0.89rem;
        margin-top: 0.25rem;
        margin-left: 0.25rem;
      }
    }
    .wine-img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      background-color: pink;
    }
    .wine-content {
      width: 3.2rem;
    }
    .wine-name {
      height: 0.32rem;
      margin-top: 0.08rem;
      line-height: 0.32rem;
      margin-bottom: 0.12rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        color: #ff314f;
      }
    }
    .hy-box {
      height: 0.42rem;
      margin-bottom: 0.12rem;
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
      font-size: 0.22rem;
      border-radius: 2px;
      input {
        width: 0.6rem;
        text-align: center;
        height: 0.42rem;
        line-height: 0.42rem;
        vertical-align: middle;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        background-color: #121212;
        color: #fff;
      }
      span {
        width: 0.4rem;
        text-align: center;
        color: #ff314f;
      }
    }
    .price-box {
      color: #ff314f;
      height: 0.28rem;
    }
    .origin-price {
      margin-left: 5px;
      font-size: 0.24rem;
      color: #959595;
      text-decoration: line-through;
    }
    .add-btn {
      width: 0.42rem;
      height: 0.42rem;
      background-image: url(../../assets/img/wine/add_btn.png);
      background-repeat: no-repeat;
      background-size: 100%;
    }
    &.sell-null .wine-name,
    &.sell-null .wine-name span {
      color: #2a2a2a;
    }
    &.sell-null .huiyuan {
      background-color: #2a2a2a;
    }
    &.sell-null .price-box {
      color: #7d212f;
    }
    &.sell-null .origin-price {
      color: #8c8c8c;
    }
    &.sell-null .add-btn {
      background-image: url(../../assets/img/wine/add_btn_null.png);
    }
  }
}
.menu-box {
  position: fixed;
  left: 0.19rem;
  top: 1.15rem;
  bottom: 1.4rem;
  width: 1.9rem;
  padding: 0.2rem 0;
  background-color: #070707;
  border-radius: 0.1rem;
  overflow-y: scroll;
  .menu-item {
    padding: 0.3rem 0;
    padding-left: 0.2rem;
    font-size: 0.24rem;
    color: #8e8e8e;
    &.on {
      position: relative;
      background-color: #121212;
      color: #ff314f;
    }
    &.on::before {
      position: absolute;
      left: 2px;
      top: 0.42rem;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #ff314f;
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
  background: #070707;
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
