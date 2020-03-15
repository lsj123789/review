// 函数柯里化
// 把接受多个参数的函数变成接受单一参数(最初函数的第一个参数)的函数
// 返回接受余下的参数而且返回结果的新函数的技术
//函数柯里化的主要作用：
//参数复用
//提前返回 – 返回接受余下的参数且返回结果的新函数
//延迟执行 – 返回新函数，等待执行

const curry = (fn, ...args) => {
    return args.length < fn.length ?
        // 参数长度不足时 重新柯里化该函数 等待接收新的参数
        (...arguments) => curry(fn, ...args, ...arguments) :
        // 参数长度满足时 执行该函数
        fn(...args)
}

const sumFn = (a, b, c) => a + b + c

const sum = curry(sumFn)

console.log(sum(2)(3)(5))