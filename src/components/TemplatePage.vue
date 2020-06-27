<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Your details</span>
          </div>
          <el-row
            v-for="(item,i) in allData.leftCardDataList"
            :key="item.cardId"
            style="margin-top: 10px"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{item.headerData}}</span>
              </div>

              <el-row
                v-for="(rowitem,i) in  item.rowList"
                :key="rowitem.rowId"
                style="margin-top: 10px"
              >
                <template v-if="rowitem.rowType===0">
                  <el-col :span="4">
                    <p class="demo-input-suffix">{{rowitem.rowStart}}</p>
                  </el-col>
                  <el-col :span="20">
                    <el-input v-model="rowitem.inputValue" placeholder="请输入内容">
                      <i slot="prefix"></i>
                    </el-input>
                  </el-col>
                </template>
                <template v-if="rowitem.rowType===1">
                  <el-col :span="24">
                    <el-input v-model="rowitem.inputValue">
                      <i slot="prefix"></i>
                    </el-input>
                  </el-col>
                </template>
                <template v-if="rowitem.rowType===2">
                  <el-row>
                    <el-col
                      :span="24/rowitem.rowItemList.length"
                      v-for="(rowBatchItem,i) in rowitem.rowItemList"
                      :key="rowBatchItem.rowItemId"
                    >
                      <el-input
                        :placeholder="rowBatchItem.rowItemText"
                        @input="sectionInputchangeEvent"
                        v-model="rowBatchItem.rowItemTextValue"
                      >
                        <i slot="prefix"></i>
                        <!--                                                    v-model="rowBatchItem.rowItemTextValue">-->
                      </el-input>
                    </el-col>
                  </el-row>
                </template>
              </el-row>

              <el-row v-if="item.radioVList">
                <el-radio-group
                  :value="item.radioVList"
                  @input="radioWidgetUpdate(item.cardId,$event)"
                  v-for="(rowitem,i) in  item.rowList"
                  :key="rowitem.rowId"
                >
                  <el-radio
                    :label="''+rowitem.rowValue"
                    style="margin-right: 10px"
                  >{{rowitem.rowText}}</el-radio>
                </el-radio-group>
              </el-row>
            </el-card>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Your details</span>
          </div>
          <el-row
            v-for="(item,i) in allData.rightCardDataList"
            :key="item.cardId"
            style="margin-top: 10px"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{item.headerData}}</span>
              </div>

              <el-row
                v-for="(rowitem,i) in  item.rowList"
                :key="rowitem.rowId"
                style="margin-top: 10px"
              >
                <template v-if="rowitem.rowType===0">
                  <el-col :span="4">
                    <p class="demo-input-suffix">{{rowitem.rowStart}}</p>
                  </el-col>
                  <el-col :span="20">
                    <el-input v-model="rowitem.inputValue" placeholder="请输入内容">
                      <i slot="prefix"></i>
                    </el-input>
                  </el-col>
                </template>
                <template v-if="rowitem.rowType===1">
                  <el-col :span="24">
                    <el-input v-model="rowitem.inputValue">
                      <i slot="prefix"></i>
                    </el-input>
                  </el-col>
                </template>
                <template v-if="rowitem.rowType===2">
                  <el-row>
                    <el-col
                      :span="24/rowitem.rowItemList.length"
                      v-for="(rowBatchItem,i) in rowitem.rowItemList"
                      :key="rowBatchItem.rowItemId"
                    >
                      <el-input
                        :placeholder="rowBatchItem.rowItemText"
                        @input="sectionInputchangeEvent"
                        v-model="rowBatchItem.rowItemTextValue"
                      >
                        <i slot="prefix"></i>
                        <!--                                                    v-model="rowBatchItem.rowItemTextValue">-->
                      </el-input>
                    </el-col>
                  </el-row>
                </template>
              </el-row>

              <el-row v-if="item.radioVList">
                <el-radio-group
                  :value="item.radioVList"
                  @input="radioWidgetUpdate(item.cardId,$event)"
                  v-for="(rowitem,i) in  item.rowList"
                  :key="rowitem.rowId"
                >
                  <el-radio :label="''+rowitem.rowValue">{{rowitem.rowText}}</el-radio>
                </el-radio-group>
              </el-row>
            </el-card>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-button type="primary" style="width: 40%" @click="clickSavePdf">save</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "TemplatePage",
  data() {
    return {
      allData: {
        leftCardDataList: [
          {
            headerData: "",
            cardId: -1,
            rowList: []
          }
        ],
        rightCardDataList: [
          {
            headerData: "",
            cardId: -2,
            rowList: []
          }
        ]
      }
    };
  },
  methods: {
    guid() {
      console.log("ccccccccc");
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    radioWidgetUpdate(cardId, value) {
      console.log("==============");
      this.allData.leftCardDataList.forEach(item =>
        this.updateRadio(item, cardId, value)
      );
      this.allData.rightCardDataList.forEach(item =>
        this.updateRadio(item, cardId, value)
      );
      this.$forceUpdate();
    },
    updateRadio(item, cardId, value) {
      if (item.cardId === cardId) {
        item.radioVList = value;
      }
    },
    clickSavePdf() {
      var fileCode = this.$route.query.fileCode;

      this.allData["fileCode"] = fileCode;

      console.log("ccswd1231");

      Request.post("/api/saveDataToTemplate", this.allData, {
        responseType: "blob"
      })
        .then(response => {
          var blob = new Blob([response.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "用户数据cc.pdf"; //下载后文件名
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
  },
  mounted() {
    //页面初始化方法

    var realCode = this.$route.query.realCode;
    Request.post("/api/initPageUseTemplate", { templateCode: realCode }).then(
      response => {
        if (response.data.responseCode === 0) {
          this.allData = JSON.parse(response.data.responseBody.tempalte);

          this.allData.leftCardDataList = this.allData.leftCardDataList.filter(
            function(x) {
              if (x.cardId === -1) return false;
              else return x;
            }
          );
          this.allData.rightCardDataList = this.allData.rightCardDataList.filter(
            function(x) {
              if (x.cardId === -2) return false;
              else return x;
            }
          );

          console.log(this.allData);
        }
      }
    );
  }
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
</style>