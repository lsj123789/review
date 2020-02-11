// 快速排序
/*
平均时间复杂度：O(nlogn)
最坏时间复杂度：O(n²)
空间复杂度：O(logn)
*/ 

//左右分治再递归
{
    let quickSort = arr => {
        if (arr.length <= 1) return arr
        let left = []
        let right = []
        let pivotIndex = Math.floor(arr.length / 2)
        let pivot = arr.splice(pivotIndex, 1)[0]
        arr.map(item => item < pivot ? left.push(item) : right.push(item))
        return quickSort(left).concat([pivot], quickSort(right))
    }
    quickSort([1, 3, 2, 5, 4])
}

// 三路快排
/*
随机选取基准值
配合插入排序
当数据重复量大时 性能较好
*/
{
    let quickSort = arr => {
        if (arr.length === 0) return []
        let left = []
        let right = []
        let center = []
        let pivot = arr[0]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i])
            } else if (arr[i] === pivot) {
                center.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return [...quickSort(left),...center,...quickSort(right)]
    }
    console.log(quickSort([1,1,1,3,4,5,7,8,5,3,9,9,999]))
}