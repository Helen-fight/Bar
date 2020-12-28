<template>
<div>
  <div class="home-wrap">
    <div class="scan-btn"></div>
    <div class="menu flex-h flex-hsb">
      <div class="menu-item flex-h flex-hc flex-vc" v-for="(item,index) in menu" :key="index" @click="goto(item.path)">
        <i class="home-icon" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </div>
    </div>
    <p class="look-store"><span>查看门店</span></p>
    <div class="flex-h">
      <div class="add-btn">Add</div>
      <div class="add-btn">Telephone</div>
    </div>
    <p class="address">上海浦东新区东方路3539号2号楼3楼 <br/>3rd floor,building 2, 3539 Dongfang Road, Pudong New Area, Shanghai</p>
  </div>
  <tabbar />
</div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  name: "Home",
  data() {
    return {
      menu: [{
        id: 0,
        name: "我要订台",
        icon: "",
        path: ""
      },
      {
        id: 1,
        name: "点单结账",
        icon: "home-icon2",
        path: "/wine"
      },
      {
        id: 2,
        name: "存/取酒",
        icon: "home-icon3",
        path: "/take-wine"
      },
      {
        id: 3,
        name: "呼叫服务",
        icon: "home-icon4",
        path: ""
      },
      {
        id: 4,
        name: "积分商城",
        icon: "home-icon5",
        path: ""
      },
      {
        id: 5,
        name: "我的订单",
        icon: "home-icon6",
        path: "/consume-history"
      }]
    };
  },
  components: {
    tabbar
  },
  methods: {
    goto(path){
      if (path) this.$router.push(path);
      else this.$messagebox.alert("功能开发中，敬请期待", "提示");
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
.home-wrap{
  position: relative;
  height: 13.8rem;
  color: #fff;
  @include bgImg('../../assets/img/home/bg_home@2x.png');
  .scan-btn{
    position: absolute;
    right: .58rem;
    top: 1.25rem;
    width: .64rem;
    height: .64rem;
    @include bgImg('../../assets/img/home/sao_icon.png');
  }
  .menu{
    padding: 4.8rem .5rem .1rem;
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
      @include bgImg('../../assets/img/home/home_icon6.png');
      margin-right: .3rem;
    }
    .home-icon2{
      @include bgImg('../../assets/img/home/home_icon5.png');
      margin-right: .3rem;
    }
    .home-icon3{
      @include bgImg('../../assets/img/home/home_icon4.png');
      margin-right: .3rem;
    }
    .home-icon4{
      @include bgImg('../../assets/img/home/home_icon3.png');
      margin-right: .3rem;
    }
    .home-icon5{
      @include bgImg('../../assets/img/home/home_icon1.png');
      margin-right: .3rem;
    }
    .home-icon6{
      @include bgImg('../../assets/img/home/home_icon2.png');
      margin-right: .3rem;
    }
  }
  .look-store{
    font-size: .32rem;
    margin-left: .5rem;
    margin-bottom: .45rem;
  }
  .add-btn{
    height: .6rem;
    line-height: .6rem;
    padding: 0 .5rem;
    margin-left: .5rem;
    border-radius: 25px;
    border: 1px solid #FF314F;
  }
  .address{
    color: #ACACAC;
    margin: .42rem .5rem;
    line-height: .42rem;
  }
}
</style>
