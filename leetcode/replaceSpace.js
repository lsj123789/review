function replaceSpace(str) {
    // write code here

    let arr = str.split('')
    let res = []
    arr.map(item => {
        item.split(' ').length !== 1 ? res.push('%20') : res.push(item)
    })
    return res
}

replaceSpace('hello world')