<template>
  <div>
    <div class="banner"></div>
    <p class="scan-text">找到房号（台号）二维码【扫一扫】自助下单</p>
    <div class="scan-btn">扫一扫</div>
  </div>
</template>

<script>
export default {
  name: "Scan",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.banner {
  height: 4.9rem;
  background: url(../../assets/img/scan.png) no-repeat;
  background-size: 100%;
}
.scan-text {
  color: #353432;
  text-align: center;
  margin-top: 0.9rem;
  margin-bottom: 0.52rem;
}
.scan-btn {
  margin: 0 0.7rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.38rem;
  color: #fff;
  border-radius: 0.1rem;
  background-color: #009ce3;
}
</style>
