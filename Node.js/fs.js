const path = require('path')
const fs = require('fs')


//------------------文件操作--stat-----------------------------------------------------
console.log(1);
fs.stat(path.join(__dirname, './data.txt'), (err, stats) => {
    console.log(err);//null
    console.log(stats.isFIFO());//true  是否是文件
    console.log(stats.isDirectory());//false  是否是目录
    console.log(stats.atime);//访问时间
    console.log(stats.mtime);//内容修改时间
    console.log(stats.ctime);//文件修改时间
    console.log(stats.btime);//创建时间
    console.log(2);
})
console.log(3);
//执行结果 1 3 2 stat用于查看文件状态信息  是一个异步操作


//statSync是一个同步操作  传参时不用回调函数形式 直接使用一个返回值
console.log(4);
let ret = fs.statSync(path.join(__dirname, 'data.txt'))
console.log(ret);//一堆返回值
console.log(5);
//执行结果 4 ret的一堆值  5



//--------------------------文件存在性判断---------------------------------------------------
//fs.exists()判断文件是否存在
fs.exists(path.join(__dirname, 'data.txt', (exists) => {
    if (exists) {
        console.log('该文件存在');
    } else {
        console.log('该文件不存在');
    }
}))
//fs.stat()判断文件是否存在
fs.stat(path.join(__dirname, './data.txt', (err, stats) => {
    if (!err && isFile) {
        console.log('该文件存在');
    } else {
        console.log('该文件不存在');
    }
}))
//fs.access()判断文件是否存在（不推荐）
fs.access(path.join(__dirname, './data.txt'), (err) => {
    if (!err) {
        console.log('该文件存在');
    } else {
        console.log('该文件不存在');
    }
})

//---------------------------------文件操作--open---------------------------------------
// fs.open(path,flags[,mode],callback)
// path:文件的路径
// flags:打开文件的方式（读写修改）
// mode:Linux平台有效 可以控制文件的读写和可执行 777表示文件可读可写可执行
fs.open(path.join(__dirname, './data.txt'), 'r', (err, fd) => {
    //fd:flie discriptor 文件描述符  通过fd可以对文件进行操作，默认值从3开始 再次调用值会累加
    //判断文件是否存在 
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('文件存在，可继续通过fd对文件进行操作');
    }
})

//------------------------读文件--read---------------------------------------
// fs.read(fd,buffer,offset,length,position,callback)
// fd:文件描述符
// buffer:读取的数据放在buffer中
// offset：读取的数据从buffer的第几个数据开始写
// length：读取文件中数据的字节数量
// position：从文件的什么位置开始读

fs.open(path.join(__dirname, './data.txt'), 'r', (err, fd) => {
    let buf = buffer.alloc(5)
    fs.read(fd, buf, 0, 3, null, (err, bytes, buffer) => {
        console.log(buf == buffer);//true
    })
})

//---------------------------------写文件--write-----------------------------------------------
//fs.write(fd,buffer,offset,length[,position],callback)
// fs.write(fd,data[,position,[encoding]])
fs.open(path.join(__dirname, './data.txt'), 'w', (err, fd) => {
    let buf = buffer.from('hello')
    fs.write(fd, buf, 0, 3, (err, writen, buffer) => {//writtem指的是字节数量 而不是字符数量 在utf-8编码方式下，一个英文字符占一个字节 一个中文字符占三个字节
        console.log(buf === buffer);//true
    })
})
//方法重载:方法名称相同，但是参数个数不同，参数类型不同
fs.open(path.join(__dirname, './data.txt'), 'w', (err, fd) => {
    fs.write(fd, 'abc', (err, writen, str) => {
        console.log(err, writen, str);//null 3 'abc'
    })
})
//自定义方法不支持重载
let obj = {
    hello: function (info) {
        console.log('111', info);
    },
    hello: function (info, message) {
        console.log('222', info, message);
    }
}
obj.hello(abc)
//执行结果： 222 abc undefined

//---------------------------readFile-----------------------------------------------------------------------------
// fs.readFile(file[,options],callback)
// file:表示文件名称或者是文件描述符
// options:可以是字符串形式，表示编码（utf8）也可以是对象形式（encoding，flag）
fs.readFile(path.join(__dirname, './data.txt'), 'utf8', (err, data) => {
    //第二个参数指定编码utf8 那么打印出来data是字符型，不指定编码的话，打印出来的data是buffer对象
    console.log(data);
})
//--------------------------writeFlie-------------------------------------------------------------------------------
// fs.write(file,data[,options],callback)
// data:要写入的数据
fs.write(path.join(__dirnmae, './data.txt'), 'hello', (err) => {
    console.log(err);
})
//同步方式返回undefined
//------------------------------文件内容追加appendFile-----------------------------------------------------------------
//参数同writeFile
fs.appendFile(path.join(__dirname, './data.txt'), '程序员', (err) => {
    if (!err) {
        console.log('成功追加文件内容！');
    }
})

//-------------------------------删除文件fs.unlink---------------------------------------------------------------------------------
//fs.unlink(path,callback):只能删除文件 不能删除目录  可以删除快捷方式文件 删不掉快捷方式所对应的数据文件
fs.unlink(path.join(__dirname, './data.txt'), (err) => {
    if (!err) {
        console.log('文件删除成功！');
    }
})