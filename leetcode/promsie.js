/*
promise.all()
Promise.all(iterable) 返回一个新的 Promise 实例。此实例在 iterable 参数内所有的 promise 都 fulfilled 或者参数中不包含 promise 时，状态变成 fulfilled；
如果参数中 promise 有一个失败rejected，此实例回调失败，失败原因的是第一个失败 promise 的返回结果。
*/

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        promises = Array.from(promises)
        if (promises.length === 0) {
            resolve([])
        } else {
            let result = []
            let index = 0
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promise[i]).then(data => {
                        result[i] = data
                        if (++index === promises.length) {
                            resolve(result)
                        }
                    },
                    err => {
                        reject(err)
                        return
                    })
            }
        }
    })
}