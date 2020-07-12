<template>
  <el-main style="height:100%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: left; padding: 3px 0" type="text" @click="addCronTask">添加定时任务</el-button>
        <span>任务列表</span>
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="timestamp" label="日期" width="180"></el-table-column>
          <el-table-column prop="taskCron" label="cron表达式" width="180"></el-table-column>
          <el-table-column prop="taskUrl" label="调用的url"></el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click="clickToHistory(scope.row)" type="primary" round size="medium">编辑</el-button>

              <el-button @click="clickToHistory(scope.row)" type="primary" round size="medium">查看历史</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-dialog title="添加定时任务" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-card class="box-card">
        <template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input
                placeholder="cron表达式"
                suffix-icon="el-icon-date"
                v-model="cronExpressionInput"
              ></el-input>
            </el-col>
            <el-col :span="12">
              <el-input placeholder="任务名称" suffix-icon="el-icon-date" v-model="tashName"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-button type="primary" @click="addCronTask">添加任务</el-button>
          </el-row>
        </template>
      </el-card>
    </el-dialog>
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "UploadPage",
  data() {
    return {
      time: "111",
      dialogVisible: false,
      cronExpressionInput: "",
      tashName: "",
      tableData: []
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#C0C4CC");
    var self = this;
    // setInterval(getTotelNumber, 5000);
    let postJson = { user_id: "-1" };
    Request.post("/api/task/get", postJson).then(response => {
      let data = response.data;
      if (data.res_code == 0) {
        for (var item of data.message) {
          let taskName = item["task_name"];
          let taskCron = item["task_cron"];
          let url = item["url"];
          let timestamp = item["timestamp"];
          let id = item["id"];
          let obj = {
            taskName: taskName,
            taskCron: taskCron,
            taskUrl: url,
            timestamp: timestamp,
            id: id
          };
          this.tableData.push(obj);
        }
      }
    });
    // function getTotelNumber() {
    //   Request.get("/api/world")
    //     .then(response => {
    //       console.log(response);
    //       self.time = response.data;
    //     })
    //     .catch(response => {
    //       console.log(response);
    //     });
    // }
  },
  methods: {
    clickToHistory(row) {
      console.log("aaa", row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    addCronTask() {
      this.$router.push({
        //核心语句
        path: "/addTask", //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
          fileCode: "fileCode"
        }
      });
      Request.post("/api/addTask")
        .then(response => {
          console.log(response);
          self.time = response.data;
        })
        .catch(response => {
          console.log(response);
        });
    },

    //测试函数
    test() {
      console.log("a");
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }, //文件上传成功时的钩子
    upLoadSuccess(response, file, fileList) {
      if (response.responseCode === 0) {
        Request.post(
          "/api/writeAllTemplateData",
          { fileCode: response.responseBody },
          { responseType: "blob" }
        )
          .then(response => {
            var blob = new Blob([response.data]);
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = "用户数据.pdf"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象

            console.log(response);
          })
          .then(() => {
            console.log(response + "已上传" + file);
            var fileCode = response.responseBody;
            this.$router.push({
              //核心语句
              path: "/template", //跳转的路径
              query: {
                //路由传参时push和query搭配使用 ，作用时传递参数
                fileCode: fileCode
              }
            });
          })
          .catch(response => {
            console.log(response);
          });
      } else {
        console.log("项目添加失败");
      }
    }
  }
};
</script>

<style >
.el-row {
  margin-bottom: 20px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
