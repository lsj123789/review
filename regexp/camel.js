// 将一个字符串变为变为小驼峰
function changeToCamel(str) {
    let reg = /-(\w)/g
    return str.replace(reg, ($, $1) => {
        return $1.toUpperCase()
    })
}
changeToCamel('first-name')