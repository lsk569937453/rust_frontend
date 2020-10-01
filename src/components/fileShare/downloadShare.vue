<template>
  <div>
    <el-card>
      <div>
        <el-button @click="clickSaveFile">点击下载</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import Request from "../../utils/axiosUtils";
import QRCode from 'qrcodejs2';
import FileUtils from '../../utils/fileUtils';
import CryptoJS from 'crypto-js'
import TemplatePage from "../TemplatePage";
import encryUtils from "../../utils/encryUtils";

let Base64 = require('js-base64').Base64;


export default {
  name: "downloadShare",
  data() {
    return {
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
    clickSaveFile() {
      let obj = {}

      obj["fileKeyCode"] = this.fileKeyCode;

      Request.post("/api/shareFile/download-user-file", obj, {
        responseType: "arraybuffer"
      })
          .then(response => {
                if (response.status !== 200) {
                  return;
                }
                let fileName = response.headers["share-file-name"]
                let readsxxx = this.constructArray(response.data);
                let decDataxx = CryptoJS.enc.Base64.parse(readsxxx).toString(CryptoJS.enc.Utf8);
                let res = encryUtils.decrypt(decDataxx, this.password)
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
          ).catch(response => {
        console.log(response);
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

</style>