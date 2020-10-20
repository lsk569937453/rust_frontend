<template>
  <div class="loginPage">
    <el-card class="box-card loginDiv">
      <div slot="header"
           class="clearfix">
        <span>Task Management System
        </span>
      </div>
      <el-form :model="param"
               :rules="rules"
               ref="login"
               label-width="0px"
               class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username"
                    placeholder="username">
            <el-button slot="prepend"
                       icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="password"
                    v-model="param.password"
                    @keyup.enter.native="submitForm()">
            <el-button slot="prepend"
                       icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="verifyForm">
          <el-col :span="16">
            <!--            <el-input v-model="verifyCodeInput" maxlength="4">-->

            <!--            </el-input>-->

            <CodeInput :loading="false" class="input" :fields="4" :fieldHeight="40"/>

          </el-col>
          <el-col :span="4" :offset="2">
            <div @click.stop.prevent="refreshVerifyCode">
              <verify-code :identify-code="identifyCode"></verify-code>
            </div>
          </el-col>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary"
                     @click="submitForm()">Sign In
          </el-button>
        </div>
        <p class="login-tips">Tips : Fill in the user name and password randomly</p>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import Request from "../utils/axiosUtils";
import verifyCode from "./verifyCode"
import CodeInput from "vue-verification-code-input";

export default {
  name: "login",
  components: {
    verifyCode,
    CodeInput
  },
  data() {
    return {
      verifyCodeInput: "",
      identifyCode: "111",
      param: {
        username: "admin",
        password: "123123",
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
    };
  },

  mounted() {
  },
  methods: {
    refreshVerifyCode() {
      const randomNumber = Math.floor(Math.random() * 9000) + 1000
      this.identifyCode = randomNumber.toString();
    },
    submitForm() {
      this.$router.push({name: "shareFile"});
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

.verifyForm /deep/ .react-code-input > input:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.verifyForm /deep/ .react-code-input > input:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
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
