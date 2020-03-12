//{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
//给一个数组，返回它的最大连续子序列的和 (子向量的长度至少是1)


function FindGreatestSumOfSubArray(array) {
    if (array.every(item => item < 0)) {//考虑数组项全为负数情况
        return array.sort()[0]
    } else {
        let curSum = 0
        let maxSum = 0
        array.map(item => {
            curSum += item
            if (curSum < 0) {
                curSum = 0
            } else if (curSum > maxSum) {
                maxSum = curSum
            }
        })
        return maxSum
    }
}

console.log(FindGreatestSumOfSubArray([1, 2, 3, -80, 2]))