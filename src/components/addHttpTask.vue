<template>
  <el-main>
    <el-card class="firstCard">
      <div slot="header"
           class="clearfix">
        <h1>Add Http Task</h1>
      </div>
      <template>
        <el-form :rules="rules"
                 label-width="200px"
                 :model="formLabelAlign"
                 label-position="right">

          <el-form-item label="task name"
                        prop="taskName">
            <el-col :span="12">
              <el-input v-model="formLabelAlign.taskName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="cron expression"
                        prop="cronExpressionInput">
            <el-col :span="12">
              <el-input v-model="formLabelAlign.cronExpressionInput"
                        :xs="8"></el-input>
            </el-col>

          </el-form-item>
          <el-form-item label="url"
                        prop="url">
            <el-col :span="12">
              <el-input v-model="formLabelAlign.url">
                <template slot="prepend">http://</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item style="text-align: left">
            <el-button type="primary"
                       @click="addCronTask">create
            </el-button>
            <el-button>cancal</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-card>
    <el-card>
      <div slot="header"
           class="clearfix">
        <h1>Cron Demo</h1>
      </div>

      <div>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="cron"
                           label="cronExpression"
                           width="180">
          </el-table-column>
          <el-table-column prop="desc"
                           label="Explain">
          </el-table-column>

        </el-table>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="item.cron+'    '+item.desc" :name="i" v-for="(item,i) in tableData">
            <div>2020-08-20 05:20:20</div>
            <div>2020-08-20 05:20:20</div>
            <div>2020-08-20 05:20:20</div>
            <div>2020-08-20 05:20:20</div>
            <div>2020-08-20 05:20:20</div>
          </el-collapse-item>

        </el-collapse>
        <!--                  v-model="form.desc"-->

      </div>
    </el-card>

    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->

  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";
import expressionUtils from "../utils/cronSample.js"

export default {
  name: "addTaskPage",
  data () {
    return {
      activeNames: ['1'],
      tableData: [],
      time: "111",
      dialogVisible: false,
      checklog: [],
      fullscreenLoading: false,

      formLabelAlign: {
        taskName: "",
        cronExpressionInput: "",
        url: "",
      },
      rules: {
        taskName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        cronExpressionInput: [
          { required: true, message: "请输入cron表达式", trigger: "blur" },
        ],
        url: [{ required: true, message: "请输入url", trigger: "blur" }],
      },
    };
  },

  mounted () {
    // document
    //   .querySelector("body")
    //   .setAttribute("style", "background-color:#C0C4CC");
    this.tableData = expressionUtils.getAllExpression()
  },
  methods: {
    beforeDestroy () {
    handleChange(val) {
      console.log(val);
    },
    beforeDestroy() {
      document.querySelector("body").removeAttribute("style");
    },
    openFullScreen1 () {
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

    open1 (msg) {
      const h = this.$createElement;

      this.$notify({
        title: "error message",
        message: h("i", { style: "color: red" }, msg),
      });
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    checkCron () {
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
    addCronTask () {
      Request.post("/api/task/add", {
        name: this.formLabelAlign.taskName,
        cron_expression: this.formLabelAlign.cronExpressionInput,
        url: "http://" + this.formLabelAlign.url,
      })
        .then((response) => {
          let data = response.data;
          if (data.resCode == -1) {
            this.open1(data.message);
          } else if (data.resCode == 0) {
            this.openFullScreen1();

            //  this.checklog = data.message;
          } else if (data.resCode == -2) {
            let messageArray = response.data.message;
            var message = messageArray.map(function (item) {
              return item.message;
            })
            console.log(message)
            this.$notify({
              title: 'NOTIFY',
              message: message
            });
          }
          console.log(response);
          self.time = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },

    handleClose (done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {
        });
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }, //文件上传成功时的钩子
    // upLoadSuccess(response, file, fileList) {
    //   if (response.responseCode === 0) {
    //     Request.post(
    //       "/api/writeAllTemplateData",
    //       { name: response.responseBody,cron_expression: },
    //       { responseType: "blob" }
    //     )
    //       .then(response => {
    //         var blob = new Blob([response.data]);
    //         var downloadElement = document.createElement("a");
    //         var href = window.URL.createObjectURL(blob); //创建下载的链接
    //         downloadElement.href = href;
    //         downloadElement.download = "用户数据.pdf"; //下载后文件名
    //         document.body.appendChild(downloadElement);
    //         downloadElement.click(); //点击下载
    //         document.body.removeChild(downloadElement); //下载完成移除元素
    //         window.URL.revokeObjectURL(href); //释放掉blob对象

    //         console.log(response);
    //       })
    //       .then(() => {
    //         console.log(response + "已上传" + file);
    //         var fileCode = response.responseBody;
    //         this.$router.push({
    //           //核心语句
    //           path: "/template", //跳转的路径
    //           query: {
    //             //路由传参时push和query搭配使用 ，作用时传递参数
    //             fileCode: fileCode
    //           }
    //         });
    //       })
    //       .catch(response => {
    //         console.log(response);
    //       });
    //   } else {
    //     console.log("项目添加失败");
    //   }
    // }
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

/*.formCls /deep/ .el-input {*/
/*  width: auto !important;*/
/*}*/

.formInput {
  width: 30px;
}

.firstCard {
  margin: 30px 100px 30px 100px;
}

.desCls /deep/ .el-collapse-item__content {
  text-align: left !important;

}
</style>
