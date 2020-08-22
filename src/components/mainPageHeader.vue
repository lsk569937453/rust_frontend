<template>
  <div>
    <el-dropdown trigger="click" class="header-right">
      <span class="el-dropdown-link" style="font-size:20px">
        Jams
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "mainPageHeader",
  data() {
    return {
      activeIndex: "timePage",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    console.log(this.activeIndex);
    console.log(this.$route.path);
    this.activeIndex = this.$route.path.substring(1, this.$route.path.length);
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.header-right {
  float: right;
  padding-right: 50px;
  padding-top: 20px;
}
</style>
