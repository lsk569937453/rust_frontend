<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>Add Grpc Task</h1>
      </div>
      <template>
        <el-form :rules="rules" label-width="100px" :model="formLabelAlign" label-position="right">
          <el-form-item label="task name" prop="taskName">
            <el-input v-model="formLabelAlign.taskName"></el-input>
          </el-form-item>
          <el-form-item label="cron expression" prop="cronExpressionInput">
            <el-col :span="18">
              <el-input v-model="formLabelAlign.cronExpressionInput" :xs="8"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="primary" @click="checkCron">CheckExpression</el-button>
            </el-col>
          </el-form-item>


          <el-form-item label="ipAndPort" prop="url">
            <el-col :span="18">
              <el-input
                  v-model="formLabelAlign.url"
                  placeholder="192.168.1.1:9000"
                  @input="handleInput"
              ></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="primary" @click="validateGrpc">validate</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCronTask">create</el-button>
            <el-button>cancal</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-card>

    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Grpc Call</span>
      </div>
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="requestForm" name="first">Request Form</el-tab-pane>
          <el-tab-pane label="requestJson" name="second">Raw Request(JSON)</el-tab-pane>
          <el-tab-pane label="response" name="third">Response</el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "addTaskPage",
  data() {
    return {
      activeName: "first",
      time: "111",
      fullscreenLoading: false,
      TimeId: -1,

      formLabelAlign: {
        taskName: "",
        cronExpressionInput: "",
        url: "",
      },
      grpc: [
        {
          serviceName: "",
          methods: [
            {
              methodName: "",
              inputType: "",
            },
          ],
        },
      ],
      rules: {
        taskName: [
          {required: true, message: "请输入活动名称", trigger: "blur"},
        ],
        cronExpressionInput: [
          {required: true, message: "请输入cron表达式", trigger: "blur"},
        ],
        url: [{required: true, message: "请输入url", trigger: "blur"}],
      },
    };
  },

  mounted() {

    var self = this;

    function getTotelNumber() {
      Request.get("/api/world")
          .then((response) => {
            console.log(response);
            self.time = response.data;
          })
          .catch((response) => {
            console.log(response);
          });
    }
  },
  methods: {
    validateGrpc() {
    },
    tabClick() {
    },
    beforeDestroy() {
      document.querySelector("body").removeAttribute("style");
    },
    openFullScreen1() {
      this.fullscreenLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Task added successfully,Jumping",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push({
          //核心语句
          path: "/taskPage", //跳转的路径
        });
      }, 2000);
    },

    open1(msg) {
      const h = this.$createElement;

      this.$notify({
        title: "error message",
        message: h("i", {style: "color: red"}, msg),
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    gotoBlur(input) {
      console.log(input);
    },
    handleInput() {
      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {
        this.gotoBlur(this.formLabelAlign.url); // 定时器生效时执行的方法
      }, 300);
      console.log("分数：", this.formLabelAlign.url);
    },
    checkCron() {
      Request.post("/api/check/task", {
        name: this.formLabelAlign.taskName,
        cron_expression: this.formLabelAlign.cronExpressionInput,
        url: this.formLabelAlign.url,
      })
          .then((response) => {
            let data = response.data;
            if (data.res_code == -1) {
              this.open1(data.message);
            } else if (data.res_code == 0) {
              this.checklog = data.message;
            }
            console.log(response);
            self.time = response.data;
          })
          .catch((response) => {
            console.log(response);
          });
    },
    addCronTask() {
      Request.post("/api/task/add", {
        name: this.formLabelAlign.taskName,
        cron_expression: this.formLabelAlign.cronExpressionInput,
        url: this.formLabelAlign.url,
      })
          .then((response) => {
            let data = response.data;
            if (data.resCode == -1) {
              this.open1(data.message);
            } else if (data.resCode == 0) {
              this.openFullScreen1();

              //  this.checklog = data.message;
            }
            console.log(response);
            self.time = response.data;
          })
          .catch((response) => {
            console.log(response);
          });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {
          });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }, //文件上传成功时的钩子
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.formInput {
  width: 30px;
}
</style>
