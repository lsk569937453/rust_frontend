<template>
  <div>
    <el-card class="box-card">
      <input type="file"
             id="file"
             hidden
             @change="fileChange"
             multiple>
      <template v-if="pageStatus<=3">
        <el-row>
          <el-col :span="12">
            <div class="leftDiv"
                 v-if="pageStatus==0" @click="btnChange" ref='select_frame' ondragstart="return false">
              <div class="innerDiv">
                <div class="plsIcon">
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
                <div class="dragTextCls">
                  <span>Drag File</span>
                </div>
                <div class="orTextCls">
                  <span>Or click here to transfer a maximum of 1GB files</span>
                </div>
                <el-button type="primary"
                           @click="btnChange" @click.stop>Chose File
                </el-button>

              </div>

            </div>
            <div v-if="pageStatus==1">
              <div class="hiddMainCls">
                <div class="uploadHiddenCls">
                  <div class="cardList">
                    <el-card class="listItemcls"
                             v-for="(item,i) in fileList"
                             :key="i">

                      <el-row>
                        <el-col :span="2"
                                :offset="1"
                                style="margin-top: 20px">
                          <span class="fa fa-file-text"
                                style="color: #3a8ee6;font-size: 35px"></span>
                        </el-col>
                        <el-col :span="8">
                          <div class="fileDesCls">
                            <span>{{ item.name }}</span>
                            <div style="margin-top: 5px">
                              <span style="font-weight: normal">{{ getFileSize(item) }}</span>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="2"
                                :offset="11"
                                style="margin-top: 10px">
                          <el-button type="text"
                                     icon="el-icon-close"
                                     style="font-size: 30px;color: gray"
                                     @click="deleteFile(item.name)"></el-button>
                          <!--                        <el-button type="info" icon="el-icon-close" circle></el-button>-->
                        </el-col>
                      </el-row>
                    </el-card>
                  </div>
                  <div class="countRow">
                    <el-row>
                      <el-col :span="6">
                        <el-button type="primary"
                                   icon="el-icon-circle-plus-outline"
                                   @click="btnChange">select files to upload
                        </el-button>
                      </el-col>
                      <el-col :span="6"
                              :offset="12">
                        <span style="font-size: 20px">total:{{ fileTotal }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="expireCls">
                  <el-dropdown>
                    <el-button size="small">
                      Download once
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>twice</el-dropdown-item>
                      <el-dropdown-item>2 times</el-dropdown-item>
                      <el-dropdown-item>10 times</el-dropdown-item>
                      <el-dropdown-item>50 times</el-dropdown-item>
                      <el-dropdown-item>100 times</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                  <span style="font-weight: normal">or expired in</span>
                  <el-dropdown>
                    <el-button size="small">
                      one day<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>two day</el-dropdown-item>
                      <el-dropdown-item>three day</el-dropdown-item>
                      <el-dropdown-item>five day</el-dropdown-item>

                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="passwordCls">
                  <el-checkbox v-model="passwordChecked"
                               border
                               size="medium"
                               style="display: inline-block">Password
                    protection
                  </el-checkbox>
                  <el-input v-if="passwordChecked==true"
                            v-model="passwordInput"
                            placeholder="Please input a password"
                            style="width: auto"></el-input>

                </div>
                <div class="realUploadButtonDiv">
                  <el-button type="primary"
                             class="realUploadButtonCls"
                             @click="uploadFile">Upload
                  </el-button>

                </div>
              </div>
            </div>
            <div v-if="pageStatus==2||pageStatus==3">
              <div class="thirdDiv">

                <el-card class="listItemcls"
                         v-for="(item,index) in fileList"
                         :key="index">
                  <div style="margin-left:20px">
                    <el-row>
                      <el-col :span="2"
                              style="margin-top: 20px">
                        <span class="fa fa-file-text"
                              style="color: #3a8ee6;font-size: 35px"></span>
                      </el-col>
                      <el-col :span="20">
                        <div class="fileDesCls">
                          <span style="font-weight: 550">{{ item.name }}</span>
                          <div style="margin-top: 5px">
                            <span style="font-weight: normal">{{ getFileSize(item) }}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">

                        <el-progress v-if="uploadProgress[index]!=undefined&&!uploadProgress[index].isShow"
                                     :percentage="uploadProgress[index].percent"
                        ></el-progress>
                        <el-progress v-if="uploadProgress[index]!=undefined&&uploadProgress[index].isShow"
                                     :percentage="uploadProgress[index].percent"
                                     :status="uploadProgress[index].status"></el-progress>

                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2"
                              :offset="21">
                        <el-button v-if="uploadProgress[index]!=undefined&&!uploadProgress[index].isShow" type="text">
                          cancel
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="pageStatus!=3">
              <el-card style="margin: 20px">
                <h3>Salute The Mozilla/Send</h3>
                <h4>This tool pays homage to Mozilla / send. Its main function is to share files anonymously. The front
                  end is encrypted by aes-gcm algorithm, so anyone without a secret key cannot view the files you share.
                  This project is only for learning.
                </h4>
              </el-card>
            </div>
            <div v-if=" pageStatus==3"
                 style="padding:50px">
              <div style="margin-bottom: 40px">
                <span style="font-weight:600;font-size:30px;">Your File Is Encrypted And Can Be Sent
                </span>
              </div>
              <el-row>
                <el-col :span="8"
                        :offset="6" style="margin-bottom: 20px">
                  <div id="qrCode" ref="qrCodeDiv"></div>

                </el-col>
              </el-row>


              <el-row>
                <el-col :span="12"
                        :offset="6">
                  <el-input v-model="downloadedUrl"
                            placeholder="Please enter" style="margin-bottom: 20px"></el-input>
                  <el-button type="primary"
                             style="width:100%"
                             v-clipboard:copy="downloadedUrl"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError">Copy link


                  </el-button>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8"
                        :offset="8">
                  <el-button type="text"
                             style="width:100%"
                             @click="clickJump">Jump
                  </el-button>
                </el-col>
              </el-row>

            </div>
          </el-col>
        </el-row>
      </template>


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
import uploadUtils from "../../utils/UploadUtils"
import pako from "pako"
import CrypticoWorker from '../../workers/crypt.worker';
import PromisePool from "es6-promise-pool"

let Base64 = require('js-base64').Base64;


export default {
  name: "fileShare",
  components: {TemplatePage},
  data() {
    return {
      clientId: "",
      fileKeyCode: "",
      password: "0ca175b9c0f726a831d895e269332461",
      uploadProgress: [],
      downloadedUrl: "",
      pageStatus: 0,
      passwordInput: "123456",
      fileList: [],
      fileTotal: "",
      passwordChecked: false,
      webWorker: null,


    };
  },
  mounted: function () {

    this.initDrag();

    console.log("aaa")
    // this.postWebWorkerMessage("encrypt", "aaaa", "1234567890123456").then((res) => {
    //   console.log("ccc" + res)
    // })

  },
  async created() {
    this.webWorker = new CrypticoWorker();

  },
  methods: {
    postWebWorkerMessage(messageType, ...messagePayload) {
      return new Promise((resolve) => {
        let obj = {method: messageType, args: messagePayload}
        this.webWorker.postMessage(obj);
        this.webWorker.addEventListener('message', (response) => {
          resolve(response.data);
        });
      })
    },

    clickJump() {
      this.getQRcode(this.fileKeyCode)
      let routeUrl = this.$router.resolve({
        path: "/downloadShare",
        query: {fileKeyCode: this.fileKeyCode}
      });
      window.open(routeUrl.href, '_blank');
      // window.open(this.downloadedUrl)
    },
    initDrag() {
      this.$refs.select_frame.ondragleave = (e) => {
        e.preventDefault()  // 阻止离开时的浏览器默认行为
      }
      this.$refs.select_frame.ondrop = (e) => {
        e.preventDefault()    // 阻止拖放后的浏览器默认行为
        const data = e.dataTransfer.files  // 获取文件对象
        if (data.length < 1) {
          return  // 检测是否有文件拖拽到页面
        }
        console.log(data)
        this.fileList.push(data)
        this.pageStatus = 1;
        this.reCountFileSize();
        //  this.upload(data)//上传文件的方法
      }
      this.$refs.select_frame.ondragenter = (e) => {
        e.preventDefault()  // 阻止拖入时的浏览器默认行为
        this.$refs.select_frame.border = '2px dashed red'
      }
      this.$refs.select_frame.ondragover = (e) => {
        e.preventDefault()    // 阻止拖来拖去的浏览器默认行为
      }
    },
    getFileSize(file) {
      return FileUtils.getFileSize(file.size)
    },
    onCopy: function (e) {
      this.$message({
        message: 'Successfully copied to pasteboard',
        type: 'success'
      });
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
    ,
    bindQRCode: function () {
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.downloadedUrl,

        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
    },
    uploadFile() {

      this.pageStatus = 2;

      let reqArray = [];
      for (var index in this.fileList) {
        let temp = index;
        let obj = {
          percent: 0,
          isShow: false,
        };
        this.uploadProgress.push(obj);
        reqArray.push(this.uploadSingeFile(this.fileList[index], temp))
      }
      Promise.all(reqArray).then((values) => {
            this.pageStatus = 3;
            this.fileKeyCode = values[0][0].data.message;
            this.getQRcode(this.fileKeyCode);
            setTimeout(() => {
              this.bindQRCode();
            }, 100);

          }
      );

    },
    uploadSingeFile(file, temp) {
      if (file.size > uploadUtils.MaxEncryptSize) {
        return this.uploadWholeFile(file, temp)
      } else {
        return this.uploadChunk(file, temp)
      }

    },
    uploadWholeFile(file, temp) {
      var forms = new FormData()
      forms.append('file', file)
      forms.append('fileName', file.name)
      forms.append('index', 0)
      forms.append('clientId', this.clientId)
      return Request.post("/api/shareFile/uploadChunk", forms, {
        headers: {
          "Content-Type": 'multipart/form-data;boundary = ' + new Date().getTime(),
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            var complete = (((progressEvent.loaded / progressEvent.total) * 100) | 0);
            // console.log(complete + ":" + temp)
            let obj = {
              isShow: false,
              percent: complete
            }
            this.$set(this.uploadProgress, temp, obj);

            if (complete >= 100) {
              obj.isShow = true;
              obj.status = "success";

              this.$set(this.uploadProgress, temp, obj);
            }
          }
        },
      }).then((res) => {
        return new Promise(resolve => resolve(res))
      });
    },
    uploadChunk(file, temp) {
      let singleFileList = uploadUtils.splitFile(file);
      let axiosArray = []
      let allSize = singleFileList.length;
      let currentDone = 0;

      for (var index = 0; index < singleFileList.length; index++) {
        let tempIndex = index;

        let req = this.encrypt(singleFileList[tempIndex].file).then((value) => {
          // console.log("second has done" + new Date())

          var forms = new FormData()
          forms.append('file', value)
          forms.append('fileName', file.name)
          forms.append('index', tempIndex)
          forms.append('clientId', this.clientId)
          return Request.post("/api/shareFile/uploadChunk", forms, {
            headers: {
              "Content-Type": 'multipart/form-data;boundary = ' + new Date().getTime(),
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.lengthComputable) {
                var complete = (((progressEvent.loaded / progressEvent.total) * 100) | 0);
                // console.log(complete + ":" + temp)
                if (complete >= 100) {
                  let obj = {
                    isShow: false,
                  }
                  currentDone = currentDone + 1;
                  let caculate = parseInt((currentDone / allSize) * 100)
                  obj.percent = caculate
                  if (caculate == 100) {
                    obj.isShow = true;
                    obj.status = "success";
                  }
                  this.$set(this.uploadProgress, temp, obj);
                }
              }
            },
          })
        });

        axiosArray.push(req)
      }
      return Request.all(axiosArray);
    },
    getClientId() {
      Request.get("/api/shareFile/getClientID").then(response => {
        if (response.data.resCode == 0) {
          this.clientId = response.data.message;
        }
      })
    }
    ,
    encrypt(file) {
//      return new Promise(resolve => resolve(file))
      //   return this.postWebWorkerMessage("encryptFile", file, this.password)

      return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.readAsArrayBuffer(file);
        fr.onload = function () {
          resolve(fr);
        };
      }).then((reader) => {
        return this.postWebWorkerMessage("encryptFile", reader.result, this.password)
      });
      //   let buffer = Buffer.from(reader.result);
      //   buffer = buffer.toString("base64")
      //   return this.postWebWorkerMessage("encrypt", buffer, this.password).then((entrString) => {
      //     let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(entrString));
      //     var deflateData = pako.deflate(encData, {to: 'string'})
      //
      //     let arra = this.str2ab(deflateData);
      //     var encryptedFile = new File([arra], file.name, null);
      //     console.log("first has done" + new Date())
      //
      //     return new Promise(resolve => resolve(encryptedFile))
      //   })
      // });
    }
    ,
    str2ab(str) {
      var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
      var bufView = new Uint16Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
    ,
    getQRcode(res) {
      if (res === undefined)
        res = 0;
      if (process.env.NODE_ENV === "development") {
        this.downloadedUrl = "http://localhost:8081/#/downloadShare?fileKeyCode=" + res
      } else {
        this.downloadedUrl = "http://lskyy.top/admin/#/downloadShare?fileKeyCode=" + res;
      }
    }
    ,
    deleteFile(fileName) {
      this.fileList = this.fileList.filter(({name}) => name != fileName)
      if (this.fileList.length == 0) {
        this.pageStatus = 0;
      }
      this.reCountFileSize()
    }
    ,
    reCountFileSize() {
      let fileSize = 0;
      this.fileList.forEach(function (val, index, arr) {
        fileSize = val.size + fileSize;
      })

      this.fileTotal = FileUtils.getFileSize(fileSize, 2)
    }
    ,
    fileChange(e) {
      const fu = this.getFile();
      let arr = [...this.fileList, ...fu]
      this.fileList = arr;
      //recount the total size
      this.reCountFileSize();
      this.pageStatus = 1;

    }
    ,
    getFile() {
      var file = document.getElementById('file');
      if (file.files.length == 0) {
        this.$message('No file selected');
        return null;
      }
      return file.files;
    }
    ,
    btnChange() {
      var file = document.getElementById('file');
      file.click();
      this.getClientId()
    }
    ,


  }
}
</script>

<style scoped>
.thirdDiv /deep/ .el-card__body {
  padding: 0px;
}

.realUploadButtonDiv {
  margin-top: 20px;
  margin-bottom: 20px;
}

.fileDesCls {
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px;

}

.realUploadButtonCls {
  width: 100%;
}

.passwordCls {
  text-align: left;
  margin-top: 10px;
}

.passwordCls /deep/ .el-checkbox {
  font-weight: 600;
  font-size: 18px;
}

.leftDiv {
  border: 2px dashed #ccc;
  margin: 4px;
  padding: 16px;
  border-color: #d7d7db;
}

.expireCls {
  margin-top: 20px;
  text-align: left;
}

.cardList {
  height: 300px;
  overflow: auto;
}

.countRow {
  margin-top: 30px;
  margin-right: 40px;
  margin-left: 40px;
  padding-bottom: 10px;
}

.innerDiv {
  margin-top: 200px;
  margin-bottom: 200px;
}

.uploadHiddenCls {
  background-color: #f9f9fa;
  padding-top: 20px;
  padding-bottom: 20px;
}

.hiddMainCls {
  font-weight: 550;
}

.hiddMainCls /deep/ .el-card__body {
  padding: 0px;
}

.hiddMainCls /deep/ .el-button {
  font-weight: 550;
}

.listItemcls {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: left;
}

.listItemcls /deep/ .el-row {
  margin-bottom: 0px;
}

.plsIcon {
  font-size: 50px;
  color: #3a8ee6;
  margin-bottom: 10px;
}

.dragTextCls {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.orTextCls {
  margin-bottom: 20px;
}
</style>