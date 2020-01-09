// 浅拷贝
{
    let shadowClone = obj => {
        let cloneObj = {}
        for (let key in obj) {
            cloneObj[key] = obj[key]
        }
        return cloneObj
    }
}

// 深拷贝

// 乞丐版
// 缺点：拷贝不了正则表达式、函数、undefined
{
    let obj = {
        name: 'tony',
        age: 12,
        boyFriend: {
            one: 'allen',
            two: 'jack'
        }
    }
    JSON.parse(JSON.stringify(obj))
}

// 基础版
// 缺点：未考虑数组
{
    let deepClone = obj => {
        if (typeof (obj) === 'object') {
            let cloneObj = {}
            for (let key in obj) {
                cloneObj[key] = deepClone(obj(key))
            }
            return cloneObj
        } else {
            return obj
        }
    }
}

// 考虑数组
{
    let deepClone = target => {
        if (typeof (target) === 'object') {
            let cloneTarget = Array.isArray(target) ? [] : {}
            for (let key in target) {
                cloneTarget[key] = deepClone(target[key])
            }
            return cloneTarget
        } else {
            return target
        }
    }
}

//考虑循环引用
{
    let deepClone = (target, map) => {
        // 如果出现target.target = target这种循环引用 会因为递归陷入死循环导致栈内存溢出
        // 原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况：
        if (typeof (target) === 'object') {
            let cloneTarget = Array.isArray(target) ? [] : {}
            // WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
            //在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。
            // 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
            let map = new WeakMap()
            if (map.get(target)) {
                return map.get(target)
            }
            map.set(target, cloneTarget)
            for (let key in target) {
                cloneTarget[key] = deepClone(target[key], map)
            }
            return cloneTarget
        } else {
            return target
        }
    }
    //为什么要使用WeakMap
    {
        let obj = {
            name: 'ConardLi'
        }
        const target = new WeakMap();
        target.set(obj, 'code秘密花园');
        obj = null;
    }
    //如果是WeakMap的话， target和obj存在的就是弱引用关系， 当下一次垃圾回收机制执行时， 这块内存就会被释放掉。
    //设想一下， 如果我们要拷贝的对象非常庞大时， 使用Map会对内存造成非常大的额外消耗，
    // 而且我们需要手动清除Map的属性才能释放这块内存， 而WeakMap会帮我们巧妙化解这个问题。


}