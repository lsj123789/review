// 给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

// 重复出现的子串要计算它们出现的次数。

// 示例 1 :

// 输入: "00110011"
// 输出: 6
// 解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

// 请注意，一些重复出现的子串要计算它们出现的次数。

// 另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。
function countBinarySubstrings(str) {
    let result = [];
    //自定义match方法 该方法用于判断传入的字符串是否符合自定义规则 符合的话 返回符合规则的字符串
    let match = subStr => {
        // 找出传入字符串中连续的0或1 取符合规则的第一个字符串
        let j = subStr.match(/^(0+|1+)/)[0];
        // 拿j的第一位按位与1 也就是取反  然后转为字符串 调用字符串的repeat方法 使o变成与j相同长度 取反的字符串
        let o = (j[0] ^ 1).toString().repeat(j.length);
        // 自定义正则规则 从头开始找  找到格式如${j}${o}的字符串
        let reg = new RegExp(`^(${j}${o})`)
        //判断传入字符串是否符合正则规则  符合的话 返回正则表达式返回的第一个值也就是对应字符串
        return reg.test(subStr) ? RegExp.$1 : ''
    }
    for (let i = 0; i < str.length - 1; i++) {
        // 截取字符串 每次都从下一位开始截取 然后传到自定义match方法中判断该字符串是否符合正则规则
        let sub = match(str.slice(i))
        if (sub) {
            result.push(sub)
        }
    }
    return result
}

countBinarySubstrings("00110011")