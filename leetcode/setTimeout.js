// setTimeout 模拟实现setInterval
//setInterval缺点：
// 1.不关心调用代码正确与否，即使是错误代码也会重复执行
// 2.相当于每隔一段时间向异步操作队列中添加一个函数，
//   如果该函数调用时间小于setInterval添加下一个函数的时间
//   会跳过本次调用，可能出现不是预期的结果
const set = time => {
  return setTimeout(() => {
    set()
  }, time)
}
set(3000)