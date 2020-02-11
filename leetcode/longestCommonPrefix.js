// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀， 返回空字符串 ""。
// 示例 1:

//     输入: ["flower", "flow", "flight"]

// 输出: "fl"

// 示例 2:

//     输入: ["dog", "racecar", "car"]

// 输出: ""

// 解释: 输入不存在公共前缀。

// 说明:

//     所有输入只包含小写字母 a - z。

// 分析：当字符串数组为空时返回空串，不为空时判断长度是否大于一，当长度等于一的时候，返回字符串数组中的字符串，当长度大于一时，从字符串数组的第二位开始遍历，每次遍历的 项和前面的进行比较，找到相同的字符串返回。

// 知识点：

// slice()：从已有数组中返回指定的元素。接收两个参数，start （必须）和 end，为负数则从相反方向开始。返回一个新数组，包含从 start 到 end 的元素，不会修改原数组，而是返回一个子数组，想删除原数组用 array.splice()

// split()：字符串分割成字符串数组。与 Array.join('')相反。

// 代码：

function longestCommonPrefix(strs) {
    if (strs.length === 0) {
        return "";
    } else {
        if (strs.length === 1) {
            return strs[0]
        } else {
            let afterTwo = strs.slice(1) // 从数组的第二位开始
            afterTwo.forEach(i => {
                let rArray = str[0].split('');
                let sArray = i.split("");
                let newReault = s.filter((item, index) => {
                    return sArray[0] === rArray[0] && item === rArray[index]
                })
                result = newResult.join('')
            })
        }

    }
    return result
}