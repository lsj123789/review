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