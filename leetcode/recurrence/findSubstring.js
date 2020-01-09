// 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。  

// 示例 1：
// 输入：
//   s = "barfoothefoobarman",
//   words = ["foo","bar"]
// 输出：[0,9]
// 解释：
// 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
// 输出的顺序不重要, [9,0] 也是有效答案。

let findSubstring = (s, words) => {
    let wordsLen = words.length
    let arr = []
    let range = (itemArr, restArr) => {
        if (itemArr.length === wordsLen) {
            arr.push(itemArr)
        } else {
            restArr.forEach((item, index) => {
                let tmp = [].concat(restArr)
                tmp.splice(index, 1)
                range(itemArr.concat(item), tmp)
            })
        }
    }
    range([], words)
    let resArr = arr.map(item => s.indexOf(item.join("")))
    return resArr.filter(item => item !== -1).sort()
}
findSubstring(s = "barfoothefoobarman", words = ["foo", "bar"])