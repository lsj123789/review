
{
    //es5异步
    let ajax = function (callback) {
        console.log('执行1')
        setTimeout(function () {
            callback && callback.call()
        }, 1000)
    }
    ajax(function () {
        console.log('timeout1')
    })
    // 执行结果：
    // 执行 1
    // timeout1
}

{
    //es6 promise
    let ajax = function () {
        console.log('执行2')
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, 1000)
        })
    }
    ajax.then(function () {
        console.log('timeout2')
    })
    //执行结果
    //执行1
    //执行2
    //timeout1
    //timeout2
}

{
    //多步调用
    let ajax = function () {
        console.log('执行3')
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, 1000)
        })
    }
    ajax.then(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, 2000)
        })
    }).then(function () {
        console.log('timeout3')
    })
    //执行结果
    //执行1
    //执行2
    //执行3
    //timeout1
    //timeout2
    //timeout3
}

{
    //错误捕获
    let ajax = function (num) {
        return new Promise(function (resolve, reject) {
            if (num > 5) {
                resolve()
            } else {
                throw new Error('error')
            }
        })
    }
    ajax(3).then(() => {
        console.log('resolve')
    }).catch(err => {
        console.log(err)
    })//执行这里 catch 捕获到错误
}

//promise高级用法
{
    //promise.all()
    // 所有图片加载完成再加载页面
    function loading(src) {
        return new Promise((resolve, reject) => {
            let img = document.cerateElement('img')
            img.src = src
            img.onload = function () {
                resolve(img)
            }
            img.onerror = function (err) {
                reject(err)
            }
        })
    }
    function showImgs(imgs) {
        imgs.forEach(function (img) {
            document.body.appendChild(img)
        })
    }

    Promise.all([loadImg('src1.png'), loadImg('src2.png'), loadImg('src3.png')]).then(showImgs)
}
{
    //promise.race()
    //多个图片 哪个先加载完哪个先展示
    function loading(src) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img')
            img.src = src
            img.onload = function () {
                resolve(img)
            }
            img.onerror = function (err) {
                reject(err)
            }
        })
    }
    function showImgs(img) {
        let p = document.createElement('p')
        p.appendChild(img)
        document.body.appendChild(p)
    }
    Promise.race([loadImg('src1.png'), loadImg('src2.png'), loadImg('src3.png')]).race(showImgs)
}