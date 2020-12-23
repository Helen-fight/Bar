<template>
  <div class="myCard-wrap">
    <div class="header-box">
      <div class="card-info">
        <div class="flex-h flex-vc">
          <div class="flex-h">
            <img class="icon-crown" src="../../../assets/img/mine/myCard/icon-gold-crown.png">
            <div>
              <div class="big-title">黄金会员卡</div>
              <span class="user-id">HSQ0000139</span>
            </div>
          </div>
          <span class="btn" @click="applyCard">去充值</span>
        </div>

        <div class="flex-h username">
          <div class="label">用      户：</div>
          <div class="value">樱桃小丸子</div>
        </div>
        <div class="flex-h validity">
          <div class="label">有效日期：</div>
          <div class="value">2021.12.23</div>
        </div>
      </div>

      <div class="desc-box">
        <div class="big-title">特权说明</div>
        <div class="flex-h flex-hsb">
          <div class="desc">            
            100元/张，一年有效期。<br>
            1.可享受2-4楼房费会员折扣.<br>
            2.可购买超市会员酒水套餐.<br>
            3.享受会员生日赠送及免费布置.                      
          </div>
          <img class="icon-qrcode" src="../../../assets/img/mine/myCard/icon-qrcode.png">
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list-title">基础信息</div>
    <ul class="list">
      <li class="flex-h flex-hsb flex-vc item">
        <div class="flex-h flex-hsb flex-vc item-left">
          <span class="icon icon-membershipPoints"></span>
          <span class="sub-title">
            会员积分：
            <span class="c-orange">1000</span>
          </span>          
        </div>
        <div class="item-right">
          <span class="btn">积分兑换</span>
        </div>
      </li>
      <li class="flex-h flex-hsb flex-vc item">
        <div class="flex-h flex-hsb flex-vc item-left">
          <span class="icon icon-accountBalance"></span>
          <span class="sub-title">
            账户余额：
            <span class="c-orange">1000000</span>
            元
          </span>          
        </div>
        <div class="item-right">
          <span class="btn">详情 > </span>
        </div>
      </li>
      <li class="flex-h flex-hsb flex-vc item">
        <div class="flex-h flex-hsb flex-vc item-left">
          <span class="icon icon-consumeDetails"></span>
          <span class="sub-title">
            消费明细
            <!-- <span class="c-orange">1000</span> -->
          </span>          
        </div>
        <div class="item-right">
          <span class="icon-right">›</span>
        </div>
      </li>
      <li class="flex-h flex-hsb flex-vc item">
        <div class="flex-h flex-hsb flex-vc item-left">
          <span class="icon icon-exclusivePrivilege"></span>
          <span class="sub-title">
            专属特权
            <!-- <span class="c-orange">1000</span> -->
          </span>          
        </div>
        <div class="item-right">
          <span class="icon-right">›</span>
        </div>
      </li>      
    </ul>


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
    min-height: 100vh;
    background-color: #fff;
    .header-box{
      padding-top: .46rem;
      background-color: #222;
      border-radius: 0 0 .6rem 0;
      .card-info{
        padding: 1.1rem .4rem .54rem .4rem;
        margin: 0 auto;
        width: 6.1rem;
        height: 4.2rem;
        font-size: .28rem;
        color: #000;
        @include bgImg("../../../assets/img/mine/myCard/icon-gold-bg.png");
        box-sizing: border-box;
        .icon-crown{
          margin-right: .12rem;
          width: .46rem;
          height: .46rem;
        }
        .big-title{
          margin-bottom: .14rem;
          font-size: .46rem; 
          font-weight: bold;
        }
        .btn{
          width: 1.6rem;
          height: .56rem;
          line-height: .46rem;
          font-size: .28rem;
          color: #000;
          border-radius: .28rem;
          background-color: #F8E9C1;
          text-align: center;
        }
        .username{
          margin: .6rem 0 .12rem .5rem;
        }
        .validity{margin-left: .5rem;}
      }
      .desc-box{
        padding: 0 .8rem .7rem .26rem;
        margin: 0 auto;
        width: 6.1rem;
        font-size: .24rem;
        color: #cacaca;
        line-height: .3rem;
        box-sizing: border-box;
        .big-title{
          margin: 0 0 .26rem 0;
          font-size: .32rem;
        }
        .icon-qrcode{
          width: .9rem;
          height: .9rem;
        }
      }
    }
    .list-title{
      margin: .54rem 0 .27rem .45rem;
      font-size: .32rem;
      font-weight: bold;
      color: #000;
    }
    .list{
      .item{
        padding: .23rem .45rem;
        border-bottom: solid 1px #F2F2F2;
        .icon{
          margin-right: .27rem;
          width: .86rem;
          height: .86rem;
        }
        .icon-membershipPoints{
          @include bgImg("../../../assets/img/mine/myCard/icon-membershipPoints.png");
        }
        .icon-accountBalance{
          @include bgImg("../../../assets/img/mine/myCard/icon-accountBalance.png");
        }
        .icon-consumeDetails{
          @include bgImg("../../../assets/img/mine/myCard/icon-consumeDetails.png");
        }
        .icon-exclusivePrivilege{
          @include bgImg("../../../assets/img/mine/myCard/icon-exclusivePrivilege.png");
        }
        .sub-title{
          font-size: .28rem;
          font-weight: bold;
          color: #000;
        }
        .btn{
          display: inline-block;
          width: 1.8rem;
          height: .6rem;
          line-height: .6rem;
          font-size: .26rem;
          color: #FF912D;
          border: solid 1px #FF912D;
          border-radius: .3rem;
          text-align: center;
          vertical-align: middle;
        }
        .icon-right{
          display: inline-block;
          width: .5rem;
          height: .5rem;
          line-height: .35rem;
          font-size: .6rem;
          color:#B1B1B1;
          vertical-align: middle;
          text-align: center ;
        }
      }
    }
}
</style>
