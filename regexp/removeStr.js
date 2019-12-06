// 字符串去重
function removeRepeat(str) {
    let reg = /(\w)\1*/g;
    return str.replace(reg, '$1')
}
console.log(removeRepeat('aaabbbccc'))