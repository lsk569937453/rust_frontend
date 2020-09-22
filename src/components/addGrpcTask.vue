<template>
  <el-main>
    <div class="firstCard">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <h1>Add Grpc Task</h1>
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
              <el-col :span="2"
                      :offset="1">
                <el-button type="primary"
                           @click="checkCron">CheckExpression</el-button>
              </el-col>
            </el-form-item>

            <el-form-item label="ipAndPort"
                          prop="url">
              <el-col :span="12">
                <el-input v-model="formLabelAlign.url"
                          placeholder="192.168.1.1:9000"></el-input>
              </el-col>
              <el-col :span="2"
                      :offset="1">
                <el-button type="primary"
                           @click="validateGrpc">validate</el-button>
              </el-col>
            </el-form-item>
            <el-form-item style="text-align: left">
              <el-button type="primary"
                         @click="addCronTask">create task</el-button>
              <el-button>cancal</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-card>

    </div>

    <div v-if="this.showPannel==0">

      <el-card class="box-card">
        <h1 style="text-align: center">Grpc Call</h1>
        <div class="grpcHeaderCls">
          <span class="textCls">Service name:</span>
          <el-select v-model="grpcForm.currentService"
                     placeholder="please select"
                     @change="serviceChange">
            <el-option v-for="item in grpcForm.services"
                       :key="item.serviceName"
                       :label="item.serviceName"
                       :value="item.serviceName">
            </el-option>
          </el-select>
        </div>
        <div class="grpcHeaderCls">
          <span class="textCls">Method name:</span>
          <el-select v-model="grpcForm.currentMethod"
                     placeholder="please select"
                     @change="methodChange">
            <el-option v-for="item in methodSelect"
                       :key="item.methodName"
                       :label="item.methodName"
                       :value="item.methodName">
            </el-option>
          </el-select>
        </div>
        <el-tabs v-model="activeName"
                 type="border-card"
                 @tab-click="tabClick"
                 class="grpcPannleCls">
          <el-tab-pane label="requestForm"
                       name="first">
            <h3>Request Data</h3>

            <div class="grpcReqLine">
              <span style="color:#888;line-height: 3"><em>stream</em> {{ grpcMethodObj.inputName }}</span>
              <el-form :model="grpcMethodObj"
                       label-width="80px">
                <el-form-item v-for="(field,i) in grpcMethodObj.realField"
                              :key="field.fieldName"
                              :label="field.fieldName"
                              class="reqDataFormItemCls">
                  <el-input type="textarea"
                            :rows="1"
                            v-model=field.fieldValue>
                  </el-input>
                </el-form-item>
              </el-form>

            </div>
            <div style="margin-bottom: 20px">
              <h3>Request Timeout
              </h3>
              <div class="grpcTimeOutdiv">
                <el-input v-model="grpcForm.grpcTimeOut"
                          placeholder="please input timeout"></el-input>
                <span>seconds</span>
              </div>
            </div>
            <el-button plain
                       @click="invokeClick">Invoke</el-button>

          </el-tab-pane>
          <el-tab-pane label="requestJson"
                       name="second">

            <div style="margin-bottom: 20px">
              <h3>Request Timeout
              </h3>

            </div>
          </el-tab-pane>
          <el-tab-pane label="response"
                       name="third">
            <div style="margin-bottom: 20px">
              <h3>Response Data
              </h3>
              <div class="grpcReqLine">
                <span style="color:#888;line-height: 3"><em>message</em> {{ grpcResponseMessage }}</span>

              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "addTaskPage",
  data () {
    return {
      showPannel: -1,//show tha pannel which contains the grpc test pannel and the cron pannel
      methodSelect: [],
      grpcMethodObj: {},
      grpcResponseMessage: "",
      grpcForm: {
        currentService: "",
        currentMethod: "",
        services: [
          // {
          //   serviceName: "",
          //   methods: [
          //     {
          //       methodName: "",
          //       inputName: "",
          //       realField: [{
          //         fieldName: "a",
          //         fieldValue: "1"
          //       }, {
          //         fieldName: "b",
          //         fieldValue: "2"
          //       }]
          //     }
          //   ]
          // }
        ],
      },
      activeName: "first",
      time: "111",
      fullscreenLoading: false,
      TimeId: -1,

      formLabelAlign: {
        taskName: "",
        cronExpressionInput: "",
        url: "127.0.0.1:9000",
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
          grpcTimeOut: "",
        },
      ],
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


  },
  methods: {
    formatFieldJson () {
      var req = {}
      for (var item of this.grpcMethodObj.realField) {
        req[item.fieldName] = item.fieldValue;
      }
      return JSON.stringify(req)
    },
    invokeClick () {
      console.log(this.grpcMethodObj)

      var reqjson = {
        url: this.formLabelAlign.url,
        serviceName: this.grpcForm.currentService,
        methodName: this.grpcForm.currentMethod,
        reqjson: this.formatFieldJson()
      };
      Request.post("/api/grpc/remoteInvoke", reqjson).then(response => {
        if (response.data.resCode == 0) {
          this.grpcResponseMessage = response.data.message;
          this.activeName = "third"
        }
        console.log(response)
      })
    },
    methodChange () {

      for (var service of this.grpcForm.services) {
        if (service.serviceName == this.grpcForm.currentService) {
          for (var method of service.methods) {
            if (method.methodName === this.grpcForm.currentMethod) {
              this.grpcMethodObj = method
            }
          }
        }
      }
    },
    serviceChange () {
      console.log(this.grpcForm.currentService)
      var currentService = this.grpcForm.services.filter(item => {
        return item.serviceName === this.grpcForm.currentService
      }
      )
      this.methodSelect = currentService[0].methods;
      this.grpcForm.currentMethod = this.methodSelect[0].methodName
      this.grpcMethodObj = this.methodSelect[0]

    },
    validateGrpc () {
      this.showPannel = 0;
      var reqJson = { url: this.formLabelAlign.url }
      Request.post("/api/grpc/getServiceList", reqJson).then(response => {
        if (response.data.resCode == 0) {
          this.grpcForm.services = [];
          var serviceList = response.data.message.services;
          for (var service of serviceList) {

            var methodList = [];
            for (var method of service.methods) {
              var methodObj = {
                methodName: method.methodName,
                realField: method.fields,
                inputName: method.inputName
              };
              methodList.push(methodObj);
            }

            var serviceObj = {
              methods: methodList,
              serviceName: service.serviceName,

            }
            this.grpcForm.services.push(serviceObj)
          }
          console.log(this.grpcForm)
          //set the default selector
          this.grpcForm.currentService = this.grpcForm.services[0].serviceName
          this.grpcForm.currentMethod = this.grpcForm.services[0].methods[0].methodName
          this.grpcMethodObj = this.grpcForm.services[0].methods[0]

        }
      });

    },


    tabClick () {
    },
    beforeDestroy () {
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
  },
};
</script>

<style scoped>
.grpcPannleCls {
  text-align: left;
}

.firstCard {
  margin: 30px 100px 30px 100px;
}

.reqDataFormItemCls {
  border: 1px dotted #ccc;
  margin: 4px;
  padding: 16px;
}

.grpcTimeOutdiv /deep/ .el-input {
  width: auto !important;
}

.grpcReqLine {
  border: 1px dashed #ccc;
  margin: 4px;
  padding: 16px;
  display: inline-block;
}

.grpcHeaderCls {
  text-align: left;
  padding: 10px;
}

.grpcHeaderCls .textCls {
  font-size: 125%;
  line-height: 30px;
}

.grpcReqLine /deep/ .el-form-item__label {
  text-align: center !important;
}
</style>
