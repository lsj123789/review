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
    let newReturnObj = ctor.apply(newObj, argsArr)
    return (typeof newReturnObj === 'object' && newReturnObj !== null) || typeof newReturnObj === 'function' ? newReturnObj : newObj
}


function _new() {
    let target = {} // 创建一个空对象
    let [constructor, ...args] = [...arguments] // 第一个参数是构造函数
    target._proto_ = constructor.prototype // 执行[[原型]]链接  构造函数中this指向空对象
    let result = constructor.apply(target, args) //执行构造函数 将属性和方法添加到空对象上
    if ((result && typeof (result) === 'object') || typeof (result) === 'function') {
        //如果构造函数返回的是一个对象 就返回该对象
        return result
    }
    // 如果构造函数返回的不是对象  就返回我们创建的空对象
    return target
}