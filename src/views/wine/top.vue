<template>
  <div>
    <div class="room-box flex-h flex-hsb flex-vc">
      <p class="flex-h flex-vc">
        <mt-button
          icon="back"
          slot="left"
          @click="back"
          class="back-btn"
        ></mt-button
        ><span>当前房间号：</span><span class="room">{{ table }}</span>
      </p>
      <i class="room-icon" @click="backHome"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "wineTop",
  data() {
    return {};
  },
  props: ["table"],
  methods: {
    back() {
      this.$router.back();
    },
    backHome() {
      this.$router.replace({ path: "/" });
    }
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
  background-color: #070707;
  font-size: 0.32rem;
  z-index: 3;
  color: #fff;
  .back-btn {
    background-color: #121212;
    color: #fff;
    padding-left: 0;
    box-shadow: none;
  }
  .room {
    color: #ff314f;
  }
  .room-icon {
    width: 0.42rem;
    height: 0.42rem;
    background: url(../../assets/img/wine/icon_back_home.png) no-repeat;
    background-size: 100%;
  }
}
</style>
