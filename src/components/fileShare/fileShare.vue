<template>
  <div>
    <el-card class="box-card">
      <template v-if="pageStatus==3">
        <el-row>
          <el-col :span="12">
            <div class="leftDiv"
                 v-if="pageStatus==0">
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

                <input type="file"
                       id="file"
                       hidden
                       @change="fileChange"
                       multiple>
                　
                <el-button type="primary"
                           @click="btnChange">Chose File</el-button>

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
                              <span style="font-weight: normal">2.3MB</span>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="2"
                                :offset="11"
                                style="margin-top: 10px">
                          <el-button type="text"
                                     icon="el-icon-close"
                                     style="font-size: 30px;color: gray"></el-button>
                          <!--                        <el-button type="info" icon="el-icon-close" circle></el-button>-->
                        </el-col>
                      </el-row>
                    </el-card>
                  </div>
                  <div class="countRow">
                    <el-row>
                      <el-col :span="6">
                        <el-button type="primary"
                                   icon="el-icon-circle-plus-outline">select files to upload</el-button>
                      </el-col>
                      <el-col :span="6"
                              :offset="12">
                        <span style="font-size: 20px">total:36M</span>
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
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
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
                             @click="uploadFile">Upload</el-button>

                </div>
              </div>
            </div>
            <div v-if="pageStatus==2">
              <div class="thirdDiv">

                <el-card class="listItemcls"
                         v-for="(item,i) in fileList"
                         :key="i">
                  <div style="margin-left:20px">
                    <el-row>
                      <el-col :span="2"
                              style="margin-top: 20px">
                        <span class="fa fa-file-text"
                              style="color: #3a8ee6;font-size: 35px"></span>
                      </el-col>
                      <el-col :span="20">
                        <div class="fileDesCls">
                          <span>{{ item.name }}</span>
                          <div style="margin-top: 5px">
                            <span style="font-weight: normal">2.3MB</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-progress :percentage="0"></el-progress>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2"
                              :offset="21">
                        <el-button type="text">cancel</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">ttt</div>
          </el-col>
        </el-row>
      </template>
      <div v-if="pageStatus==0"
           style="min-height:500px;padding:200px">

        <span style="font-weight:600;font-size:30px;">你的文件已加密并可以发送</span>
        <el-row>
          <el-col :span="8"
                  :offset="8">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8"
                  :offset="8">
            <el-button type="primary"
                       style="width:100%">复制链接</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8"
                  :offset="8">
            <el-button type="text"
                       style="width:100%">确定</el-button>
          </el-col>
        </el-row>

      </div>

    </el-card>

  </div>
</template>

<script>
import Request from "../../utils/axiosUtils";

export default {
  name: "fileShare",
  data () {
    return {
      pageStatus: 0,
      passwordInput: "",
      fileList: [],
      passwordChecked: false,

    };
  },
  methods: {
    uploadFile () {
      this.pageStatus = 2;
    },
    deleteFile () {
    },
    fileChange (e) {
      const fu = this.getFile();
      let array = [...this.fileList, ...fu]
      this.fileList = array
      this.pageStatus = 1;
      console.log(fu)
    },
    getFile () {
      var file = document.getElementById('file');
      if (file.files.length == 0) {
        this.$message('没有选择文件');
        return null;
      }
      return file.files;
    },
    btnChange () {
      var file = document.getElementById('file');
      file.click();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    upLoadSuccess (response, file, fileList) {
      console.log(response)
      if (response.responseCode === 0) {
      }
    },

    clickSavePdf () {
      let obj = {}

      obj["fileKeyCode"] = "a18f7f13";

      Request.post("/api/shareFile/download-user-file", obj, {
        responseType: "blob"
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          let fileName = response.headers["share-file-name"]
          var blob = new Blob([response.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = decodeURIComponent(fileName); //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象

          console.log(response);
          //    console.log(response);
        })
        .catch(response => {
          console.log(response);
        });
      console.log(this.allData);
      console.log("cccccc");
    }
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