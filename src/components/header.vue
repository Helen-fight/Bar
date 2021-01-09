<template>
  <div>
    <mt-header fixed :title="title" class="header">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      title: ""
    };
  },
  mounted() {
    this.title = this.$route.meta.title;
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #121212;
}
</style>
