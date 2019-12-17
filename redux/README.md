👉TodoList
   优化：
         1.拆分actionType

         2.使用actionCreators统一创建action

         3.拆分UI组件和容器组件，UI组件中又只有一个render函数，可以写无状态组件，无状态组件没有react的component那么多的生命周期函数，所以提高了性能


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


👉redux中间件：增加middleware，可以在中途截获action并进行改变。可以串联不同的middleware来满足日常的开发，每个middleware都可以处理一个相对独立的业务需求。redux提供applyMiddleware()加载middleware，applyMiddleware()核心在于组合compose，通过将不同的middlewares一层一层包裹到原生的dispatch上，然后对middleware的设计采用柯里化的方式，便于compose，从而动态产生next方法以及保持store的一致性

👉redux-thunk：通过多参数的currying以实现对函数的惰性求值，从而将同步的action转化为异步的action

   function createThunkMiddleware(extraArgument){
      return ({dispatch,getState}) => next => action => {
         if(typeof action === 'function){
            return action(dispatch,getState,extraArgument)
         }
         return next(action)
      }
   }
   const thunk = createThunkMiddleware();
   thunk.withExtraArgument = createThunkMiddleware;
   export default thunk;

   redux-thunk代码很简单，通过函数式编程的思想来设计，让每个函数功能尽可能小，然后通过函数的嵌套组合来实现复杂的功能。首先检查action的类型，如果是函数，就执行这个action，并且把dispatch，getState,extraArgument作为参数传递进去，否则就调用下一个中间件继续处理action


👉redux-saga:管理redux应用异步操作的中间件，通过创建sagas将所有的异步操作逻辑存放在一个地方进行集中处理。一次将react中的同步操作与异步操作区分，以便于后期的管理和维护

saga可以简单定义成  saga = worker + watcher

redux-saga相当于在redux原有的数据流中多了一层，通过对action进行监听，从而捕获到监听的action，然后可以派生一个新的任务对state进行维护，通过更改的state驱动view的变更

saga的特点：

1.sage的应用场景是复杂异步

2.可以使用takeEvery打印logger，便于测试

3.提供takeLatest/takeEvery/throttle方法，可以便利的实现对事件的关注

4.提供cancel/delay方法，取消或延迟异步请求

5.提供race(effects),[...effects]方法支持静态和并行场景

6.提供channel机制支持外部事件


👉中间件区别

总的来讲，redux-saga适用于对事件操作有细粒度需求的场景，同时可供了更好的可测试性与可维护性，比较适合对异步处理要求高的大型项目，小而简单的项目可以使用redux-thunk就可以满足自身需求。