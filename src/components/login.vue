<template>
  <div class="loginPage">
    <el-card class="box-card loginDiv">
      <div slot="header" class="clearfix">
        <span>任务管理系统</span>
      </div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "login",
  data() {
    return {
      param: {
        username: "admin",
        password: "123123",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  mounted() {},
  methods: {
    submitForm() {
      this.$router.push({ name: "taskPage" });
    },
  },
};
</script>

<style scoped>
.loginPage {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../static/login-bg.jpg);
  background-size: 100%;
}
.loginDiv {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: hsla(0, 0%, 100%, 0.3);
  overflow: hidden;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
