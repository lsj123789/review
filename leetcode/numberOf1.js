function NumberOf1(n) {
    const convert = num => {
        let res = ''
        while (num > 1) {
            res += ('' + num % 2)
            num = parseInt(num / 2)
        }
        return res
    }
    let tmp
    let arr = []
    let res = []
    if (n < 0) {
        tmp = Math.abs(n) - 1
        tmp = [...convert(tmp)]
        for (let i = 0; i < tmp.length; i++) {
            if (Number(tmp[i]) === 0) {
                arr[i] = 1
            } else {
                arr[i] = 0
            }
        }
    }else if(n ===1){
        return 1
    }else{
        arr = [...convert(n)]
    }
    arr.map(item => Number(item) === 1 && res.push(item))
    return res.length
}

console.log(NumberOf1(-1100))