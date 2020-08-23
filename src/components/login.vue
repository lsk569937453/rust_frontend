<template>
  <div class="loginPage">
    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->
    sssss
  </div>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "login",
  data() {
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

  mounted() {
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
            this.loading = false;
          }
        }
      })
    );
  },
  methods: {
    clickToHistory(row) {
      console.log(row);
      this.dialogDetailMessage = row.execResult;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
</style>
