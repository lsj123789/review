
// 二分查找
//优点是比较次数少，查找速度快，平均性能好
//其缺点是要求待查表为有序表，且插入删除困难。
//因此，折半查找方法适用于不经常变动而查找频繁的有序列表。
const binarySearch = (arr, key) => {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = parseInt((low + high) / 2)
        if (key === arr[mid]) {
            return mid
        } else if (key > arr[mid]) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}
binarySearch([1, 2, 3, 4, 5], 2) // 1