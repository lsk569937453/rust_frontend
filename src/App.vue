<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <NavMenu></NavMenu>
      </el-aside>
      <!-- <NavMenu></NavMenu> -->

      <el-main>
        <router-view></router-view>
        <!--路由出口 -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Subscription from "./components/Subscription";
import MainPage from "./components/MainPage";
import MainNewPage from "./components/MainNewPage";
import NavMenu from "./components/main";

export default {
  name: "app",
  components: {
    Subscription,
    MainPage,
    MainNewPage,
    NavMenu
  }
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
</style>
