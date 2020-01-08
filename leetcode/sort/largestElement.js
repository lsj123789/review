// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 示例 1:
// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5

{
    // todo：
    // 用sort排序相当于把数组中的所有元素都遍历了一遍
    // 冒泡排序是每遍历一次 向数组中添加一个最大值 
    // 也就是说 想要找到第k个最大值 只需要遍历k次就可以了 不需要把整个数组都遍历一遍
    let largestElement = (arr, k) => arr.sort((a, b) => a - b)[k - 1]
    largestElement([1, 2, 3, 4, 85, 9], 3)
}

{
    //使用冒泡排序 当找到第k个最大值时 不再进行后面的数组排序
    let largestElement = (arr, k) => {
        let len = arr.length - 1
        for (let i = len, tmp; i > len - k; i--) { // 当找到第k个最大值就不再遍历
            for (let j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    tmp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = tmp
                }
            }
        }
        return arr[len - k + 1]
    }
    largestElement([1, 2, 4, 6, 8, 9], 2)
}