<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from "./components/navMenu";
import MainPageHeader from "./components/mainPageHeader";

export default {
  name: "app",
  components: {
    NavMenu,
    MainPageHeader,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-header {
  padding: 0px !important;
  background-color: #242f42;
}
.sideBar {
  min-width: 250px;
}
</style>
