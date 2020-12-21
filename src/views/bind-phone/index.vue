<template>
  <div class="bind-box">
    <div class="bind-item flex-h flex-hsb flex-vc">
      <span>国家/地区</span>
      <div class="flex-h flex-vc">
        <span>+86</span>
        <i class="right-icon"></i>
      </div>
    </div>
    <div class="bind-item">
      <input
        class="phone"
        v-model="mobile"
        placeholder="请输入手机号码"
        type="number"
      />
    </div>
    <div class="bind-item flex-h flex-hsb">
      <input
        class="phone"
        v-model="code"
        placeholder="请输入验证码"
        type="number"
      />
      <span class="code-btn" @click="getCode">{{ codetext }}</span>
    </div>
    <div class="bind-btn" @click="sureFn">确定</div>
  </div>
</template>

<script>
import common from "@/assets/js/common";
export default {
  name: "BindPhone",
  data() {
    return {
      mobile: "",
      code: "",
      codetext: "获取验证码"
    };
  },
  mounted() {
    this.$indicator.open();
  },
  methods: {
    getCode() {
      let that = this;
      if (this.mobile === "") {
        this.$toast("手机号不能为空");
        return false;
      } else if (!common.checkPhone(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (this.click) return false;
      this.click = true;
      this.request({
        url: "/api/v1/verifycode/index",
        data: { mobile: this.mobile },
        loading: true,
        successFn(res) {
          that.$toast(res.msg);
          let time = 60;
          that.codetext = "(" + time + "s)后可重发";
          let timer = setInterval(() => {
            if (time > 0) {
              time--;
              that.codetext = "(" + time + "s)后可重发";
            } else {
              clearInterval(timer);
              that.click = false;
              that.codetext = "重新获取";
            }
          }, 1000);
        },
        failFn(res) {
          that.click = false;
          that.$toast(res.data.msg);
        },
        errorFn() {
          that.click = false;
        }
      });
    },
    sureFn() {
      if (this.mobile === "") {
        this.$toast("手机号不能为空");
        return false;
      } else if (!common.checkPhone(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      } else if (this.code === "") {
        this.$toast("请输入验证码");
        return false;
      }
      this.request({
        url: "",
        data: {
          mobile: this.mobile,
          code: this.code
        },
        loading: true,
        successFn(res) {
          console.log(res, "绑定手机号");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bind-box {
  height: 100vh;
  background-color: #f5f5f9;
  box-sizing: border-box;
  padding: 0 0.24rem;
  .bind-item {
    padding: 0.4rem 0.1rem;
    border-bottom: 1px solid #ddd;
    .right-icon {
      width: 0.09rem;
      height: 0.18rem;
      background: url("../../assets/img/mine/mine_icon3.png") no-repeat;
      background-size: 100%;
      margin-left: 0.16rem;
    }
    .phone {
      border: 0;
      background-color: #f5f5f9;
    }
    .code-btn {
      color: #009ce3;
      padding-left: 0.32rem;
      border-left: 1px solid #ddd;
    }
  }
  .bind-btn {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.34rem;
    text-align: center;
    color: #fff;
    background-color: #009ce3;
    border-radius: 22px;
    margin-top: 0.8rem;
  }
}
</style>
