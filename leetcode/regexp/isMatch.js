// 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
// 说明:
// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
// 示例 1:
// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。
// 示例 2:
// 输入:
// s = "aa"
// p = "a*"
// 输出: true
// 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
// 示例 3:
// 输入:
// s = "ab"
// p = ".*"
// 输出: true
// 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
// 示例 4:
// 输入:
// s = "aab"
// p = "c*a*b"
// 输出: true
// 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
// 示例 5:
// 输入:
// s = "mississippi"
// p = "mis*is*p*."
// 输出: false
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    let pArr = p.match(/([a-z.]\*) | ([a-z])/g)// 匹配各种模式  如：[a*,.*,adc]
    let sLen = s.length
    let cur = 0// 当前光标所在
    for (let i = 0, m; i < pArr.length; i++) {
        m = pArr[i].split()// 将当前模式以空格分为数组
        if (m[1] === "*") {// 判断该数组第二位是不是* 是的话 该模式是带*的，不是的话 该模式为纯字母
            if (m[0] === '.') {//带*的模式中的 .*模式
                cur = sLen
                break
            } else {
                while (s[cur] === m[0]) {
                    cur++
                }
            }
        } else {
            for (let j = 0; j < m.length; j++) {
                m[j] === s[cur] ? cur++ : false
            }
        }
    }
    return cur
};
isMatch("mississippi","mis*is*p*.")