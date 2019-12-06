// 将AABB式字符串 改成BBAA式
function changeAABBToBBAA(str) {
    let reg = /(\w)\1(\w)\2/g;
    return str.replace(reg, '$2$2$1$1')
}
changeAABBToBBAA('aabb')