// 定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
let lengthOfLongestSubstring = (s) => {
    let result = '';
    let len = 0;
    for (let i = 0; i < s.length; i++) {
        if (result.indexOf(s[i]) === -1) {
            result += s[i];
            if (result.length > len) {
                len = result.length
            }
        } else {
            result += s[i]
            result = result.slice(result.indexOf(s[i]) + 1)
        }
    }
    return len
};
lengthOfLongestSubstring("pwwkew")