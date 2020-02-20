// 归并排序
//时间复杂度O(nlogn)
// 不是原地排序  因为在合并两个有序数组为一个数组时 需要借助额外的存储空间
//合并完成后 临时存储空间就被释放掉了 所以cpu只有一个函数在执行 也就是只有一个内存空间在使用
//临时空间最大不会超过n个数据 所以空间复杂度 O(n)
//稳定 

const mergeSort = arr => {
    if (arr.length <=2) return
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle)
    console.log(mergeSort(left))
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {
    let res = []
    while (left.length && right.length) { 
        // 保证稳定排序 因为值相等的元素 在合并前后先后顺序不变
        left[0] <= right[0] ? res.push(left.shift()) : res.push(right.shift())
    }
    while (left.length)
        res.push(left.shift())
    while (right.length)
        res.push(right.shift())

}

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr))