// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
// 你可以返回任何满足上述条件的数组作为答案。
// 示例：
// 输入：[4,2,5,7]
// 输出：[4,5,2,7]
// 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。

let oddEvenSort = arr => {
    let resArr = []
    let odd = 1
    let even = 0
    arr.sort((a, b) => a - b).forEach(item => {
        if (item % 2 === 1) {
            resArr[odd] = item
            odd += 2
        } else {
            resArr[even] = item
            even += 2
        }
    })
    return resArr
}

oddEvenSort([1, 2, 3, 4, 7, 6, 5, 8])