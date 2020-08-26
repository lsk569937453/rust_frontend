<template>
  <el-main style="height:100%">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-button style="float: left; padding: 3px 0"
                   type="text"
                   @click="addCronTask">Add Schedule Task</el-button>
        <span>Task List</span>
      </div>
      <template>
        <el-table :data="tableData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
          <el-table-column prop="timestamp"
                           label="Date"
                           width="180"></el-table-column>
          <el-table-column prop="taskCron"
                           label="Cron  Expression"
                           width="180"></el-table-column>
          <el-table-column prop="taskUrl"
                           label="Url"></el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="250"
                           align="center">
            <template slot-scope="scope">
              <el-button @click="editTaskShowDialog(scope.row,scope.$index)"
                         type="text"
                         icon="el-icon-edit"
                         size="medium">edit</el-button>

              <el-button @click="clickToHistory(scope.row)"
                         type="text"
                         icon="el-icon-tickets"
                         size="medium">task history</el-button>

              <el-button @click="handleDelete(scope.row)"
                         type="text"
                         icon="el-icon-delete"
                         size="medium"
                         class="red">delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-dialog title="Add Scheduled Task"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-card class="box-card">
        <template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input placeholder="Cron Expression"
                        suffix-icon="el-icon-date"
                        v-model="cronExpressionInput"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input placeholder="TaskName"
                        suffix-icon="el-icon-date"
                        v-model="tashName"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-button type="primary"
                       @click="addCronTask">Add New Task</el-button>
          </el-row>
        </template>
      </el-card>
    </el-dialog>
    <el-dialog title="Edit"
               :visible.sync="editDiagVisible">
      <el-form :model="editForm">
        <el-form-item label="Cron Expression"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.cron_expression"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Url"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.url"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editDiagVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="confirmEdit">Ok</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "taskPage",
  inject: ["reload"],
  data () {
    return {
      time: "111",
      dialogVisible: false,
      cronExpressionInput: "",
      tashName: "",
      tableData: [],
      editForm: {
        id: "",
        cron_expression: "",
        url: "",
        rowIndex: "",
      },
      formLabelWidth: "120px",
      editDiagVisible: false,
    };
  },
  mounted () {
    // document
    //   .querySelector("body")
    //   .setAttribute("style", "background-color:#f0f0f0");
    var self = this;
    // setInterval(getTotelNumber, 5000);
    let postJson = { user_id: "-1" };
    Request.post("/api/task/getByUserId", postJson).then((response) => {
      let data = response.data;
      if (data.resCode == 0) {
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
            id: id,
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
    confirmEdit () {
      this.editDiagVisible = false;

      // var _location = window.location;
      Request.post("/api/task/updateById", this.editForm)
        .then((response) => {
          console.log(response);
          if (response.data.resCode === 0) {
            this.reload();
            // that.$router.go(0);
            // that.$router.push({ name: "taskPage" });
            // let obj = {
            //   taskUrl: this.editForm.url,
            //   taskCron: this.editForm.cron_expression,
            //   id: this.editForm.id,
            // };
            // this.tableData[this.editForm.index] = obj;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    },

    handleDelete (row) {
      // 二次确认删除
      this.$confirm('Are you sure you want to delete it？', 'Tips', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          let obj = { "id": row.id }
          Request.post("/api/task/delById", obj)
            .then((response) => {
              console.log(response);
              this.$message.success('delete success');
              this.reload();
            })
            .catch((response) => {
              console.log(response);
            });

        })
        .catch(() => { });
    },
    editTaskShowDialog (row, index) {
      this.editForm.url = row.taskUrl;
      this.editForm.cron_expression = row.taskCron;
      this.editForm.id = row.id;
      this.editForm.index = index;
      this.editDiagVisible = true;
    },
    clickToHistory (row) {
      console.log("aaa", row);
      this.$router.push({ name: "taskhistory", query: { taskId: row.id } });
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },

    addCronTask () {
      this.$router.push({
        //核心语句
        path: "/addTask", //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
          fileCode: "fileCode",
        },
      });
      Request.post("/api/addTask")
        .then((response) => {
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
        .catch((_) => { });
    },

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
.red {
  color: #ff0000;
}
</style>
