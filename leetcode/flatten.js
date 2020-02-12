//数组拍平
let flatten = arr => {
    let res = []
    arr.map(item => Array.isArray(item) ? res.push(...flatten(item)) : res.push(item))
    return res
}

console.log(flatten([1, 2, [13, [12]]]))