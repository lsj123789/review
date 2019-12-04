// includes():判断字符串中是否包含子串，第二个参数表示从第几个字符串开始查找 返回值为布尔值
// startWith():判断字符串是否以特定的子串开始
// endWith()：判断字符串是否以特定的子串结束

//字符串扩展
let str = 'hello world'
console.log(str.includes(hello, 6));//true

let url = 'es6.strExtension.js'
console.log(url.startsWith('es6'));//true

let url = 'es6.strExtension.js'
console.log(url.startsWith('strExtension', 4));//true

let url = 'es6.strExtension.js'
console.log(url.endsWith('.js'));//true


//模板字符串
var data = {
    name: 'zhangsan',
    age: 12
}
function foo() {
    return 'hello'
}
function foo2(info) {
    return info
}
var tag = `
<div>
<span>${data.name}</span>
<span>${data.age}</span>
<span>${1 + 1}</span>
<span>${foo()}</span>
<span>${foo2('nihaoya')}</span>
</div>
`
console.log(tag);
// <div>
// <span>zhangsan</span>
// <span>12</span>
// <span>2</span>
//<span>hello</span>
//<span>nihaoya</span>
// </div> 

//str.repeat()
{
    let a = 'abc'
    console.log(a.repeat(2));//abc abc
}

//str.padStart() str.padEnd()
{
    let str = '1'
    console.log(str.padStart(2,'0'));//01  补白  要求字符串 两位 不够的话 补0 从前面补
    console.log(str.padEnd(2,'0'));//10  从后面补
}

