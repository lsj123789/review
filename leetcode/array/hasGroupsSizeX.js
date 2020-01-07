// <!-- 给定一副牌，每张牌上都写着一个整数。
// 此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：
// 每组都有 X 张牌。
// 组内所有的牌上都写着相同的整数。
// 仅当你可选的 X >= 2 时返回 true。

// 示例 1：
// 输入：[1,2,3,4,4,3,2,1]
// 输出：true
// 解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]

// 示例 2：
// 输入：[1,1,1,2,2,2,3,3]
// 输出：false
// 解释：没有满足要求的分组。

// 示例 3：
// 输入：[1,1,2,2,2,2]
// 输出：true
// 解释：可行的分组是 [1,1]，[2,2]，[2,2] -->

let hasGroupsSizeX = arr => {
    if (arr.length < 2) {
        return false
    } else {
        arr.sort((a, b) => a - b)
        let min = Number.MAX_SAFE_INTEGER
        let resArr = []
        let res = true
        for (let i = 0, tmp = []; i < arr.length; i++) {
            tmp.push(arr[i])
            for (let j = i + 1; j < arr.length - 1; j++) {
                if (arr[i] === arr[j]) {
                    tmp.push([j])
                } else {
                    if (tmp.length < min) {
                        min = tmp.length
                    }
                    resArr.push([].concat(tmp))
                    tmp.length = 0
                    i = j
                    break
                }
            }
        }
        resArr.every(item => {
            if (item.length % min !== 0) {
                res = false;
                return false
            }
        })
        return res
    }
}
hasGroupsSizeX([0, 0, 0, 0, 0, 1, 1, 2, 3, 4])