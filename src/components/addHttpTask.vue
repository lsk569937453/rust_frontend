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

      <div class="desCls">
        <el-table :data="tableData"
                  stripe
                  @row-click="clickTable"
                  ref="refTable"
                  style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <div style="font-size: 15px;font-weight: 600;margin-bottom: 10px">
                <span>last {{ props.row.result.length }} implementation results</span>
              </div>
              <span class="demoSpan"
                    v-for="(item,i) in  props.row.result"
                    :key="i">{{ item }}
              </span>

            </template>
          </el-table-column>
          <el-table-column prop="cron"
                           label="cronExpression"
                           width="180">
          </el-table-column>
          <el-table-column prop="desc"
                           label="Explain">
          </el-table-column>

        </el-table>

        <!--                  v-model="form.desc"-->

      </div>
    </el-card>

    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->

  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";
import expressionUtils from "../utils/cronSample.js"
import cronSample from "../utils/cronSample.js"

export default {
  name: "addTaskPage",
  data() {
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
          {required: true, message: "Please enter task name", trigger: "blur"},
        ],
        cronExpressionInput: [
          {required: true, message: "Please enter cron expression", trigger: "blur"},
        ],
        url: [{required: true, message: "Please enter url", trigger: "blur"}],
      },
    };
  },

  mounted() {

    this.httpGetCronExecResult();

  },
  methods: {
    httpGetCronExecResult() {
      this.tableData = expressionUtils.getAllExpression()
      //  const reqData=this.tableData.map(({cron:req})=>({req}));
      const reqData = this.tableData.map(item => item.cron);
      // console.log(this.tableData)
      Request.post("/api/cron/getCronExecResult", {cronList: reqData}).then((res) => {
        const brr = res.data.message;
        brr.sort(function (a, b) {
          return cronSample.sortFunction(a.cronExpression, b.cronExpression);
        })

        this.tableData = this.tableData.map((item, index) => ({...item, ...brr[index]}));
        console.log(this.tableData)

      })
    },
    clickTable(row, index, e) {
      this.$refs.refTable.toggleRowExpansion(row)
    }
    ,
    getTitle(cron, desc) {
      let baseline = 30;
      let loopIndex = baseline - cron.length;
      let res = cron;
      let spaceChar = "";
      for (var i = 0; i < loopIndex; i++) {
        spaceChar = spaceChar + "\u00A0" + "\u00A0"
      }
      let newres1 = res + spaceChar + desc
      console.log(newres1)
      return newres1
    },
    handleChange() {
      console.log("a")
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
              this.$message.error('Illegal request parameter');
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
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
          } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

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
.demoSpan {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}

.formInput {
  width: 30px;
}

.firstCard {
  margin: 30px 100px 30px 100px;
}
</style>
