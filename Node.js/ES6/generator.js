//generator是异步编程的解决方案  返回的是Iterator接口
//每个步骤的一个标志就是yield或者是return 遇到这两个关键字 就停止 暂时不向下执行 进行下一步需要调用next()

{
    //基本用法 
    let tell = function* () {
        yield 'a';
        yield 'b'
        return 'c'
    }
    let k = tell()
    console.log(k.next())//{value:'a',done:false}
    console.log(k.next())//{calue:'b',done:false}
    console.log(k.next())//{value:'c',done:true}
    console.log(k.next())//{value:undefined,done:true}
}

{
    //obj是不可遍历的 但在symbol下部署了iterator接口 就可以遍历了
    let obj = {}
    obj[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3
    }
    for (let value of obj) {
        console.log(value)//1 2 3
    }
}

{
    //状态基 三个状态 无限循环
    let state = function* () {
        while (1) {
            yield 'a'
            yield 'b'
            yield 'c'
        }
    }
    let status = state()
    console.log(status.next())//{value:'a',done:false}
    console.log(status.next())//{value:'b',done:false}
    console.log(status.next())//{value:'c',done:false}
    console.log(status.next())//{value:'a',done:false}
    console.log(status.next())//{value:'b',done:false}
}

{
    //async await:async相当于generator的一个语法糖
    let state = async function () {
        while (1) {
            await 'a'
            await 'b'
            await 'c'
        }
    }
    let status = state()
    console.log(status.next())//{value:'a',done:false}
    console.log(status.next())//{value:'b',done:false}
    console.log(status.next())//{value:'c',done:false}
    console.log(status.next())//{value:'a',done:false}
    console.log(status.next())//{value:'b',done:false}
}

{
    //generator实例案件：抽奖五次  抽一次少一次
    //优点：次数并没有保存到全局变量中
    let draw = function (count) {
        //抽奖逻辑 some code
        console.info(`剩余${count}次`)//console.log,console.info,console.debug实际上无差别，只不过console.info打印出来的内容前面多了一个小图标
    }
    let residue = function* (count) {
        while (count > 0) {
            count--
            yield draw(count)
        }
    }
    let star = residue(5)
    let btn = document.createElement('button')
    btn.id = 'start'
    btn.textContent = '抽奖'
    document.body.appendChild(btn)
    document.getElementById('start').addEventListener('click', function () {
        star.next()
    }, false)

}

{
    //generator 实例案件：长轮询 服务端某个数据定期变化 前端需要定时去取这个状态（因为http是无状态的） 解决办法：一个是长轮询 一个是websocket 但是websocket兼容性不好
    let ajax = function* () {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ code: 0 })
            }, 200)
        })
    }
    let pull = function () {
        let generator = ajax()
        let step = generator.next()
        step.value.then(function (d) {
            if (d.clde != 0) {
                setTimeout(() => {
                    pull()
                }, 1000)
            } else {
                console.log(d)//{code:0}
            }
        })
    }
    pull()
}