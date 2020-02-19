// 找到给定数组的 和最大的字串
// eg:[1,2,3,-3,-5,10,-20,70,3,-1,2]  和最大的子串：'70,3,-1,2'

let findMaxSub = arr => {
    let sum = 0
    let score = 0 // 记录最大的值
    let preIndex ,afterIndex
    arr.map((item, index) => {
        sum += item
        if (sum < 0) {
            sum = 0
            preIndex = index + 1
        } else if (sum > score) {
            score = sum
            afterIndex = index
        }
    })
    return arr.splice(preIndex,afterIndex)
}

console.log(findMaxSub([1, 2, 3, -3, -5, 10, -20, 70, 3, -1, 2]))