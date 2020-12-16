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
        @click="goTarget(index)"
      >
        威士忌系列{{ index }}
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
          <span class="wine-title">啤酒系列{{ index }}</span>
          <span class="line"></span>
        </div>
        <div
          class="wine flex-h flex-hsb"
          v-for="(subitem, idx) in [1, 1, 1]"
          :key="idx"
          :class="idx === 0 ? 'sell-null' : ''"
        >
          <div class="wine-img-box">
            <img class="wine-img" src="" alt="" />
            <div class="wine-no" v-if="idx === 0">
              <img src="../../assets/img/wine/wine_null.png" alt="" />
            </div>
          </div>
          <div class="wine-content">
            <p class="wine-name">Heineken/喜力啤酒{{ idx }}<span>(支)</span></p>
            <div class="flex-h flex-hsb flex-vc">
              <span class="huiyuan">会员价</span>
              <div class="count-box flex-h">
                <span>-</span>
                <input class="wine-num" type="number" />
                <span>+</span>
              </div>
            </div>
            <div class="price-box flex-h flex-hsb flex-vc">
              <p><span>￥36</span><span class="origin-price">￥50.00</span></p>
              <div class="add-btn"></div>
            </div>
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
      <div class="account-btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wine",
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      menuIndex: 0,
      roomHeight: 0,
      listDom: []
    };
  },
  mounted() {
    this.roomHeight =
      document.getElementsByClassName("room-box")[0].offsetHeight + 8;
    this.listDom = document.querySelectorAll(".wine-item");
    document.addEventListener("scroll", this.onScroll);
  },
  methods: {
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
      if (document.documentElement) {
        document.documentElement.scrollTop = sTop;
      } else if (document.body) {
        document.body.scrollTop = sTop;
      } else {
        window.pageYOffset = sTop;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.onScroll);
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
  margin: 1.15rem 0.2rem 1.4rem 2.2rem;
  .wine-item {
    padding: 0.18rem;
    border-radius: 0.1rem;
    background-color: #fff;
    margin-bottom: 0.18rem;
  }
  .wine-title-box {
    font-size: 0.24rem;
    margin-bottom: 0.22rem;
    .wine-title {
      white-space: nowrap;
      flex-shrink: 0;
      margin-right: 0.36rem;
    }
    .line {
      flex: 1;
      height: 1px;
      background-color: #f2f2f2;
    }
  }
  .wine {
    padding: 0.28rem 0;
    border-bottom: 1px solid #f2f2f2;
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
      height: 0.36rem;
      line-height: 0.36rem;
      font-size: 0.22rem;
      input {
        width: 0.6rem;
        text-align: center;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
      }
      span {
        width: 0.36rem;
        text-align: center;
        color: #f88346;
      }
    }
    .price-box {
      margin-top: 0.16rem;
      color: #f88346;
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
      color: #c2c2c2;
    }
    &.sell-null .huiyuan {
      background-color: #b1b1b1;
    }
    &.sell-null .price-box {
      color: #f9c9af;
    }
    &.sell-null .origin-price {
      color: #e0e0e0;
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
