// 用正则表达式检验一个字符串 是否首尾都含有数字
function checkNum(str) {
    let reg = /^\d[\s\S]*\d$/g;
    console.log(reg.test(str))
}
let str = '123adc890';
checkNum(str)