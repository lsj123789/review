
👉redux:是js的状态容器，提供可预测化的状态管理
应用中所有的state都以一个对象树的形式存储在一个单一的store中。唯一改变state的办法就是出发action，一个描述发生什么的对象。为了描述actio如何改变state树，需要编写reducer。

👉三大原则
  1.单一数据源：整个应用的state被储存在一棵object tree中，并且该object tree只存在于唯一一个store中。
  2.state是只读的：唯一改变state的办法就是出发action，action是一个用于描述已发生事件的普通对象。
  3.使用纯函数来进行修改：为了描述action如何改变state tree，需要编写reducer，reducer只是一些纯函数，接收先前的state和action，并返回新的state

👉数据流：严格的单向数据流是redux架构的设计核心。所有数据都遵循相同的生命周期，泽阳可以让应用变得更加可预测且容易被理解。
   1.调用store.dispatch(action)，action就是一个描述发生了什么的普通对象
   2.redux store调用传入的reducer函数，store会把当前的state树和action两个参数传入reducer。注意：reducer是纯函数，仅用于计算下一个state，他应该是完全可预测的，多次传入相同的输入必须产生相同的输出。不能执行有副作用的操作，比如：API调用或是路由跳转，这些应该在dispatch action之前发生
   3.根reducer应该把多个子reducer输出合并成一个单一的state树。redux原生提供combineReducers()辅助函数，来把根reducer拆分成多个函数，哟关于分别处理state树的一个分支
   4.redux store保存了根reducer返回的完整state树，这个新的树就是应用的下一个state。所有订阅store.subscribe(listener)的监听器都将被调用，监听器可以调用store.getState()获得当前的state

👉TodoList
   优化：1.拆分actionType
         2.使用actionCreators统一创建action
         3.拆分UI组件和容器组件，UI组件中又只有一个render函数，可以写无状态组件，无状态组件没有react的component那么多的生命周期函数，所以提高了性能