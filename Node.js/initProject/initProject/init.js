//初始化文件
const cfg = require('./config.json')

const path = require('path')
const fs = require('fs')
let rootName = cfg.rootName;
let init = () => {
    fs.mkdir(path.join(__dirname, rootName), (err) => {
        if (err) {
            console.log('根目录创建失败');
            return;
        }
        //成功时 遍历data 写入文件和目录
        cfg.data.forEach((obj) => {//obj是data里的对象数据
            if (obj.type == 'dir') {
                fs.mkdir(path.join(__dirname, rootName, obj.name), (err) => {
                    if (err) {
                        console.log('创建子目录失败');
                        return;
                    }
                    console.log(`${obj.name}目录创建成功`);
                })
            } else if (obj.type == 'file') {
                fs.readFile(path.join(__dirname, obj.name), (err, data) => {
                    if (err) {
                        console.log('读取文件失败');
                        return;
                    }
                    fs.writeFile(path.join(__dirname, rootName, obj.name), data, (err) => {
                        if (err) {
                            console.log('创建子文件失败');
                            return;
                        }
                        console.log(`${obj.name}子文件创建成功`);
                    })
                })
            }
        })
    })
}
init();