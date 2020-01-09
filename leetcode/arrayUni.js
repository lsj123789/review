// 数组去重

//indexOf 数组下标法
{
    let unique = arr => {
        let tmp = []
        for (let i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) === -1) {
                tmp.push(arr[i])
            }
        }
        return tmp
    }
}

{
    let unique = arr => {
        let tmp = []
        for (let i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) === i) {
                tmp.push(arr[i])
            }
        }
        return tmp
    }
}

//ES6 新数据结构Set  Set成员具有唯一性
{
    // Array.from() 将类数组对象转化为真正的数组
    let unique = arr => Array.from(new Set(arr))
}

{
    let unique = arr => [...new Set(arr)]
}

// filter + indexOf
{
    let unique = arr => arr.filter((item, index) => arr.indexOf(item) === index)
}