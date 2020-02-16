// 把下面的字符串去重，并去除掉特殊字符按照数字在前字母在后的顺序排序字符串
// 如下：“5551233fddfd&3434fdsaff&454545&4545444rfdsfds&545gdsgs”

let uniAndSort = str => {
    let numStr = ''
    let letterStr = ''
    for (let i = 0; i < str.length; i++) {
        if (str[i] > 0 && str[i] < 10 && numStr.indexOf(str[i]) === -1) {
            numStr += str[i]
        } else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122 && letterStr.indexOf(str[i] === -1)) {
            letterStr += str[i]
        }
    }
    return numStr + letterStr
}

console.log(uniAndSort('1233fddfd&3434fdsaff&454545&4545444rfdsfds&545gdsgs'))