import Request from "./axiosUtils";

var cloneUtils = {
    checkedType: function checkedType(target) {
        return Object.prototype.toString.call(target).slice(8, -1); //返回检测的数据类型
    },
    clone:

        function clone(target) {
            //判断拷贝的数据类型
            //初始化变量result 成为最终克隆的数据
            let result, targetType = this.checkedType(target);
            if (targetType === 'Object') {
                result = {}
            } else if (targetType === 'Array') {
                result = []
            } else {
                return target;
            }
            //遍历目标数据
            for (let i in target) {
                //获取遍历数据结构的每一项值
                let value = target[i];
                //判断目标结构里的每一项值是否存在对象/数组
                if (this.checkedType(value) === 'Object' || this.checkedType(value) === 'Array') {
                    //继续遍历获取到的value值
                    result[i] = clone(value);
                } else { //获取到的value值是基本的数据类型或者是函数
                    result[i] = value;
                }
            }
            return result;
        }
};
export default cloneUtils
