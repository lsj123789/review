// 给定一个字符串 S 和一个字符 C。返回一个代表字符串 S 中每个字符到字符串 S 中的字符 C 的最短距离的数组。
// 示例 1:
// 输入: S = "loveleetcode", C = 'e'
// 输出: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]
// 方法一：ES6方法
// 分析：首先把字符串转为数组，数组遍历，找到C在S中出现的位置，然后遍历字符串，将当前位置与C在S中出现的位置相减取绝对值再取最小值。
// 知识点：
// split()：把字符串分割成字符串数组
// Math.min()：返回0个或更多个数值的最小值，如果任一参数不能转化为数值，则返回NaN。
// Math.abs()：返回一个数的绝对值。
// 代码：
let shortestToChar = function (S, C) {
    let indexs = S.split("").map((item, index) => {
        return item === C ? index : null
    }).filter(item => {
        return item !== null
    })
    let res = S.split("").map((_, index) => {
        return Math.min(...indexs.map(item) => {
            return Math.abs(item - index)
        })
    })
    return res;
}
// 执行用时：104ms  消耗内存：36.8MB

// 方法二：遍历法

// 知识点：

// forEach()：调用数组中的每个元素，并将元素传递给回调函数。回调函数接收三个参数，第一个是当前元素，第二个是当前元素索引值，第三个是当前元素所属数组对象

//  对于空数组是不会执行回调函数的。

// forEach()与map(）异同：

// 相同点：

// 1. 都是遍历数组中的每一项

// 2. 回调函数都接收三个参数，分别是当前元素值，当前元素索引值，当前元素所属数组对象

// 3. 回调函数中的this都指向Windows

// 4. 都只能遍历数组

// 不同点：

// forEach()没有返回值（也就是返回了undefined）数组中有几项，传递进去的匿名函数就执行几次，只是对数组进行了一个遍历不会修改原数组，但是可以通过数组的索引修改原数组，map()支持返回值，返回的是什么，数组中的这一项就会变成什么，但是他不是在原数组上修改的，而是相当于克隆了一份原数组，然后在克隆之后的数组上进行了修改



let shortestToChar = function (S, C) {
    let indexs = [];
    let res = [];
    let arr = S.split("")
    arr.forEach((item, index) => {
        if (item === C) {
            indexs.push(index)
        }
    })
    for (let i = 0; i < arr.length; i++) {
        let min;
        indexs.forEach(item => {
            let differ = Math.abs(item - index)
            if (min === undefined || min > differ) {
                min = differ
            }
        })
        res.push(min)
    }
    return res;
}