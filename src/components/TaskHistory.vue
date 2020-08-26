<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>Task History</span>
      </div>
      <template>
        <el-table v-loading="loading"
                  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%">
          <el-table-column prop="dateTime"
                           label="Date"
                           sortable
                           width="180"></el-table-column>
          <el-table-column prop="execTime"
                           label="Execution Time"
                           sortable
                           width="180"></el-table-column>
          <el-table-column prop="task_url"
                           label="Url"></el-table-column>
          <!-- <el-table-column prop="execResult" label="执行结果" width="600"></el-table-column> -->
          <el-table-column prop="execCode"
                           label="Response Code"></el-table-column>
          <el-table-column fixed="right"
                           label="Response Body"
                           width="250">
            <template slot-scope="scope">
              <el-button @click="clickToHistory(scope.row)"
                         type="text"
                         round
                         size="medium">Detail</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10, 15, 20]"
                         :page-size="pagesize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"></el-pagination>
        </div>
      </template>
    </el-card>
    <el-dialog title="返回值"
               :visible.sync="dialogVisible">
      <json-viewer :value="dialogDetailMessage"
                   :expand-depth="4"
                   sort></json-viewer>
    </el-dialog>

    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "TasskHistory",
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      loading: true,
      dialogVisible: false,
      dialogDetailMessage: "",
    };
  },

  mounted () {
    let taskId = Number.parseInt(this.$route.query.taskId);

    let jsonData = { task_id: taskId };
    let taskjson = { id: taskId };
    let historyF = Request.post("/api/taskHistory/getByTaskId", jsonData);
    let taskF = Request.post("/api/task/getById", taskjson);
    Request.all([historyF, taskF]).then(
      Request.spread((res1, res2) => {
        this.total = res1.data.message.length;
        console.log("a", res1);
        console.log("b", res2);
        if (res1.data.resCode == 0 && res2.data.resCode == 0) {
          let task_url = res2.data.message[0]["url"];
          for (var item of res1.data.message) {
            let execTime = item["exec_time"];
            let lastIndex = execTime.lastIndexOf("-");

            let newExecTime =
              execTime.substr(0, lastIndex) +
              " " +
              execTime.substr(lastIndex + 1, execTime.length);

            let execResult = item["exec_result"];
            let execCode = item["exec_code"];
            let timestamp = item["_timestamp"];
            let obj = {
              execTime: newExecTime,
              execResult: execResult,
              execCode: execCode,
              task_url: task_url,
              dateTime: timestamp,
            };
            this.tableData.push(obj);
          }
          this.loading = false;

        }
      })
    );
    // then(res => {
    //   let data = res.data;
    //   if (data.res_code == 0) {
    //     for (var item of data.message) {
    //       let execTime = item["exec_time"];
    //       let lastIndex = execTime.lastIndexOf("-");

    //       let newExecTime =
    //         execTime.substr(0, lastIndex) +
    //         " " +
    //         execTime.substr(lastIndex + 1, execTime.length);

    //       let execResult = item["exec_result"];
    //       let execCode = item["exec_code"];
    //       let obj = {
    //         execTime: newExecTime,
    //         execResult: execResult,
    //         execCode: execCode
    //       };
    //       this.tableData.push(obj);
    //     }
    //   }
    // });
  },
  methods: {
    clickToHistory (row) {
      console.log(row);
      this.dialogDetailMessage = row.execResult;
      this.dialogVisible = true;
    },
    handleSizeChange (val) {
      this.pagesize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
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
