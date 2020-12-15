<template>
  <div>
    <div class="home">mine page!!</div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
import Tabbar from "../../components/tabbar.vue";
export default {
  name: "Mine",
  data() {
    return {};
  },
  components: {
    tabbar
  },
  methods: {}
};
</script>

<style>
.home {
  font-size: 0.3rem;
  color: royalblue;
}
</style>
