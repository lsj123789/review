// 自定义异步加载文件
function loadScript(url, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    //兼容ie
    if (script.readyState) {
        script.onreadystatechange = () => {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                callback()
            }
        }
    } else {
        script.onload = () => {
            callback()
        }
    }
    script.src = url; // 必须放在判断条件之后 如果放在前面的话  该url下的文件加载完成 后面就无法根据状态码判断条件了
    document.head.appendChild(script)
}