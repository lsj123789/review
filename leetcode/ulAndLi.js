//请把<ul><li>第1行</li><li>第2行</li>...</ul>（ul之间有10个li元素）插入body里面
var body = document.getElementById('body')
var ul = document.getElementById('ul')

for (let i = 0; i < 10; i++) {
    var li = document.getElementById('li')
    li.innerHTML = `第${i+1}行`
    ul.appendChild(li)
}

body.appendChild(ul)