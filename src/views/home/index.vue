<template>
  <div>
    <div class="banner">
      <div class="scan-btn"></div>
    </div>
    <div class="menu-box"></div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    tabbar
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  height: 7.34rem;
  background: url(../../assets/img/home/banner.png) no-repeat;
  background-size: 100%;
  .scan-btn {
    position: absolute;
    left: 0.38rem;
    top: 0.5rem;
    width: 0.64rem;
    height: 0.64rem;
    background: url(../../assets/img/home/sao_icon.png) no-repeat;
    background-size: 100%;
  }
}
</style>
