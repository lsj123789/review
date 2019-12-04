// ---------------------------------------set--------------------------------------------
// 两种创建方法：
//一👇
{
    let list = new Set()
    list.add(1)
    list.add(2)
    console.log('list' + ':' + list)//list:1 list:2
}
//二👇
{
    let arr = [1, 2, 30]
    let list = new Set(arr)
    console.log('list' + ':' + list)//list:1 list:2 list:30
}
//作用：去重  但不会做类型转换
{
    let arr = [1, 1, 2, 3, 4, '1']
    let list = new Set(arr)
    console.log(list)//[1,2,3,4,'1']
}
//四个方法：add delete clear has
{
    let arr = ['add', 'delete', 'clear', 'has']
    let list = new Set(arr)
    console.log(list.has('add'))//true
    console.log(list.add('haha'))//['add','delete','clear','has','haha]
    console.log(list.delete('haha'))//['add','delete','clear','has']
    list.clear()
    console.log(list)//[]
}
//遍历
{
    let arr = ['add', 'delete', 'clear', 'has']
    let list = new Set(arr)
    for (let key of list.keys()) {
        console.log(key)//add delete clear has
    }
    for (let value of list.values()) {
        console.log(value)//add delete clear has
    }
    for (let [key, value] of list.entries()) {
        console.log(key, value)//add add delete delete clear clear has has
    }
    list.forEach(item => {
        console.log(item)//add delete clear has
    })
}

// -----------------------------------WeakSet----------------------------------------
//与set的区别：
//1.支持的数据类型不同 weakset只支持对象类型  
//2.weakset的对象都是弱引用 不会跟垃圾回收机制挂钩 只是地址的引用 并不会去检测这个地址是不是是被垃圾回收机制回收掉了
//3.weakset没有size属性 没有clear方法 不能遍历

// ----------------------------------------map-------------------------------------------/
//map一个很重要的特性就是 他的key可以是任意数据类型
//第一种定义方法👇
{
    let map = new Map()
    let arr = ['123']
    map.set(arr, 456)//给arr添加key值 用set()
    console.log(map, map.get(arr))//Map{['123] => 456} 456 获取key值用get()
}
//第二种方法👇
{
    let map = new Map([['a', 1], ['b', 2]])//接收一个数组 数组里面每一项又是一个数组
    console.log(map)//map{'a'=>1,'b'=>2}
}
//属性及方法 用法同set👉size get delete clear
//遍历也和set相同

// -------------------------------------------WeakMap-------------------------------------------------------------
// weakmap与map的区别同set和weakset的区别
//1.支持的数据类型不同 weakmap只支持对象类型  
//2.weakmap的对象都是弱引用 不会跟垃圾回收机制挂钩 只是地址的引用 并不会去检测这个地址是不是是被垃圾回收机制回收掉了
//3.weakmap没有size属性 没有clear方法 不能遍历