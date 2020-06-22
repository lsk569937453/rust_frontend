<template>
    <div>
        <el-main>
            <el-row :gutter="20">

                <el-col :span="12">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Your details</span>

                        </div>
                        <el-row>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Your full name</span>

                                </div>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            Family name：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="inputFamilyName" placeholder="请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            Given names：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="inputGivenName" placeholder="请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>

                        <el-row style="margin-top:10px">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span> Date of birth：</span>
                                    <el-input v-model="inputDateBirth" placeholder="请输入内容">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>

                                </div>
                            </el-card>
                        </el-row>
                        <el-row style="margin-top: 10px">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Place of birth</span>
                                </div>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            Town/city：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="inputCityBirth" placeholder="请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            Country：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="inputCountryBirty" placeholder="请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>
                        <el-row style="margin-top: 10px">
                            <el-card>
                                <el-checkbox-group v-model="maritalStatus">
                                    <el-checkbox label="Married"></el-checkbox>
                                    <el-checkbox label="Separated"></el-checkbox>
                                    <el-checkbox label="Never married or been in a de facto relationship"></el-checkbox>
                                    <el-checkbox label="Engaged"></el-checkbox>
                                    <el-checkbox label="Divorced"></el-checkbox>
                                    <el-checkbox label="De facto"></el-checkbox>
                                    <el-checkbox label="Windowed"></el-checkbox>
                                </el-checkbox-group>
                            </el-card>
                        </el-row>
                    </el-card>

                </el-col>

                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-row>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Your current resident address</span>
                                    <br>
                                    <span>A post office box address is not acceptable as a residential address</span>
                                </div>
                                <el-row>
                                    <el-input
                                            type="textarea"
                                            placeholder="请输入内容"
                                            v-model="textareaResidentAddress"
                                            maxlength="30"
                                            show-word-limit
                                    >
                                    </el-input>

                                </el-row>

                            </el-card>
                        </el-row>
                        <el-row style="margin-top: 10px">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>address for correspondence</span>
                                </div>
                                <el-row>
                                    <el-input
                                            type="textarea"
                                            placeholder="请输入内容"
                                            v-model="textareaAddressForResponse"
                                            maxlength="30"
                                            show-word-limit
                                    >
                                    </el-input>

                                </el-row>

                            </el-card>
                        </el-row>
                        <el-row style="margin-top: 10px">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Your telephone   numbers </span>
                                </div>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            office hours ：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-row>
                                            <el-col :span="4">
                                                <el-input
                                                        placeholder="country code"

                                                        v-model="officeHoursCountryCode">
                                                </el-input>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-input
                                                        placeholder="area code"
                                                        v-model="officeHoursAreaCode">
                                                </el-input>
                                            </el-col>
                                            <el-col :span="16">
                                                <el-input
                                                        placeholder="number"
                                                        v-model="officeHoursNumbers">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            After hours ：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-row>
                                            <el-col :span="4">
                                                <el-input
                                                        placeholder="country code"
                                                        v-model="afterHoursCountryCode">
                                                </el-input>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-input
                                                        placeholder="area code"
                                                        v-model="afterHoursAreaCode">
                                                </el-input>
                                            </el-col>
                                            <el-col :span="16">
                                                <el-input
                                                        placeholder="number"
                                                        v-model="afterHoursNumber">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>
                        <el-row style="margin-top: 10px">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Do you agree to the department communicating with you by fax,email or other electronic means?</span>
                                    <el-radio v-model="radio" label="1">No</el-radio>
                                    <el-radio v-model="radio" label="2">Yes</el-radio>
                                </div>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            fax number ：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-row>
                                            <el-col :span="4">
                                                <el-input
                                                        placeholder="country code"

                                                        v-model="faxNumberCountryCode">
                                                </el-input>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-input
                                                        placeholder="area code"

                                                        v-model="faxNumberAreaCode">
                                                </el-input>
                                            </el-col>
                                            <el-col :span="16">
                                                <el-input
                                                        placeholder="number"

                                                        v-model="faxNumberRealNumber">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4">
                                        <p class="demo-input-suffix">
                                            Email address：
                                        </p>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input

                                                placeholder="请输入内容"
                                                v-model="emailAddress"
                                                maxlength="30"

                                        >
                                        </el-input>
                                    </el-col>
                                </el-row>

                            </el-card>
                        </el-row>
                    </div>
                </el-col>

                <!--        <el-col :span="12">-->
                <!--            <div class="grid-content bg-purple-light">-->
                <!--                <el-row>-->
                <!--                    <el-card class="box-card">-->
                <!--                        <div slot="header" class="clearfix">-->
                <!--                            <span>your full name</span>-->
                <!--                        </div>-->
                <!--                        <el-row>-->
                <!--                            <el-col :span="4">-->
                <!--                                <p class="demo-input-suffix">-->
                <!--                                    slot 方式：-->
                <!--                                </p>-->
                <!--                            </el-col>-->
                <!--                            <el-col :span="20">-->
                <!--                                <el-input v-model="input" placeholder="请输入内容">-->
                <!--                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                <!--                                </el-input>-->
                <!--                            </el-col>-->
                <!--                        </el-row>-->
                <!--                        <el-row>-->
                <!--                            <el-col :span="4">-->
                <!--                                <p class="demo-input-suffix">-->
                <!--                                    slot 方式：-->
                <!--                                </p>-->
                <!--                            </el-col>-->
                <!--                            <el-col :span="20">-->
                <!--                                <el-input v-model="input" placeholder="请输入内容">-->
                <!--                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                <!--                                </el-input>-->
                <!--                            </el-col>-->
                <!--                        </el-row>-->
                <!--                    </el-card>-->

                <!--                   -->
                <!--                </el-row>-->
                <!--            </div>-->
                <!--        </el-col>-->

            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <el-button type="primary" style="width: 40%" @click="clickSave">save</el-button>
                </el-col>

            </el-row>
        </el-main>
    </div>


</template>

<script>
    import Request from "../utils/axiosUtils"

    export default {
        name: "MainPage",
        data() {
            return {
                radio: '1',
                inputFamilyName: '',
                inputGivenName: '',
                inputCityBirth: '',
                maritalStatus: [],
                textareaResidentAddress: '',
                textareaAddressForResponse: '',
                officeHoursAreaCode: '',
                officeHoursNumbers: '',
                afterHoursCountryCode: '',
                afterHoursAreaCode: '',
                afterHoursNumber: '',
                faxNumberCountryCode: '',
                faxNumberAreaCode: '',
                faxNumberRealNumber: '',
                emailAddress: '',
                inputDateBirth: '',
                inputCountryBirty: '',
                officeHoursCountryCode: '',
            }
        },
        methods: {

            convertMarryState() {
                var result = [];
                this.maritalStatus.forEach((item, index, array) => {
                    //执行代码


                    switch (item) {
                        case 'Married':
                            result.push(0);
                            break;
                        case 'Separated':
                            result.push(1);
                            break;
                        case 'Never married or been in a de facto relationship':
                            result.push(2);
                            break;
                        case 'Engaged':
                            result.push(3);
                            break;
                        case 'Divorced':
                            result.push(4);
                            break;
                        case 'De facto':
                            result.push(5);
                            break;
                        case 'Windowed':
                            result.push(6);
                            break;
                        default:
                            break;
                    }
                });
                return result;
            },
            clickSave() {
                console.log("ccccccc");
                var data = {
                    radio: this.radio,
                    inputFamilyName: this.inputFamilyName,
                    inputGivenName: this.inputGivenName,
                    inputCityBirth: this.inputCityBirth,
                    maritalStatus: this.convertMarryState(),
                    textareaResidentAddress: this.textareaResidentAddress,
                    textareaAddressForResponse: this.textareaAddressForResponse,
                    officeHoursAreaCode: this.officeHoursAreaCode,
                    officeHoursNumbers: this.officeHoursNumbers,
                    afterHoursCountryCode: this.afterHoursCountryCode,
                    afterHoursAreaCode: this.afterHoursAreaCode,
                    afterHoursNumber: this.afterHoursNumber,
                    faxNumberCountryCode: this.faxNumberCountryCode,
                    faxNumberAreaCode: this.faxNumberAreaCode,
                    faxNumberRealNumber: this.faxNumberRealNumber,
                    emailAddress: this.emailAddress,
                    inputDateBirth: this.inputDateBirth,
                    inputCountryBirty: this.inputCountryBirty,
                    officeHoursCountryCode: this.officeHoursCountryCode,
                };
                Request.post('/api/saveData', data, {responseType: 'blob'}).then((response) => {

                    var blob = new Blob([response.data]);
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = '用户数据.pdf'; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象

                    console.log(response);


                }).catch((response) => {
                    console.log(response);
                })
            }
        }
    }
</script>

<style scoped>

</style>
