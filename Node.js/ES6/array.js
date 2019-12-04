//数组扩展

//Array.of()将一组值转为数组
{
    let arr = Array.of(1, 2, 3)
    console.log(arr); //[1,2,3]

    let arr2 = Array.of()
    console.log(arr2); //[]
}

//Array.from()将数组或类数组对象转为数组
{ //类似于map方法 将整个数组便利了一遍 返回最新的值
    console.log(Array.from([1, 3, 5], item => {
        return item * 2
    })); //[2,6,10]
}

//Array.fill()
{
    console.log([1, '1', undefined].fill(7)); //[7,7,7]
    console.log(['a', 'b', 'c'].fill(7, 1, 3)); //['a',7,7]//从index为1开始替换到index为3结束
}

//Array.keys() Array.values() Array.entries()
{
    for (let index of ['1', 'a', 'c'].keys()) {
        console.log(index); // 0 1 2
    }
    // for(let value of ['1','a','c'].values()){
    //     console.log(value);// 1 a c 有兼容问题
    // }
    for (let [index, value] of ['1', 'a', 'c'].entries()) {
        console.log(index, value);
    } //0 '1'  1 'a'  2 'c' 
}

//查找
{
    console.log([1, 2, 3, 4, 5, 6].find(item => {
        return item > 3
    })); //4 找到一个满足条件的值就返回
    console.log([1, 2, 3, 4, 5, 6].findIndex(item => {
        return item > 3
    })); //3 返回满足条件的值的下标
} {
    console.log([1, 2, NaN].includes(1)); //true  可以处理NaN
    console.log([1, 2, NaN].includes(NaN));//true
}