<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>{{time}}</h1>
      </div>
    </el-card>
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "UploadPage",
  data() {
    return {
      time: "111"
    };
  },
  mounted() {
    var self = this;
    setInterval(getTotelNumber, 10);
    function getTotelNumber() {
      Request.get("/api/world")
        .then(response => {
          console.log(response);
          self.time = response.data;
        })
        .catch(response => {
          console.log(response);
        });
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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

<style scoped>
</style>
