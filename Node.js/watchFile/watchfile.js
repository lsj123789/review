//文件监控
//fs.watchFile(filename,[,options],listener)
//fileName:监控文件名称
// options（persistent=true(持久监听 直到文件结束),interval=5007(每隔多少毫秒监控一次文件的变化)）
//listener：事件函数

//fs.unwatchFile(fileName[,listener])//阻止监听特定文件  listener默认不写的时候会阻止监听所有文件
const path = require('path')
const fs = require('fs')

// 第一种：直接将回调函数写到watchFile()参数中
fs.watchFile(path.join(__dirname, 'data.json'), { intercal: 100 }, (curr, prev) => {
    console.log(curr);//之前的文件相关
    console.log(prev);//修改后的文件相关
})


//第二种：将回调函数提取出来  有利于阻止监控时使用
let cd = (curr, prev) => {
    console.log(curr);
    console.log(prev);
}

fs.watchFile(path.join(__dirname, './data.json'), cd)

setTimeout(() => {
    fs.unwatchFile(path.join(__dirname, './data.json'), cd)
}, 5000)

