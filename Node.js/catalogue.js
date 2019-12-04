const path = require('path')
const fs = require('fs')

//-----------------------------------------------------------创建目录--------------------------------------------------
// fs.mkdir(path[,mode],callback)
fs.mkdir(path.join(__dirname, './hi'), (err) => {
    if (!err) {
        console.log('目录创建成功！');
    }
})
//-----------------------------读取目录-------------------------------------------------------------------------
fs.readdir(__dirname, (err, flies) => {
    flies.forEach((e) => {
        fs.stat(path.join(__dirname, e), (err, stats) => {
            if (stats.isFile()) {
                console.log(`${e}是文件`);
            } else if (stats.isDirectory()) {
                console.log(`${e}是目录`);
            }
        })
    })
})
//-------------------------删除目录------------------------------------------------------------------------------------
fs.rmdir(path.join(__dirname, 'hi'), (err) => {
    if (!err) {
        console.log('目录删除成功！');
    }
})