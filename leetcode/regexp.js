// 输入：19970312
// 输出：1997年03月12日

function regNum(num) {
    num = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1年$2月$3日')
    return num
}

// 输入：wow ，i must test this ！

// 输出：[wow,test]

function findStr(str) {
    str = str.match(/\b([a-z])[a-z]*\1\b/g)
    return str
}