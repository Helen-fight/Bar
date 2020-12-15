<template>
  <div>
    <div class="kong"></div>
    <div class="nav-box flex-h flex-hsb">
      <router-link
        class="nav-item"
        v-for="item in menu"
        :key="item.id"
        :to="item.path"
      >
        <i class="nav-icon" :class="item.icon"></i>
        <p>{{ item.name }}</p>
      </router-link>
      <div class="nav-item">
        <i class="nav-icon ticket-icon"></i>
        <p>快速检票</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      menu: [
        {
          id: 0,
          name: "首页",
          icon: "home-icon",
          path: "/"
        },
        {
          id: 1,
          name: "我的",
          icon: "mine-icon",
          path: "/mine"
        }
      ],
      now: 0
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.kong {
  height: 1rem;
}
.nav-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.1rem 0.7rem;
  background-color: #fff;
  .nav-item {
    font-size: 0.2rem;
    color: #b0b0b0;
    text-align: center;
    .nav-icon {
      display: inline-block;
      width: 0.52rem;
      height: 0.52rem;
      background-image: url("../assets/img/navIcon/home.png");
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .mine-icon {
      background-image: url("../assets/img/navIcon/mine.png");
    }
    .ticket-icon {
      background-image: url("../assets/img/navIcon/ticket.png");
    }
    &.router-link-exact-active {
      color: #333;
      .home-icon {
        background-image: url("../assets/img/navIcon/home_on.png");
      }
      .mine-icon {
        background-image: url("../assets/img/navIcon/mine_on.png");
      }
    }
  }
}
</style>
