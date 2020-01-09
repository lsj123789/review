// 用正则实现 trim()功能
//trim():去掉字符串头尾空格  不会改变原字符串 返回删除空格后的新字符串

let trim = str => {
    let reg = /^\s+|\s+$/g
    return str.replace(reg, '')
}