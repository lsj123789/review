    // 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
    // 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
    // 示例:
    // 输入："23"
    // 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
    let letterCombinations = function (digits) {
        let lettersArr = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'] // 定义键盘数字对应的字母数组
        let mapDigitsToLetters = [] // 定义数字到对应字母的映射数组
        digits.split('').forEach(item => lettersArr[item] && mapDigitsToLetters.push(lettersArr[item]))
        let resArr = []
        // 封装一个函数 输入字母数组 输出单个字母分别组合后的数组
        let comb = arr => {
            for (let i = 0; i < arr[0].length; i++) { // 外层循环遍历数组第一项
                for (let j = 0; j < arr[1].length; j++) { //内层循环遍历数组第二项
                    resArr.push(`${arr[0][i]}${arr[1][j]}`) //将对应字母分别组合后的组成的数组保存起来
                }
            }
            arr.splice(0, 2, resArr) // 拿拼接好的数组替换掉传入数组中的前两项
            //如果传入的数组长度不为1的话  递归执行comb函数
            return arr.length === 1 ? arr[0] : comb(arr)
        }
        return digits.length > 1 ? comb(mapDigitsToLetters) : lettersArr[Number(digits)].split("")
    }
    console.log(letterCombinations("2"))