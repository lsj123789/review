const findOneTimes = num => {
    let res = 0
    for (let i = 0; i <= num; i++) {
        if (i.toString().split('').includes('1')) {
            res++
        }
    }
    return res
}
console.log(findOneTimes(55))