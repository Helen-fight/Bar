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
import { userInfoKey } from "@/assets/js/config";
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
    this.$toast("您还未绑定手机号，请先绑定");
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
        url: "/api/v1/user/setMobile",
        data: {
          mobile: this.mobile,
          code: this.code,
          time: Math.floor(new Date().getTime() / 1000)
        },
        loading: true,
        successFn(res) {
          console.log(res, "绑定手机号");
          let userInfo = JSON.parse(window.localStorage.getItem(userInfoKey));
          userInfo.mobile = res.data.mobile;
          window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
          this.$router.replace("/");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bind-box {
  height: 100vh;
  box-sizing: border-box;
  padding: 0 0.24rem;
  color: #fff;
  .bind-item {
    padding: 0.4rem 0.1rem;
    border-bottom: 1px solid #070707;
    .right-icon {
      width: 0.09rem;
      height: 0.18rem;
      background: url("../../assets/img/mine/mine_icon3.png") no-repeat;
      background-size: 100%;
      margin-left: 0.16rem;
    }
    .phone {
      border: 0;
      background-color: #121212;
      color: #fff;
    }
    .code-btn {
      color: #ff314f;
      padding-left: 0.32rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-left: 1px solid #fe344b;
    }
  }
  .bind-btn {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.34rem;
    text-align: center;
    color: #fff;
    background-color: #ff314f;
    border-radius: 22px;
    margin-top: 0.8rem;
  }
}
</style>
