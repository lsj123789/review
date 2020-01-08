// 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
// 如果数组元素个数小于 2，则返回 0。
// 示例 1:
// 输入: [3,6,9,1]
// 输出: 3
// 解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
// 示例 2:
// 输入: [10]
// 输出: 0
// 解释: 数组元素个数小于 2，因此返回 0。

{
    // 该方法性能较差 可以改良 因为在排序时 只要排序次数大于2 就可以知道排好序的相邻两个元素的差值 不需要再循环一次
    let longestDistance = arr => {
        if (arr.length < 2) {
            return 0
        }
        arr.sort((a, b) => a - b)
        let maxDis = 0
        for (let i = 0, tmp, len = arr.length; i < len; i++) {
            tmp = arr[i + 1] - arr[i]
            tmp > maxDis && (maxDis = tmp)
        }
        return maxDis
    }
    longestDistance([1, 3, 5, 7, 10])
}

{
    let longestDistance = arr => {
        if (arr.length < 2) {
            return 0
        }
        let len = arr.length - 1
        let maxDis = 0
        let space
        for (let i = len, tmp; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                tmp = arr[j]
                if (tmp > arr[j + 1]) {
                    arr[j] = arr[j + 1]
                    arr[j + 1] = tmp
                }
            }
            if (i < len) {
                space = arr[i + 1] - arr[i]
                space > maxDis && (maxDis = space)
            }
        }
        return Math.max(maxDis, arr[1] - arr[0])
    }
    longestDistance([1, 2, 6, 8, 3, 10])
}