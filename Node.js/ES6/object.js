//对象扩展

//简洁表达👇
{
    let o = 1
    let k = 2
    //es5
    let es5 = {
        o: o,
        k: k
    }
    //es6
    let es6 = {
        o,
        k
    }
    console.log(es5, es6)//o:1,k:2,o:1,k:2
    //对象中有方法
    //es5
    let es5_method = {
        hello: function () {
            console.log('hello')
        }
    }
    //es6
    let es6_method = {
        hello() {
            console.log('hello')
        }
    }
    console.log(es5_method.hello(), es6_method.hello())//hello hello
}

// 属性表达式
{
    let a = 'b'
    //es5
    let es5_obj = {
        a: 'c',
        b: 'c'
    }
    //es6
    let es6_obj = {
        [a]: 'c'//这里的[a]相当于一个变量 也就是上面声明的a变量 他的值为b
    }
    console.log(es5_obj, es6_obj)//{a:'c',b:'c'}{b:'c'}
}
//对象新增API
{
    //Object.is()
    console.log(Object.is('abc', 'abc'))//true  is的判断在功能上和===是一样的
    console.log(Object.is([], []))//false 数组是一个引用类型 两个数组引用的不是一个地址 所以是false
    
    //Object.assign() 浅拷贝  拷贝的是只有自身属性 不拷贝不可枚举属性和继承属性
    console.log(Object.assign({ a: 'a' }, { b: 'b' }))//{a:'a',b:'b'}
    
    //Object.entries()
    let test = { k: 123, o: 456 }
    for (let [key, value] of Object.entries(test)) {
        console.log([key, value])//{ k: 123, o: 456 }
    }

    //扩展运算符
    let {a,b,...c} = {a:'test',b:'kill',c:'ddd',d:'ccc'}
}