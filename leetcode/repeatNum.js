// 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
// 示例:
// 输入: 38
// 输出: 2
// 解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
// 进阶:
// 你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗
// 方法一：使用do while方法 ，但这种方法超出了时间复杂度的限制
// 知识点：
// toString()：把一个逻辑值转为字符串并返回结果
// split()：把一个字符串分割成一个字符串数组
// reduce():接收一个函数作为累加器，数组中的每个值从左到右开始缩减，最后变成一个值。
// 该方法对于空数组是不会执行回调函数的，回调函数接收四个参数，依次是：初始或计算结束之后的返回值，当前元素值，当前元素索引值，当前元素所属数组对象。
// parseInt()：解析一个字符串并返回一个整数，接收两个参数，依次是：要解析的字符串和要解析的数字的基数（可选，值在2  ~36之间）。
// 代码：
let addDigits = function (num) {
    do {
        let res = num.toString().split("").reduce((a, b) => {
                return parseInt(a) + parseInt(b)
            }
        }
        while (num < 10) {
            return res
        }
    }
// 方法二：使用数字根来做。
// 知识点：
// 数字根：就是把一个自然数的各个数位相加，再将所得数的各个数位相加，直到所得数为一位为止。
// eg：198的数字根是9，因为1+8+9=18，1+8=9
// 代码：
let addDigits = function (num) {
    if (num < 9) return num;
    return num % 9 === 0 ? 9 : num % 9
}