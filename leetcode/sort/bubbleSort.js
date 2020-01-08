//冒泡排序

let bubbleSort = arr => {
    for (let i = arr.length - 1, tmp; i > 0; i--) { //外层循环控制循环边界 每次循环边界向左移动一位
        for (let j = 0; j < i; j++) { //内层循环控制两两相比较 大的右移
            tmp = arr[j]
            if (tmp > arr[j + 1]) {
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp
            }
        }
    }
    return arr
}