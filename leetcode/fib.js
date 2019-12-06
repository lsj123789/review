// 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
// 给定 N，计算 F(N)。
// 示例 1：
// 输入：2
// 输出：1
// 解释：F(2) = F(1) + F(0) = 1 + 0 = 1.
// 分析：斐波那契数就是这一项的数是前两项数的和，可以将特殊的拿出来单独判断，比如N=0,12,时，剩下的同用的可以通过数组遍历加通用公式来做。
// 代码：
let fib = function (N) {
    if (N === 0) {
        return 0;
    } else if (N === 1 || N === 2) {
        return 1;
    } else {
        let arr = [0, 1, 1]
        for (let i = 2; i <= N; i++) {
            arr[i] = arr[i - 1] + arr[i - 2]
        }
        return arr[N]
    }
}
// 执行用时：68ms  内存消耗：36.8MB