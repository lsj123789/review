// 选择排序

let selectSort = arr => {
    for (let i = 0, len = arr.length, min; i < len; i++) {
        //外层循环 把当前循环的值赋给min
        min = arr[i]
        for (let j = i + 1; j < len; j++) {
            // 内层循环 每次找外层循环的值的下一个值 两个值做比较
            if (arr[j] < min) {
                let a = min
                min = arr[j]
                arr[j] = a
            }
        }
        arr[i] = min // 两种情况 一种是内层循环之后 还是原值最小  第二种是内层循环之后找到更小值了 所以需要再给arr[i]赋值
    }
    return arr
}

selectSort([1, 4, 2, 5, 7])