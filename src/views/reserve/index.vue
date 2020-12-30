<template>
  <!--预定台房-->
  <div>
    <div class="day-box flex-h">
      <div class="day-item on">
        <p>12.11</p>
        <span class="week">今天</span>
      </div>
      <div class="day-item">
        <p>12.11</p>
        <span class="week">星期一</span>
      </div>
      <div class="day-item">
        <p>12.11</p>
        <span class="week">星期一</span>
      </div>
      <div class="day-item">
        <p>12.11</p>
        <span class="week">星期一</span>
      </div>
      <div class="day-item">
        <p>12.11</p>
        <span class="week">星期一</span>
      </div>
      <div class="day-item">
        <p>12.11</p>
        <span class="week">星期一</span>
      </div>
    </div>
    <a href="tel:15280568356" class="reserve-btn"></a>
    <p class="reserve-no">
      您选择的日期暂未发布网络购房！<br />您可使用电话预约，预约热线：075523907939<br />不便之处敬请谅解！
    </p>
  </div>
</template>

<script>
export default {
  name: "Reserve",
  data() {
    return {
      day: []
    };
  },
  mounted() {
    let now = new Date();
    console.log(now, "当前时间戳");
    this.getReserve();
  },
  methods: {
    getReserve() {
    this.request({
      url: '',
      data: {},
      loading: true,
      successFn: ({data}) => {

      }
    })
    }
  }
};
</script>

<style lang="scss" scoped>
.day-box {
  margin: 0.33rem 0.14rem 0.24rem;
  overflow-x: scroll;
  .day-item {
    width: 1.3rem;
    height: 1.2rem;
    padding-top: 0.26rem;
    margin-right: 0.1rem;
    flex-shrink: 0;
    font-size: 0.34rem;
    color: #676f7f;
    background-color: #feffff;
    text-align: center;
    border-radius: 0.1rem;
    .week {
      display: inline-block;
      padding: 2px 0;
      min-width: 1rem;
      font-size: 0.24rem;
      margin-top: 0.22rem;
      color: #676f7f;
      border-radius: 2px;
      background: rgba(#cbcbcb, 0.36);
    }
    &.on {
      background: linear-gradient(-90deg, #ff8e2a 0%, #feab55 100%);
      color: #fff;
      .week {
        color: #fff;
        background: rgba(#feffff, 0.36);
      }
    }
  }
}
.reserve-btn {
  display: block;
  width: 1.12rem;
  height: 1.12rem;
  background: url(../../assets/img/reserve_icon.png) no-repeat;
  background-size: 100%;
  margin: 2.13rem auto 0.68rem;
}
.reserve-no {
  font-size: 0.24rem;
  color: #676f7f;
  line-height: 0.42rem;
  text-align: center;
}
</style>
