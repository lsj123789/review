/*
红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；
如何让三个灯不断交替重复亮灯？（用Promse实现）
*/

// 信号灯函数
let red = () => console.log('red')
let green = () => console.log('green')
let yellow = () => console.log('yellow')

// 封装交替执行信号灯的函数
let light = (time, cb) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb()
            resolve()
        }, time)
    })
}

//递归调用三个信号灯函数
let step = () => {
    return Promise.resolve()
        .then(() => light(1000, green))
        .then(() => light(2000, yellow))
        .then(() => light(3000, red))
        .then(() => step())
}

step()