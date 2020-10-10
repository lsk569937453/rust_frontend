<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-button type="text"><h2>DownLoad All</h2></el-button>
        <div class="passwordCls">
          <el-checkbox v-model="passwordChecked"
                       border
                       size="medium"
                       style="display: inline-block">Use password
          </el-checkbox>
          <el-input v-if="passwordChecked==true"
                    v-model="password"
                    placeholder="Please input a password"
                    style="width: auto"></el-input>

        </div>
      </div>
      <div v-for="(item,i) in this.fileList" class="itemRow">
        <el-card>
          <el-row>

            <el-col :span="5" :offset="2">
              <span class="fa fa-file-text"
                    style="color: #3a8ee6;font-size: 35px"></span>
              <span>{{ item }}</span>
            </el-col>
            <el-col :span="6">
              <div style="margin-top: 10px">
                <span>Expiration time：<i style="color: rgb(51 197 62)">2020-08-09 11:08:02</i></span>
              </div>
            </el-col>
            <el-col :span="3" :offset="2">
              <div style="margin-top: 10px">
                <span>Remaining times: <i style="color: red;font-weight: 600;font-size: 20px">2</i></span>
              </div>
            </el-col>
            <el-col :span="3" :offset="2">
              <el-button type="text" @click="clickSaveFile(item)">Click To Download</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-card>

  </div>
</template>

<script>
import Request from "../../utils/axiosUtils";
import CryptoJS from 'crypto-js'
import encryUtils from "../../utils/encryUtils";


export default {
  name: "downloadShare",
  data() {
    return {
      passwordChecked: false,
      fileKeyCode: "",
      password: "0ca175b9c0f726a831d895e269332461",
      downloadedUrl: "",
      pageStatus: 0,
      fileList: [],

    };
  },
  mounted: function () {

    let fileKeyCode = this.$route.query.fileKeyCode;
    if (fileKeyCode === undefined || fileKeyCode === null) {
    } else {
      this.fileKeyCode = fileKeyCode;
      // this.pageStatus = 4;
    }
    console.log(this.pageStatus)
    Request.get("/api/shareFile/getFileList?clientId=" + fileKeyCode).then(response => {
      if (response.data.resCode == 0) {
        this.fileList = response.data.message
      }
    });

  },
  methods: {
    constructArray(data) {
      let array = new Uint16Array(data)
      var res = '';
      var chunk = 8 * 1024;
      var i;
      for (i = 0; i < array.length / chunk; i++) {
        res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk));
      }
      res += String.fromCharCode.apply(null, array.slice(i * chunk));
      return res;
    },

    clickSaveFile(fileName) {
      let obj = {}

      obj["fileKeyCode"] = this.fileKeyCode;
      obj["fileName"] = fileName;

      Request.post("/api/shareFile/download-user-file", obj, {
        responseType: "arraybuffer",
        onDownloadProgress(progress) {
          console.log(Math.round(progress.loaded / progress.total * 100) + '%');
        }
      })
          .then(response => {


                if (response.status !== 200) {
                  return;
                }
                let fileName = response.headers["share-file-name"]
                let readsxxx = this.constructArray(response.data);
                let decDataxx = CryptoJS.enc.Base64.parse(readsxxx).toString(CryptoJS.enc.Utf8);
                let res = {}
                res = encryUtils.decrypt(decDataxx, this.password)

                let rawStr = Buffer.from(res, 'base64');
                let blob = new Blob([rawStr]);
                let downloadElement = document.createElement("a");
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = decodeURIComponent(fileName); //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象


              }
          ).catch(err => {
        if (err.message == "Malformed UTF-8 data") {
          this.$message.error('Please re-enter the correct password');
        }
      });
      console.log(this.allData);
      console.log("cccccc");
    }
  }
}
</script>
<style scoped>
.grpcPannleCls {
  text-align: left;
}

.itemRow {
  margin-bottom: 20px;
  text-align: left;
}

</style>