// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

// 示例:
// 输入: "25525511135"
// 输出: ["255.255.11.135", "255.255.111.35"]



let restoreIpAddress = str => {
    // 判断最大边界
    if (str.length > 12) return []
    // 保存所有符合条件的IP地址
    let r = []
    // 分四步递归处理ip分段
    let search = (cur, sub) => {
        // 边界条件 数组长度为4也就是IP地址的四部分  并且 四部分转为字符串需要和传入字符串相等
        if (cur.length === 4 && cur.join('') === str) {
            // 过滤 001 010等情况
            if (cur[3].length > 1 && cur[3][0] == 0) {
                return false
            }
            r.push(cur.join('.'))
        } else {
            // 正常的处理过程  循环次数 应是小于三 因为IP地址每部分取值范围是0~255
            for (let i = 0, len = Math.min(3, sub.length), tmp; i < len; i++) {
                tmp = sub.substr(0, i + 1) // 截取字符串
                // 过滤 001 010等情况
                if (tmp.length > 1 && tmp[0] == 0) {
                    return false
                }
                if (tmp < 256) {
                    search(cur.concat([tmp]), sub.substr(i + 1))
                }
            }
        }
    }
    search([], str)
    return r
};

restoreIpAddress("010010")