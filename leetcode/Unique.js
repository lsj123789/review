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

//对象键唯一法
{
    let unique = arr => {
        let res = []
        let obj = {}
        arr.map(item => {
            if (!obj[item]) {
                res.push(item)
                obj[item] = true
            }
        })
        return res
    }
}


//字符串去重

// indexOf()法
// 遍历字符串查找某个字符第一次出现的位置
{
    let strUni = str => {
        let newStr = ''
        for (let i = 0; i < str.length; i++) {
            newStr.indexOf(str[i]) === -1 && (newStr += str[i])
        }
        return newStr
    }
}

//search()法
// 检索字符串中子字符串第一次出现的位置 或者检索与正则表达式匹配的字符串
{
    let strUni = str => {
        let newStr = ''
        for (let i = 0; i < str.length; i++) {
            newStr.search(str[i]) === -1 && (newStr += str[i])
        }
        return newStr
    }
}

//对象属性唯一法
{
    let strUni = str => {
        let obj = {}
        let newStr = ''
        for (let i = 0; i < str.length; i++) {
            if (!obj[str[i]]) {
                newStr += str[i]
                obj[str[i]] = 0 // 给对象属性赋值 这个值可以任意取 意思是把每个遍历的字符作为对象属性保存 保证属性唯一性
            }
        }
        return newStr
    }
}