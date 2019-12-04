//ES6增加了函数默认参数
//before
function foo(abc) {
    abc = abc || 'hello'
    console.log(abc);
}
foo()//hello
foo(nihao)//nihao

// ES6
function foo2(abc = 'hello') {
    console.log(abc);
}
foo2()//hello
foo2(nihao)//nihao

//参数支持变量的解构赋值
function foo3({ name = 'zhangsan', age = 12 }) {
    console.log(name, age);
}
foo3({})//zhangsan 12
foo3({ name: 'lisi', age: 14 })//lisi 14

//rest 参数
//注：rest参数后面不能有其他参数
function foo4(a, ...rest) {
    console.log(a);//1
    console.log(rest);//[1,2,3,4,5,6,7]
}
foo4(1, 2, 3, 4, 5, 6, 7)

//作用域
{
    let x = 'test'
    function test2(x, y = x) {
        console.log(x, y)//kill kill
    }
    test2('kill')
}
{
    let x = 'test'
    function test2(x, y = x) {
        console.log(x, y)//undefined undefined
    }
    test2()
}
{
    let x = 'test'
    function test2(c, y = x) {
        console.log(x, y)//kill test
    }
    test2('kill')
}

//...扩展运算符  将数组专程单个的数据项
let arr = [1, 2, 3, 4, 5, 6]
function foo5(a, b, c, d, e) {
    console.log(a, b, c, d, e);//1 2 3 4 5
}
foo5(...arr)//或者使用 foo5.apply(null,arr)
//扩展运算符的应用：数组合并
let arr1 = [1, 2]
let arr2 = [3, 4, 5]
let arr3 = [...arr1, ...arr2]
console.log(arr3);//[1,2,3,4,5]


//箭头函数
//before
function foo6(value) {
    return value
}
let ret = foo6(123)
console.log(ret);//123
//after
let foo7 = value => value//第一个value相当于上面函数的参数，第二个参数相当于上面函数的返回值
let ret = foo7(123)
console.log(ret);//123

//before
let arr4 = [1, 2]
arr.forEach(function (e, i) {
    console.log(e, i);
})
//1 0
//2 1
//after
let arr5 = [1, 2]
arr.forEach((e, i) => {
    console.log(e, i);
})


//箭头函数使用时的注意事项
//1.箭头函数的this是指向声明时的this 不是调用时的
function foo8() {
    setTimeout(() => {
        console.log(this.num);//2
    }, 100)
}
let num = 1;
foo8.call({ num: 2 })

//2.箭头函数不是构造函数 不可以使用new操作符
//3.函数内部不可以使用arguments，可以使用rest参数替代
let foo9 = (a, b) => {
    console.log(arguments[0]);//{}
}
foo9(1, 2)
let foo10 = (...rest) => {
    console.log(rest[0]);//1
}
foo10(1, 2)

//尾调用 函数最后一步返回一个函数  
//一个函数依赖于另外的函数  函数嵌套很多 可以使用尾调用优化
{
    function tail(x) {
        console.log(x)
    }
    function fx(x) {
        return tail(x)
    }
    fx(123)//123
}