//变量解构赋值

//before
var a = 1;
var b = 2;
var c = 3;
console.log(a, b, c);//1,2,3

//after
var a = 1, b = 2, c = 3;
console.log(a, b, c);//1,2,3

//数组的结构赋值
let [a, b, c] = [1, 2, 3]
console.log(a, b, c);//1,2,3

let [a, , b] = [1, 2]
console.log(a, b);//1,undefined

let [a, [num1, num2], b] = [1, [111, 222], 2]
console.log(a, num1, num2, b);//1,111,222,2

let [a = 1, b, c] = [, 2,]
console.log(a, b, c);//1,2,undefined

//解构赋值的应用场景
let [x, y] = [1, 2]
console.log(x, y);//1,2
[x, y] = [y, x]
console.log(x, y);//2,1

//对象的解构赋值
let { name, age } = { name: 'zhangsan', age: 12 }
console.log(name, age);//zhangsan,12

//对象重命名
let { name: userName, age } = { name: 'zhangsan', age: 12 }
console.log(userName, age);//zhangsan,12
//对象的解构赋值支持默认值
let { name: userName = 'zhangsan', age } = { age: 12 }
console.log(userName, age);//zhangsan,12

//对象解构赋值应用场景：解析json数据
var obj = {
    name: 'zhangsan',
    age: 12,
    friend: {
        fname: 'lisi',
        sex: 14
    }
}
let { name, age, friend } = obj;
console.log(name, age, friend.fname, friend.sex);//zhangsan 12 lisi 14


//字符串解构赋值
let [a, b, c, d, e, f, length] = 'hello'
console.log(a, b, c, d, e, f, length);//h e l l o undefined undefined
console.log('hello'.length);//5

let { length } = 'hello'
console.log(length);//5