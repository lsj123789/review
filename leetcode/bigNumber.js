//大数相加
// js的 Number 是IEEE 754标准的64-bits的双精度数值
//2^53即以内的整数都是精确的，但是超过了这个范围就会出现精度丢失
const sum = (a, b) => {
    const aLen = a.length
    const bLen = b.length
    let aArr = a.split('')
    let bArr = b.split('')
    let tmp = 0
    let res = []
    const maxLen = Math.max(aLen, bLen)
    const minLen = aLen - bLen
    if (minLen > 0) {
        for (let i = 0; i < minLen; i++) {
            bArr.unshift('0')
        }
    } else if (minLen < 0) {
        for (let i = 0; i < Math.abs(minLen); i++) {
            aArr.unshift('0')
        }
    }
    for (let i = maxLen - 1; i >= 0; i--) {
        let sum = Number(aArr[i]) + Number(bArr[i]) + tmp
        tmp = tmp > 10 ? 1 : 0
        sum = sum >10 ? sum % 10 : sum
        res.unshift(sum)
    }
    return res.join('').replace(/^0+/,'')
}
console.log(sum('900719925474099300', '0001'))