// forEach(),map是es5新增API，IE8以及之前的浏览器不支持该API
// forEach():

if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (callback) {
        let arr = this // this指正在调用该函数的对象
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) { // 防止稀疏数组，eg：[1,,2,,3,,] 不防止的话在ie8下显示：[1，NaN，                                                                                      2,NaN,3,NaN]
                callback(arr[i], i, arr)
            }
        }
    }
}

// map():map相比于forEach的话，是不能改变原数组，需要返回一个新数组。

if (!('map' in Array.prototype)) {
    let arr = this;
    let result = [];
    Array.prototype.map = function (callback) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) {
                result = callback(arr[i], i, arr)
            }
        }
        return result
    }
}