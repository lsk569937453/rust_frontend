<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务历史</span>
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="execTime" label="执行时间" sortable width="180"></el-table-column>
          <el-table-column prop="task_url" label="url"></el-table-column>
          <!-- <el-table-column prop="execResult" label="执行结果" width="600"></el-table-column> -->
          <el-table-column prop="execCode" label="返回码"></el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click="clickToHistory(scope.row)" type="text" round size="medium">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "TasskHistory",
  data() {
    return {
      tableData: []
    };
  },

  mounted() {
    let jsonData = { task_id: 1 };
    let taskjson = { id: 1 };
    let historyF = Request.post("/api/taskhistory/getById", jsonData);
    let taskF = Request.post("/api/task/getById", taskjson);
    Request.all([historyF, taskF]).then(
      Request.spread((res1, res2) => {
        console.log("a", res1);
        console.log("b", res2);
        if (res1.data.res_code == 0 && res2.data.res_code == 0) {
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
            let obj = {
              execTime: newExecTime,
              execResult: execResult,
              execCode: execCode,
              task_url: task_url
            };
            this.tableData.push(obj);
          }
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
  methods: {}
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
