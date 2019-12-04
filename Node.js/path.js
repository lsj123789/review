const path = require('path')

//截取路径中的文件名
let ret = path.basename('/foo/bar/baz/asdf/quux.html')
console.log(ret);//quux.html

let ret2 = path.basename('/foo/bar/baz/asdf/quux.html', '.html')
console.log(ret2);//quux

//截取路径名
let ret3 = path.dirname('/foo/bar/baz/asdf/quux')
console.log(ret3);///foo/bar/baz/asdf

//截取后缀名
let ret4 = path.extname('index.html')
console.log(ret4);//.html

//path.parse()：将字符串格式路径转为对象
let obj = path.parse('/home/user/dir/file.txt')
console.log(obj);
//运行结果
// {
//     root:'/',
//     dir:'/home/user/dir',
//     base:'file.txt',
//     ext:'txt',
//     name:'file'
// }

//path.format():与path.parse互逆，将对象格式的地址转化为字符串形式
let obj2 = {
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: 'txt',
    name: 'file'
}
let str = path.format(obj2)
console.log(str);// /home/user/dir\file.txt

//normalize():标准化路径
let str2 = path.normalize('C:\\temp\\\\foo\\bar\\..\\')//..表示上层路径，即bar的上层路径
console.log(str2);//C:\temp\foo\

//path.join()：路径拼接
let str3 = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')//拼接的是..上层的，即quux上层路径
console.log(str3);// \foo\bar\baz\asdf

//path.relative():计算相对路径
let str4 = path.relative('/data/orandea/text/aaa', '/data/orandea/impl/bbb')//后面路径相对于前面路径的相对路径
console.log(str4);//..\..\impl\bbb（..表示上层路径）