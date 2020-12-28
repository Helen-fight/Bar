<template>
  <div>
    <div class="mine-wrap">
      <div class="photo-box flex-h flex-vc">
        <img class="photo" src="" alt="" />
        <span>樱桃小丸子</span>
      </div>
      <div class="menu flex-h flex-hsb">
        <div class="menu-item flex-h flex-hc flex-vc" v-for="(item,index) in menu" :key="index" @click="goto(item.path)">
          <i class="home-icon" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="logo"></div>
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  name: "Mine",
  data() {
    return {
      menu: [{
        id: 0,
        name: "钱包余额",
        icon: "",
        path: ""
      },
      {
        id: 1,
        name: "会员卡",
        icon: "home-icon2",
        path: ""
      },
      {
        id: 2,
        name: "我的好友",
        icon: "home-icon3",
        path: ""
      },
      {
        id: 3,
        name: "我的预约",
        icon: "home-icon4",
        path: ""
      }]
    }
  },
  components: {
    tabbar
  },
  methods: {
    goto(path) {
      if (path === "") {
        this.$messagebox.alert("功能开发中，敬请期待", "提示");
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
.mine-wrap{
  height: 13.8rem;
  color: #fff;
  @include bgImg("../../assets/img/mine/bg_wode@2x.png");
  .photo-box{
    padding: 1.6rem .42rem 0;
    font-size: .38rem;
    font-weight: 600;
    .photo{
      width: 1.3rem;
      height: 1.3rem;
      margin-right: .26rem;
      background-color: pink;
      border-radius: 50%;
    }
  }
  .menu{
    padding: 2.1rem .5rem .1rem;
    flex-wrap: wrap;
    .menu-item{
      width: 3rem;
      height: 1rem;
      margin-bottom: 0.46rem;
      text-align: center;
      border: 1px solid #FE344B;
      background-color: #121212;
      border-radius: .2rem;
    }
    .home-icon{
      width: .42rem;
      height: 0.42rem;
      @include bgImg('../../assets/img/mine/mine_icon1.png');
      margin-right: .3rem;
    }
    .home-icon2{
      @include bgImg('../../assets/img/mine/mine_icon2.png');
      margin-right: .3rem;
    }
    .home-icon3{
      @include bgImg('../../assets/img/mine/mine_icon33.png');
      margin-right: .3rem;
    }
    .home-icon4{
      @include bgImg('../../assets/img/mine/mine_icon4.png');
      margin-right: .3rem;
    }
  }
  .logo{
    width: 1.08rem;
    height: 1.05rem;
    margin: 2.7rem auto 0;
    @include bgImg("../../assets/img/mine/logo@2x.png");
  }
}
</style>
