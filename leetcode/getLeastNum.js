//输入n个整数，找出其中最小的K个数。
//例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,

const getLeastNum = (numbers, k) => {
    let numArr = [...numbers].sort()
    if (numArr.length < k) return []
    return numArr.splice(0, k)
}

console.log(getLeastNum([4,5,6,7,8,1,2,3],4))