<template>
  <div class="memberCard-wrap">
    <div class="title">申请会员卡</div>
    <div class="item" v-for="item in cardList"
      :key="item.id">
        <div class="flex-h flex-hsb">
            <div class="sub-title">开通黄金卡赠送金额：<span class="f-36 c-orange">100000</span>元</div>
            <div class="sub-title" @click="item.showDetail = !item.showDetail">
              详情<i class="el-icon-right"></i>
            </div>
        </div>
        <ul class="flex-h flex-wrap detail" v-show="item.showDetail">
          <li>默认账户：<span class="c-orange">10000</span>元</li>
          <li>综合金额：<span class="c-orange">0</span>元</li>
          <li>酒水账户：<span class="c-orange">0</span>元</li>
          <li>房台账户：<span class="c-orange">0</span>元</li>
          <li>赠送积分：<span class="c-orange">1000</span>分</li>
        </ul>
        <div class="contain">
            <div class="main">                
                <div class="flex-h flex-hsb flex-vc">
                    <div>
                      <span class="icon-crown"></span>
                      <span class="big-title">黄金会员卡</span>
                    </div>
                    <span class="btn" @click="applyCard(item)">去申请</span>
                </div>
                <div class="desc-title">特权说明</div>
                <div class="desc-main">                    
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
import { MessageBox } from "mint-ui";
import { Popup } from 'mint-ui';
export default {
  name: "MemberCard",
  data() {
    return {
      showPopup: false,
      inviteCode: '',
      cardList: [
        {
          id: 1,
          showDetail: false,
          title: '黄金会员卡'
        },{
          id: 2,
          showDetail: false,
          title: '白金会员卡'
        },{
          id: 3,
          showDetail: false,
          title: '至尊会员卡'
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
    },
    applyCard(item) {
      this.showPopup = true;
      this.inviteCode = '';
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
.c-orange{ color: #FDA251;}
.f-bold{font-weight: bold;}
.flex-wrap{
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.myCard-wrap{
    padding: 0 .2rem;
}
</style>
