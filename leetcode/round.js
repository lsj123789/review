// 背景：round函数 只能取整  能返回number类型

//           tofixed函数 能取小数  但返回string类型

/*

num:要处理的数

d:小数位数，支持负数

*/

function round(num, d) {
    num = num * Math.pow(10, d)
    num = Math.round(num)
    num = num / Math.pow(10, d)
    return num
}