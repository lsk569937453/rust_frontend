<template>
  <div id="app">
    <el-container style="height:100%">
      <el-header>
        <MainPageHeader></MainPageHeader>
      </el-header>

      <el-container>
        <NavMenu style="height:100%" class="sideBar"></NavMenu>
        <el-main>
          <router-view v-if="isRouterAlive"></router-view>
          <!--路由出口 -->
        </el-main>
      </el-container>
      <!-- <el-aside>
        <NavMenu style="height:100%"></NavMenu>
      </el-aside>
      <!-- <NavMenu></NavMenu>-->
      <!-- <el-container>
        <el-header>
          <MainPageHeader></MainPageHeader>
      </el-header>-->
      <!-- <el-main>
        <router-view></router-view>
      <!--路由出口-->

      <!-- </el-container> -->
    </el-container>
  </div>
</template>

<script>
import Subscription from "./components/Subscription";
import MainPage from "./components/MainPage";
import MainNewPage from "./components/MainNewPage";
import NavMenu from "./components/navMenu";
import MainPageHeader from "./components/mainPageHeader";

export default {
  name: "app",
  components: {
    Subscription,
    MainPage,
    MainNewPage,
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
