/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */

/*
new 操作符做了什么：
1.创建一个空对象
2.this指向该对象，也就是将构造函数的作用域赋给该对象
3.执行构造函数中的代码
4.返回这个新对象
*/

function newOperator(ctor) {
    if (typeof ctor !== 'function') {
        throw 'newOperator function the first param must be function'
    }
    // 用构造函数的原型对象创建一个新对象
    let newObj = object.create(ctor.prototype)
    // 除去构造函数的其余参数
    let argsArr = [...arguments].slice(1) // 等同于 [].slice().call(arguments,1)
    // 绑定this
    let newReturnObj = ctor.call(newObj, argsArr)
    return (typeof newReturnObj === 'object' && newReturnObj !== null) || typeof newReturnObj === 'function' ? newReturnObj : newObj
}