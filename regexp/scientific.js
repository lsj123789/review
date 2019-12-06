// 将一个数字改为英文科学记数法形式
//eg:1000000000 改为 1,000,000,000
function scientificNotation(str) {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return str.replace(reg, '.');
}

scientificNotation('10000000000000067')