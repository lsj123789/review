/**
 * LRU:最近最少使用
 * 
    LRUCache cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);       // 返回  1
    cache.put(3, 3);    // 该操作会使得密钥 2 作废
    cache.get(2);       // 返回 -1 (未找到)
    cache.put(4, 4);    // 该操作会使得密钥 1 作废
    cache.get(1);       // 返回 -1 (未找到)
    cache.get(3);       // 返回  3
    cache.get(4);       // 返回  4

    执行put时：
    1.缓存不满：(1)命中缓存  缓存值不变  (2)为命中缓存 缓存中加入该值
    2.缓存已满：(1)命中缓存：缓存不变    (2)未命中缓存 缓存头中加入该值  并删掉缓存末尾的值
 */

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
    }
    get(key) {
        let value = this.map.get(key)
        if (typeof value === 'undefined') return -1
        this.map.delete(key)
        this.map.set(key, value)
        return value
    }
    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key)
        }
        this.map.set(key, value)
        let keys = this.map.keys()
        while (this.map.size > this.capacity) {
            this.map.delete(keys.next().value)
        }
    }
}

//map.keys().next()可以取得到他排位第一的键值，
//map.put()操作类似数组的push操作，将值保存在最顶的位置，这两点就是最关键的
//这样一来，就能清除的排序而且对map的操作复杂度为O(1)，比操作对象还快。
//不仅在代码上及其优美，算法复杂度也是最优的。