<template>
  <div>
    <div class="mine-head">
      <div class="photo-box flex-h flex-vc">
        <img class="photo" src="" alt="" />
        <p>樱桃小丸子</p>
      </div>
      <div class="head-menu flex-h flex-hsb">
        <div
          class="head-menu-item"
          v-for="(item, index) in menuTop"
          :key="index"
          @click="goto(item.path)"
        >
          <i class="order-icon" :class="item.icon"></i>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="menu-box">
      <div
        class="menu-item flex-h flex-hsb flex-vc"
        v-for="(item, index) in menu"
        :key="index"
        @click="goto(item.path)"
      >
        <div class="flex-h flex-vc">
          <i class="menu-icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </div>
        <i class="right-icon"></i>
      </div>
    </div>
    <div class="menu-box">
      <div class="menu-item flex-h flex-hsb flex-vc">
        <div class="flex-h flex-vc">
          <i class="menu-icon friend-icon"></i>
          <span>我的好友</span>
        </div>
        <i class="right-icon"></i>
      </div>
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
import Tabbar from "../../components/tabbar.vue";
import { MessageBox } from "mint-ui";
export default {
  name: "Mine",
  data() {
    return {
      menuTop: [
        {
          id: 0,
          path: "",
          name: "我的订单",
          icon: ""
        },
        {
          id: 1,
          path: "",
          name: "我的验证码",
          icon: "code-icon"
        },
        {
          id: 2,
          path: "",
          name: "我的会员卡",
          icon: "member-icon"
        }
      ],
      menu: [
        {
          id: 0,
          path: "/coupon",
          name: "我的优惠卡包",
          icon: ""
        },
        {
          id: 1,
          path: "",
          name: "我的专属特权",
          icon: "tequan-icon"
        },
        {
          id: 2,
          path: "/consume-history",
          name: "消费历史订单",
          icon: "history-icon"
        },
        {
          id: 3,
          path: "",
          name: "我的存酒记录",
          icon: "save-icon"
        }
      ]
    };
  },
  components: {
    tabbar
  },
  methods: {
    goto(path) {
      if (path === "") {
        MessageBox.alert("功能开发中，敬请期待", "提示");
        return false;
      }
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin bgImg($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100%;
}
.mine-head {
  background-color: #fff;
  margin-bottom: 0.18rem;
  .photo-box {
    padding: 0.3rem 0.42rem 0.5rem;
    font-size: 0.38rem;
    font-weight: 600;
    .photo {
      width: 1.3rem;
      height: 1.3rem;
      background-color: pink;
      border-radius: 50%;
      margin-right: 0.24rem;
    }
  }
  .head-menu {
    padding: 0.2rem 0.7rem;
    .head-menu-item {
      font-size: 0.24rem;
      text-align: center;
    }
    .order-icon {
      display: inline-block;
      width: 0.56rem;
      height: 0.56rem;
      @include bgImg("../../assets/img/mine/mine_icon5.png");
      margin-bottom: 0.12rem;
    }
    .code-icon {
      background-image: url(../../assets/img/mine/mine_icon9.png);
    }
    .member-icon {
      background-image: url(../../assets/img/mine/mine_icon7.png);
    }
  }
}
.menu-box {
  background-color: #fff;
  margin-bottom: 0.39rem;
  .menu-item {
    padding: 0.28rem 0.35rem;
  }
  .menu-icon {
    width: 0.48rem;
    height: 0.48rem;
    margin-right: 2px;
    @include bgImg("../../assets/img/mine/mine_icon10.png");
  }
  .right-icon {
    width: 0.09rem;
    height: 0.18rem;
    @include bgImg("../../assets/img/mine/mine_icon3.png");
  }
  .tequan-icon {
    background-image: url(../../assets/img/mine/mine_icon11.png);
  }
  .save-icon {
    background-image: url(../../assets/img/mine/mine_icon1.png);
  }
  .history-icon {
    background-image: url(../../assets/img/mine/mine_icon2.png);
  }
  .friend-icon {
    background-image: url(../../assets/img/mine/mine_icon6.png);
  }
}
</style>
