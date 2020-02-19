/*
防抖和节流
防抖：将多次操作合并为一次 在给定时间过去之后 仅执行一次  应用场景：表单输入
节流：不管操作有多频繁 在给定时间内 仅执行一次事件处理函数   应用场景：滚动事件 resize
*/

// 防抖的实现
{
    function debounce(fn, delay) {
        // 维护一个timer 用来记录当前函数执行状态
        let timer = null
        return function () {
            // 清理掉正在执行的函数 并重新执行
            clearTimeout(timer)
            timer = setTimeout(() => fn.apply(this, arguments), delay)
        }
    }
}

// 节流的实现  
{
    //时间戳方式
    // 当高频事件触发时 第一次应该是立即执行(给事件绑定函数与真正触发事件时间差大于delay时)
    // 而后再怎么出发函数 都是过delay时间才会执行一次函数
    // 最后一次事件触发完毕后 事件处理函数不会再执行
    function throttle(fn, delay) {
        let prev = Date.now()
        return function () {
            let now = Date.now()
            if (now - prev >= delay) {
                fn.apply(this, arguments)
                prev = Date.now()
            }
        }
    }
} {
    // 定时器方式
    // 触发事件时 设置一个定时器 再次触发事件 如果定时器存在 就不执行
    // 直到delay时间后 定时器执行函数 清空定时器 就可以设置下一个定时器了
    // 当高频事件触发时 第一次应该是立即执行(给事件绑定函数与真正触发事件时间差大于delay时)
    // 而后再怎么出发函数 都是过delay时间才会执行一次函数
    // 最后一次事件触发完毕后 由于定时器的延迟 可能还会执行一次事件处理函数
    function throttle(fn, delay) {
        let timer = null
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null
            }, delay)
        }
    }
}

//综合使用时间戳与定时器，完成一个事件触发时立即执行，触发完毕还能执行一次的节流函数
function throttle(func, delay) {
    let timer = null;
    let startTime = Date.now();

    return function () {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        const context = this;
        const args = arguments;

        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(func, remaining);
        }
    }
}

{
    //标志位
    function throttle(fn, delay) {
        let canRun = true
        return function () {
            if (!canRun) return
            canRun = false
            setTimeout(() => {
                fn.apply(this, arguments)
                canRun = true
            }, delay)
        }
    }
}