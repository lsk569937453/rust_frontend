<template>
    <el-main>
        <el-row :gutter="20">

            <el-col :span="12">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Your details</span>

                    </div>
                    <el-row v-for="(item,i) in allData.leftCardDataList" :key="item.cardId" style="margin-top: 10px">
                        <el-card class="box-card">

                            <div slot="header" class="clearfix">
                                <el-dropdown @command="handleCommand">
                                    <el-button type="primary" icon="el-icon-plus" circle></el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-plus" command="addLeftCard">添加card
                                        </el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-minus" command="deleteLeftCard">删除card
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <el-dropdown @command="handleCommand" v-if="item.cardId!==-1">
                                    <el-button type="primary" icon="el-icon-help" circle></el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-plus" :command="addRowCommand(item.cardId) ">
                                            添加行数据
                                        </el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-minus" command="deleteRow">删除行数据
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <!--                                <el-button type="primary" icon="el-icon-s-help" circle></el-button>-->
                                <!--                                <el-button type="primary" icon="el-icon-picture-outline-round" circle></el-button>-->
                                <!--                                <el-button type="primary" icon="el-icon-camera" circle></el-button>-->
                                <span>{{item.headerData}}</span>

                            </div>

                            <el-row v-for="(rowitem,i) in  item.rowList" :key="rowitem.rowId" style="margin-top: 10px">
                                <template v-if="rowitem.rowType===0">
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            {{rowitem.rowStart}}
                                        </p>
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
                                        <el-col :span="24/rowitem.rowItemList.length"
                                                v-for="(rowBatchItem,i) in rowitem.rowItemList"
                                                :key="rowBatchItem.rowItemId">
                                            <el-input
                                                    :placeholder="rowBatchItem.rowItemText"
                                                    @input="sectionInputchangeEvent"

                                                    v-model="rowBatchItem.rowItemTextValue">
                                                <i slot="prefix"></i>
                                                <!--                                                    v-model="rowBatchItem.rowItemTextValue">-->
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </template>
                            </el-row>

                            <el-row v-if="item.radioVList">
                                <el-radio-group :value="item.radioVList" @input="radioWidgetUpdate(item.cardId,$event)"
                                                v-for="(rowitem,i) in  item.rowList" :key="rowitem.rowId">
                                    <el-radio :label="''+rowitem.rowValue" style="margin-right: 10px">
                                        {{rowitem.rowText}}
                                    </el-radio>

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
                    <el-row v-for="(item,i) in allData.rightCardDataList" :key="item.cardId" style="margin-top: 10px">
                        <el-card class="box-card">

                            <div slot="header" class="clearfix">
                                <el-dropdown @command="handleCommand">
                                    <el-button type="primary" icon="el-icon-plus" circle></el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-plus" command="addRightCard">添加card
                                        </el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-minus" command="deleteLeftCard">删除card
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <el-dropdown @command="handleCommand" v-if="item.cardId!==-2">
                                    <el-button type="primary" icon="el-icon-help" circle></el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-plus" :command="addRowCommand(item.cardId) ">
                                            添加行数据
                                        </el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-minus" command="deleteRow">删除行数据
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <!--                                <el-button type="primary" icon="el-icon-s-help" circle></el-button>-->
                                <!--                                <el-button type="primary" icon="el-icon-picture-outline-round" circle></el-button>-->
                                <!--                                <el-button type="primary" icon="el-icon-camera" circle></el-button>-->
                                <span>{{item.headerData}}</span>

                            </div>

                            <el-row v-for="(rowitem,i) in  item.rowList" :key="rowitem.rowId" style="margin-top: 10px">
                                <template v-if="rowitem.rowType===0">
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            {{rowitem.rowStart}}
                                        </p>
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
                                        <el-col :span="24/rowitem.rowItemList.length"
                                                v-for="(rowBatchItem,i) in rowitem.rowItemList"
                                                :key="rowBatchItem.rowItemId">
                                            <el-input
                                                    :placeholder="rowBatchItem.rowItemText"
                                                    @input="sectionInputchangeEvent"

                                                    v-model="rowBatchItem.rowItemTextValue">
                                                <i slot="prefix"></i>
                                                <!--                                                    v-model="rowBatchItem.rowItemTextValue">-->
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </template>
                            </el-row>

                            <el-row v-if="item.radioVList">
                                <el-radio-group :value="item.radioVList" @input="radioWidgetUpdate(item.cardId,$event)"
                                                v-for="(rowitem,i) in  item.rowList" :key="rowitem.rowId">
                                    <el-radio :label="''+rowitem.rowValue">
                                        {{rowitem.rowText}}
                                    </el-radio>

                                </el-radio-group>
                            </el-row>

                        </el-card>
                    </el-row>
                </el-card>

            </el-col>

        </el-row>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <el-button type="primary" style="width: 40%" @click="clickSaveTemplate">save</el-button>
            </el-col>

        </el-row>

        <el-dialog
                title="标题配置"
                :visible.sync="cardDialogFormVisible">
            <el-main>
                <el-input v-model="cardTableData.input" placeholder="请输入内容"></el-input>

            </el-main>
            <span slot="footer" class="dialog-footer">
    <el-button @click="cardDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="cardDialogConfirm">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog title="数据配置" :visible.sync="dialogFormVisible">
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-dropdown @command="handleDialogCommand">
<span class="el-dropdown-link">
文本行<i class="el-icon-arrow-down el-icon--right"></i>
</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="0">文本行</el-dropdown-item>
                                <el-dropdown-item command="1">无头文本</el-dropdown-item>
                                <el-dropdown-item command="2">多段文本</el-dropdown-item>
                                <el-dropdown-item command="3">单选</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </div>
                    <el-row>
                        <el-table
                                :data="dialogTableData"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="行类型"
                                    prop="rowHeader"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="行开头"
                            >
                                <template slot-scope="scope">
                                    <el-input v-show="true" v-model="scope.row.rowStart" placeholder="请输入行开头"
                                              v-if="scope.row.rowType=== 0"/>
                                    <span v-else>无</span>
                                </template>
                            </el-table-column>
                            <template v-if="dialogTableHeaderType===0">
                                <el-table-column
                                        prop="rowText"
                                        label="行底部text"

                                >
                                    <template slot-scope="scope">
                                        <el-input v-show="true" v-model="scope.row.rowText" placeholder="请输入行底部text"
                                                  v-if="scope.row.rowType=== 2"/>
                                        <span v-else>无</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="行在pdf中的值">
                                    <template slot-scope="scope">
                                        <el-input v-show="true" v-model="scope.row.rowValue"
                                                  placeholder="请输入行在pdf中的数字"/>
                                    </template>

                                </el-table-column>
                            </template>
                            <template v-if="dialogTableHeaderType===1">
                                <el-table-column
                                        prop="radioName"
                                        label="单选框名称"

                                        :key="Math.random()">
                                    <template slot-scope="scope">
                                        <el-input v-show="true" v-model="scope.row.rowText" placeholder="请输入行单选框名称"
                                        />

                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="请测试该项"
                                        :key="Math.random()">
                                    <template slot-scope="scope">
                                        <el-cascader
                                                v-model="scope.row.rowValue"
                                                :options="sectionSelectoptions"
                                                :props="{ expandTrigger: 'hover' }"
                                                @change="radioChangeEvent"

                                        >

                                        </el-cascader>
                                    </template>

                                </el-table-column>
                            </template>
                            <el-table-column
                            >
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-minus" circle></el-button>
                                </template>

                            </el-table-column>
                        </el-table>

                    </el-row>


                </el-card>

            </el-main>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>


</template>

<script>
    import Request from "../utils/axiosUtils"

    export default {
        name: "MainNewPage",
        mounted(){
            var  fileCode=this.$route.query.fileCode

            Request.post('/api/test/getTemplateField', {fileCode:fileCode}, ).then((response) => {
                console.log(response);
                if(response.data.responseCode===0){
                    var newOptions=[];
                    response.data.responseBody.forEach((item)=>{
                        var children=[];
                        item.children.forEach((index)=>{
                            var newChild={
                                value:item.fieldName+"--"+index,
                                label:item.fieldName+"--"+index,

                            }
                                children.push(newChild);
                        });

                        var data={
                            label :item.fieldName,
                            value:item.fieldName,
                            children:children,
                        };

                        newOptions.push(data);
                    });
                    this.sectionSelectoptions=newOptions;
                    console.log(newOptions);

                }
                //    console.log(response);


            }).catch((response) => {


                console.log(response);
            })

        },
        data() {
            return {
                currenAddCardStata:0,
                sectionSelectoptions: [{
                    value: 'HTML',
                    label: 'HTML',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                    }]
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
                sectionSelectValue: [],
                //行配置dialog
                dialogFormVisible: false,
                //card配置
                cardDialogFormVisible: false,


                dialogAddVisible: 0,
                //行配置的数据表
                dialogTableData: [],
                cardTableData: {
                    input: ""
                },
                currentCardId: '',
                //默认为0.若为1则代表单选框
                dialogTableHeaderType: 0,
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
                            cardId:-2,
                            rowList: []
                        }
                    ]
                }
            }
        },
        methods:
            {
                cardDialogConfirm() {
                    this.cardDialogFormVisible = false;

                    var data={
                        headerData: this.cardTableData.input,
                        cardId: this.guid(),
                        rowList: []
                    };
                    if(this.currenAddCardStata==0)
                    {
                        this.allData.leftCardDataList.push(data);
                    }else{
                        this.allData.rightCardDataList.push(data);
                    }

                },
                radioWidgetUpdate(cardId, value) {
                    console.log("==============")
                    this.allData.leftCardDataList.forEach((item) => this.updateRadio(item, cardId,value));
                    this.allData.rightCardDataList.forEach((item) => this.updateRadio(item, cardId,value));
                    this.$forceUpdate();

                },
                updateRadio(item, cardId,value) {

                    if (item.cardId === cardId) {
                        item.radioVList = value;
                    }
                },
                radioChangeEvent() {
                    this.$forceUpdate();
                },
                //强制更新
                sectionInputchangeEvent() {
                    this.$forceUpdate();
                },
                handleDialogCommand(command) {
                    var data = {};
                    console.log(command);
                    if (command === "0") {
                        this.dialogTableHeaderType = 0;
                        data = {
                            "rowHeader": "文本行",
                            "rowType": 0,
                            "rowStart": '',
                            "rowValue": ""
                        }
                    } else if (command === "1") {
                        this.dialogTableHeaderType = 0;
                        data = {
                            "rowHeader": "无头文本",
                            "rowType": 1,
                            "rowStart": '',
                            "rowValue": ""
                        }
                    } else if (command === "2") {
                        this.dialogTableHeaderType = 0;
                        data = {
                            "rowHeader": "多段文本",
                            "rowType": 2,
                            "rowStart": '',
                            "rowDataList": [
                                {
                                    "itemValue": 1,
                                    "itemHintText": 2
                                }
                            ]
                        }
                    } else if (command === "3") {
                        this.dialogTableHeaderType = 1;
                        data = {
                            "rowHeader": "单选框",
                            "rowType": 3,
                            "rowValue": "",
                            "rowId": this.guid()
                        }
                    }
                    this.dialogTableData.push(data);
                }
                ,
                //确认框输入
                dialogConfirm() {
                    this.handleData();
                    this.allData.leftCardDataList.forEach((item, index, array) => this.forloopTheArray(item, index, array));
                    this.allData.rightCardDataList.forEach((item, index, array) => this.forloopTheArray(item, index, array));
                    this.dialogFormVisible = false;

                    console.log("abababaab");
                }
                ,

                handleData() {
                    this.dialogTableData.forEach((item, index, array) => {
                        if (item.rowType === 2) {
                            var rowTextArray = item.rowText.split(",");
                            var rowTextLength = rowTextArray.length;
                            var rowValueArray = item.rowValue.split(",");
                            var rowValueLength = rowValueArray.length;

                            if (rowTextLength !== rowValueLength) {
                                alert("段文本的单元格长度和value长度不一致");
                            }
                            ;
                            item.rowItemList = [];
                            for (var i = 0; i < rowTextLength; i++) {
                                item.rowItemList.push({
                                    rowItemText: rowTextArray[i],
                                    rowItemValue: rowValueArray[i],
                                    rowItemTextValue: "",
                                    rowItemId: this.guid(),
                                });
                            }
                        }
                        ;

                    });
                },

                forloopTheArray(item, index, array) {

                    if (item.cardId === this.currentCardId) {

                        for (var j = 0, len = this.dialogTableData.length; j < len; j++) {
                            var data = this.dialogTableData[j];
                            if (data.rowType === 3) {
                                data.rowValue=data.rowValue.filter(function(x) {
                                    if(x.indexOf("--")>0)
                                        return  x;
                                    else return  false;
                                })[0];
                                console.log("嘿嘿");
                                if (item.radioVList === undefined) {
                                    item.radioVList = data.rowValue;
                                    //      item.radioVList="";

                                }

                            }

                            data.rowId = this.guid();
                            item.rowList.push(
                                data
                            );


                        }
                    }
                    console.log(this.leftCardDataList);
                    //执行代码


                },
                addLeftCard() {
                    this.currenAddCardStata=0;
                    this.cardDialogFormVisible = true;
                }
                ,
                addRightCard() {
                    this.currenAddCardStata=1;
                    this.cardDialogFormVisible = true;
                }
                ,
                clickSaveTemplate() {
                    var  fileCode=this.$route.query.fileCode
                    Request.post('/api/saveTemplate', {postData:JSON.stringify(this.allData),fileCode:fileCode}, ).then((response) => {
                        console.log(response);
                        if(response.data.responseCode===0){
                            console.log("aaassssa");
                            this.$router.push({  //核心语句
                                path: '/realPage',   //跳转的路径
                                query: {           //路由传参时push和query搭配使用 ，作用时传递参数
                                    realCode: response.data.responseBody,
                                    fileCode:this.$route.query.fileCode
                                }
                            })
                        }
                    //    console.log(response);


                    }).catch((response) => {


                        console.log(response);
                    })
                },
                addRowCommand(cardId) {
                    return {
                        'operation': 'addRow',
                        'cardid': cardId
                    };
                }
                ,
                addRow(cardID) {

                    this.dialogTableData = [];
                    this.currentCardId = cardID;
                    this.dialogFormVisible = true;

                }
                ,
                handleCommand(command) {
                    console.log(command);
                    if (command === 'addLeftCard')
                        this.addLeftCard();
                    else if(command==='addRightCard')
                        this.addRightCard();
                    else if (command['operation'] === "addRow") {
                        this.addRow(command['cardid']);

                    }
                }
                ,
                guid() {
                    console.log("ccccccccc");
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0,
                            v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }


            }
    }
</script>

<style scoped>

</style>
