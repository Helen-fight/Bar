<template>
  <div class="memberCard-wrap">
    <div class="title">申请会员卡</div>
    <div class="item">
        <div class="flex-h flex-hsb">
            <div class="sub-title">开通黄金卡赠送金额：<span class="f-18 c-orange">100000</span>元</div>
            <div class="sub-title">详情<i class="el-icon-right"></i></div>
        </div>
        <div class="contain">
            <div class="main">                
                <div class="flex-h">
                    <span class="icon-crown"></span>
                    <span class="big-title">黄金会员卡</span>
                    <span class="btn">去申请</span>
                </div>
                <div>特权说明</div>
                <div>                    
                    100元/张，一年有效期。<br>
                    1.可享受2-4楼房费会员折扣.<br>
                    2.可购买超市会员酒水套餐.<br>
                    3.享受会员生日赠送及免费布置.                        
                </div>
            </div>
        </div>
    </div>

    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
// import Tabbar from "../../../components/tabbar.vue";
import { MessageBox } from "mint-ui";
export default {
  name: "MemberCard",
  data() {
    return {
      
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
.memberCard-wrap{
    padding: 0 .1rem;
    .c-orange{color: #FF912D;}
    .f-18{font-size: .18rem;}
    .title{
        padding: .25rem 0 .25rem .15rem;
        font-size: .2rem;
        font-weight: 500;
        color: #fff;
    }
    .sub-title{
        font-size: .12rem;
        color: #cacaca;
    }
    .contain{
        padding: .1rem 0 .3rem 0;
        width: 100%;
        height: 1.87rem;
        // @include bgImg("../../assets/img/mine/memberCard/goldCard.png");
        .main{
            margin: .4rem .25rem;
            font-size: .12rem;
            color: #CACACA;
            line-height: .15rem;

        }
    }
}
</style>
