// 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
// 示例 1:
// 输入: [1,2,0]
// 输出: 3
// 示例 2:
// 输入: [3,4,-1,1]
// 输出: 2
// 示例 3:
// 输入: [7,8,9,11,12]
// 输出: 1
{
    let firstMissingPositive = arr => {
        arr.filter((item, index) => item > 0 && arr.indexOf(item) === index)
        if (arr.length) {
            // 数据量大时  数组全排序存在性能问题 当找到后一个值与前一个值差大于1时 就可以停止数组的遍历了
            arr.sort((a, b) => a - b)
            if (arr[0] === 1) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i + 1] - arr[i] !== 1) {
                        return arr[i] + 1
                    }
                }
                return arr.pop() + 1
            } else {
                return 1
            }
        } else {
            return 1
        }
    }
    firstMissingPositive([1, 3, 5, 2])
}

{
    let firstMissingPositive = arr => {
        arr.filter((item, index) => item > 0 && arr.indexOf(item) == index)
        for (let i = 0, min; i < arr.length; i++) {
            min = arr[i]
            for (let j = i + 1; j < arr.length; j++) {
                if (min > arr[j]) {
                    let c = min
                    min = arr[j]
                    arr[j] = c
                }
            }
            arr[i] = min
            if (i > 0) {
                if (arr[i] - arr[i - 1] !== 1) {
                    return arr[i - 1] + 1
                }
            } else {
                if (arr[0] !== 1) {
                    return 1
                }
            }
        }
        return arr.length ? arr.pop() + 1 : 1
    }
    firstMissingPositive([1, 3, 5, 2])
}