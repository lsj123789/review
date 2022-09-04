## React
#### 1. JSX
* **JS语法的扩展**：所以定义属性时，使用小驼峰命名而不是HTML属性名称的约定规则
* **在jsx中嵌入表达式**：使用{}将表达式包裹起来，其中{}内可以是变量、js表达式甚至函数返回值
* **jsx标签属性值**：在jsx中，标签的属性值可以通过引号指定为字符串字面量，也可以通过{}指定为js表达式
* **jsx防止xss攻击**：React DOM在渲染输入内容之前会对其进行转义，这样可以确保在自己的应用中，渲染输入内容时，永远渲染的是自己应用中用户的输入，而不会注入那些并非自己编写的内容，可以有效防止xss攻击

#### 2. 元素渲染
* **将一个元素渲染为dom**：使用react构建的应用通常只有单一的根dom节点，想要把react元素渲染到根dom节点时，只需要将他们传入ReactDOM.render()中   
 => ```ReactDOM.render(element,container[,callback])```   
 在提供的container里渲染一个react element元素，并返回对该组件的应用(无状态组件返回null)，这里应该尽量避免使用返回的应用，因为在未来的版本中，组件的渲染可能会是异步的。   
如果element已经在container中渲染过，将不会重新渲染整个元素，而是找到元素前后差异，执行更新操作(react 虚拟dom diff算法)   
 如果提供了可选的回调函数，将会在组件被渲染或更新之后执行
* **更新已渲染元素**：   
 react元素是不可变对象，一旦被创建就不能修改他的子元素或者属性，所以更新UI的唯一方式就是创建一个全新的元素，将其传入ReactDOM.render()，这时react只会更新元素而不会重新渲染整个元素   
 改变类组件state，触发组件重新render
 
=>    
  1. **原因**：更新所有dom元素很慢，其实慢的不是dom操作，dom操作是很快的，真正慢的是dom改变时，浏览器需要重新计算css、进行页面布局，然后重新渲染页面。所以想要缩短渲染页面的时间，最关键的部分就是最小化dom的改变，在必要的时候才去重新渲染页面，而目前的浏览器是无法做到这一点的，所以react虚拟dom背后的策略就是这种批处理dom改变的策略
  2. **什么是虚拟dom**：简单来说就是js对象，因真实dom渲染效率低而产生。
  3. **虚拟doom怎样模拟真实dom操作**：使用createElement(tag,props,children)创建一个虚拟dom来模仿真实dom    
   ```tag```：dom元素标签，eg：a,div,ul,li...   
   ```props```:dom元素属性，eg：className、id、style   
   ```children```:dom元素的内容，字符串或其他虚拟dom组成的数组   
   这样，一个虚拟dom对象就拥有了自己的属性和结构，我们对他进行的任何操作都是在内存中进行的(这也是虚拟dom性能好的一个原因)，想要得到真实的dom，还需要借助render(virtualDOM,DOM)将虚拟DOM解析解析成真实DOM渲染到页面
  4. **虚拟DOM原理**：   
  第一步，初始化：定义类型   
  ```javascript
  // 定义一个tag类型集合
  const tagTypes = {
      HTML:'HTML',
      TEXT:'TEXT'
  }
  // 定义children类型集合
  const childrenTypes = {
      // 子元素只有一个 说明是字符串
      single: 'single',
      // 子元素是一个数组 数组里是多个元素
      many: 'many',
      // 子元素为空，说明没有子元素
      empty: 'empty'
  }
  ```
  第二步，根据入参类型，返回一个你想要的结构并且是整合好的js对象
  ```javascript
  // 创建虚拟DOM的方法
  function createElement(tag, props, children){
      // 定义tag类型
      let type
      // 如果tag存在，那么该元素是html，else字符串
      if(typeof tag === 'string'){
          type = tagTypes.HTML
      }else{
          type = tagTypes.TEXT
      }
      // 定义children类型
      let childrenType
      // 如果children是文本的时候，创建一个文本虚拟dom
      // 如果children是数组的时候，创建一个有直接点的虚拟dom
      // 如果children是空，创建一个空的虚拟dom
      if(typeof children === 'string'){
          childrenType = childrenTypes.single
          // createTextNode():创建文本节点
          children = createTextNode(children)
      }else if(Array.isArray(children)){
          childrenType = childrenTypes.many
      }else{
          childrenType = childrenTypes.empty
      }
      // 返回虚拟dom对象
      return {
          el:null,
          type,
          tag,
          props,
          children,
          childrenType
      }
  }
  // 创建文本虚拟DOM，直接返回对应文本虚拟DOM就好
  function createTextNode(text){
      return {
          type:'text',
          tag:null,
          props:null,
          children:text,
          childrenType:childrenTypes.empty
      }
  }
  ```
  第三步，执行渲染方法 render
  ```javascript
  // 渲染方法 render
  function render(vnode,container){
      if(container.vnode){
          //如果虚拟DOM已经存在，执行更新操作 这一步是核心diff算法 后面单独来写  这里暂时只写第一次渲染的情况
      }else{
          // 虚拟DOM不存在，执行挂载
          mounted(vnode,container)
      }
      // 判断是初次渲染还是更新渲染
      container.vnode = vnode
  }
  // 首次渲染方法
  function mounted(vnode,container){
      let { type } = vnode
      if(type === 'HTML'){
      // 渲染HTML的方法
        mountedElement(vnode,container)
      }else{
          // 渲染文本的方法
          mountedText(vnode,contaienr)
      }
  }
  // 渲染HTML的方法
  function mountedElement(vnode,container){
      let { type,tag,props,children,childrenType } = vnode
      // el是真实的dom元素，此处创建tag对应的真实DOM赋给el
      var el = document.createElement(tag)
      vnode.el = el
      // 遍历设置props属性
      if(props){
          for(var key in props){
              // 设置DOM属性的方法
              patchProps(el,key,null,props[key])
          }
      }
      //判断该元素的子元素类型
      if(childrenType === childrenTypes.single){
          //childrenType是single也就是文本，调用渲染文本的方法渲染该元素
          mountedText(children,el)
      }else if(childrenType = childrenTypes.many){
          // 如果是many说明有嵌套的子元素，遍历每个子元素，用首次渲染的方法渲染每个子元素
          children.forEach(item) => {
              mounted(item,el)
          }
      }
      // 渲染完成，插入到父级里面
      container.appendChild(el)
  }
  // 创建文本虚拟DOM
  function createText(vnode,container){
      // 创建一个文本节点，直接插入到父级
      var textNode = document.createTextNode(vnode.children)
      vnode.el = textNode
      container.appendChild(textNode)
  }
  // 挂载属性的方法(只覆盖一部分情况)
  // @param:{ el } 设置属性的元素
  // @param:{ key } 属性的key值
  // @param : { oldValue } 旧的value
  // @param:{ newVal } 新的value
  function patchProps(el,key,oldValue,newValue){
      switch(key):
      case 'className':
        el.className = newVal
        break
      case 'id':
        el.id = newVal
        break
      case 'onClick':
        el.addEventListenr("click",newVal)
        break
      case 'style':
        for(var sKey in newVal){
            el.style[sKey] = newVal[sKey]
        }
        break
      default:
      if(key != 'key'){
          // 设置元素属性
          el.setAttribute(key,newVal)
      }
  }
  ``` 
  
  #### 3. 组件
  * **类组件(有状态/无状态)** ：使用es6 继承React.Component 
  优点：其功能比函数组件功能强大，即可以接收外部传来的props又可以在内部维护自己的状态变量state，有不同的生命周期方法供开发者在组件的不同阶段(挂载、更新、卸载)对组件进行控制，
  * **函数组件(内部不使用useState时为无状态组件)**：本质上是一个js函数，内部不使用state，只根据外部传来的props返回待渲染的react元素，因此属性命名时尽量从组件自身角度命名，而不是依赖于调用组件的上下文来命名
  * **高阶组件(HOC)**：不是API，是基于react特性形成的设计模式，是一个函数，并且是纯函数，接收一个组件作为参数，但是不能修改传入的组件，也不会通过继承复制这个组件，他通过将组件包装在容器组件中来组成新组件，一般都是传入组件用容器组件的数据，然后返回一个新的组件。可以简单将HOC理解为参数化容器组件   
  与普通组件的区别：普通组件是将props转为UI，高阶组件是将组件转为新的组件   
  不要在render中调用HOC：react diff算法使用组件标识来确定是执行更新操作还是替换操作，如果render返回的组件与上一个组件全等，则更新，不全等则卸载前一个组件挂载新的组件，如果在render中使用HOC的话，每次render都会创建一个新的HOC返回的组件，造成性能问题且可能存在组件内容丢失问题   
  Refs不会被传递：HOC约定将所有props传递给被包装组件(也就是传入HOC的组件)，但ref不适用，因为ref实际上不是prop，他是由react单独处理的，如果将ref传给被包装组件，那ref也只会指向容器组件，而不是被包装组件。=> 可通过React.forwardRef解决(```TODO```：在学习ref时再整理React.forwardRef)
  
#### 4、props & state
* **props**：只读，无论是函数组件还是类组件中，都要像纯函数(对于同样的输入有同样的输出，不尝试改变入参)一样保护props不被修改
* **state**：与props类似，但是私有的，完全受控于当前组件
  1. **不要直接修改state**：保证单向数据流，构造函数才是唯一可以修改state的地方，所以要调用setState()修改state
  2. **state的更新可能是异步的**：react可能会把多个setState()合并为一个，所以props和state的更新可能会是异步的，尽量不要依赖他们的值更新下一个状态   
  =>   
  解决办法1：在setState()的第二个参数(回调函数)中可以获取到最新的state   
  解决办法2：使用函数方式，nextState也可以是一个函数，结构就是 function(state,props){return newState}
   ```javascript
        this.setState((state,props) => {
          return xxx
        })
   ```
  3. **state的更新可能会被合并**：原因就是setState()在生命周期和合成事件中批量覆盖执行，具体表现就是多次同步执行setState(),会进行合并，类似于Object.assign()，遇到相同的key后面的key对应的值会覆盖前面的， eg：
  ```javascript
  const user1 = { name:'zhangsan', age:18 }
  const user2 = { name:'lisi', sex:meil }
  Object.assign({}, user1, user2)
  // { name :'lisi', age: 18, sex: meil}
  ```   
  =>   
  **setState()更新策略**：   
  在react的setState()中，根据一个变量isBatchingUpdates判断是直接更新state还是放到队列里之后再更新，默认是false，也就是同步更新state，但是有一个banchedUpdates()会把isBatchingUpdates的值改为true，react在调用事件处理函数之前就会调用banchedUpdates()，就会造成state的异步更新。也就是说react控制的事件处理过程就会异步更新state，react控制之外（指绕过react通过addEventListener直接添加事件处理函数或定时器产生的异步调用,promise的异步操作）的会同步更新   
  **react事件机制**：   
  除audio、video标签的媒体事件(eg:onpause、onplay)以外，其他所有事件都绑定到document上，对于每种事件类型都拥有统一分发函数dispatchEvent。react内部事件系统分为两个阶段，事件注册和事件触发。   
  事件注册：在组件加载、更新时需要处理props，也就是props渲染时，如果一个属性是事件，就会调用一个函数进行事件注册，这个函数做两件事，一是在ducument上注册这个事件，二是存储这个事件。document不管注册的是什么事件，都有一个回调函数，回调函数不处理事物，只分发事件   
  事件执行：根据原生的事件对象，找到触发这个事件的DOM和DOM所在的component，生成合成事件(react内部会根据不同的事件类型生成不同的合成事件，在生成过程中获取相关回调函数)、批量执行回调函数(将所有合成事件放在一个队列中，逐个执行)进而批量更新
  4. **数据是向下流动的**：组件可以选择将自己的state向下传递给子组件，但是子组件是无法知道该数据是来自父组件的props、state还是手动输入的，也就是state只能属于特定组件，而且从state派生的其他数据只能影响低于(子组件、孙组件...)这个组件本身的组件，不能反向进行。
  
#### 5、生命周期
###### 按执行过程划分：
* **挂载**：当组件实例被创建且插入到DOM中执行：
```contructor()``` => ```static getDerivedStateFromProps()``` => ```render```=>```componentDidMount```
* **更新**：当组件state或props变化时执行：```static getDerivedStateFromProps()```=>```shouldComponentUpdate()```=>```render```=>```getSnapshotBeforeUpdate()```=>```componentDidUpdate()```
* **卸载**：组件从DOM中移除时 执行：```componentWillUnmount()```
* **错误处理**：渲染过程、子组件、生命周期抛错时执行```static getDerivedStateFromProps()```和```componentDidCatch()```
###### 每个生命周期函数详细说明：
* **render**：
  * class组件中唯一必须实现的方法
  * 首次渲染和props或state变化时触发
  * 应该是一个纯函数，在state不变时，每次调用都返回同样的结果
  * 不与浏览器交互，如果想交互放在其他生命周期钩子里做(一般放在componentDidMount()中)
  * shouldComponentUpdate()返回false时 不调用render()
* **contructor**：
  * 不初始state或不进行方法绑定，就不需要contructor
  * 只能在contructor中为state赋值，不能调用setState改变state的值
  * react组件在挂在之前会调用他的构造函数，子类是没有自己的this对象的，他只能继承父类，如果一个子组件想要使用父组件的this，必须在子组件的contructor()中调用super(props)继承父类的this
* **componentDidMount**：   
  * 组件挂载后(DOM生成)调用
  * 是做数据请求的最好地方
  * 可以添加订阅，但一定要在componentWillUnmount()中取消订阅
* **componentDidUpdate(prevProps,prevState,snapshot)**
  * 组件更新后调用，首次渲染不会调用
  * 组件更新后，可在这里操作DOM
  * 可比较组件更新前后的props，从而做一些操作，eg：当前后props不一致时，再去请求数据
  * 如果组件调用了getSnapshotBeforeUpdate()，则将该函数的返回结果作为componentDidUpdate()的第三个参数传入，如果没有则第三个参数为undefined
  * shouldComponentUpdate()返回值为false 则不触发componentDidUpdate()
* **componentWillUnmount()**：
  * 在组件卸载和销毁之前调用
  * 在这里清除定时器、取消componentDidMount()中的订阅、取消请求
* **shouldComponentUpdate(nextProps,nextState)**
  * state或props发生变化组件重新渲染之前调用
  * 以前做性能优化时，调用该函数返回false 阻止组件重新渲染
  * 不要在该方法中做生成对比或是JSON.stringfy()(因为效率低？？？)
  * 现在可以直接将组件定义为pureComponent,pureComponent会对props和state做浅层对比，从而阻止一些不必要的更新
* **static getDerivedStateFromProps(props,state)**
  * render之前、初始挂载及后续更新时调用
  * 返回一个对象用于更新state，返回null啥也不更新
  * 适用场景：state的值会被父组件props改变时调用，所以该生命周期中也只能判断外界props属性与内部state不一致时return新的state，其他情况return null(适用场景有限 不常用)
* **getSnapshotBeforeUpdate(prevProps,prevState)**:
  * 最近一次渲染输出之前调用
  * 让组件可以在更改之前从DOM中获取一些信息 eg:滚动位置
  * 返回值传给componentDidUpdate
  * 适用场景有限，不常用   

* **getDerivedStateFromProps和componentWillReceiveProps区别**：   
    * componentWillReceiveProps：组件初次加载时不触发，只有父组件setState（即使父组件此次setState没有改变子组件的props或者子组件没有被传入props）时才触发子组件该生命周期，子组件自身setState不会触发该生命周期，若父组件通过静态变量方式改变传入的props时不触发子组件该生命周期，也就是说父组件必须setState重新render，才能在render中触发子组件的重新渲染，进而触发子组件该生命周期函数   
    * getDerivedStateFromProps：组件首次加载会触发、fu、子组件setState都会触发、父组件传入该组件的props变化也触发，该生命周期中的prevState，如果由于子组件自身setState的话，那么prevState就是即将要更新的state，如果是由于父组件props变化触发该函数，那么prevState是当前组件的state，即：this.state，**该生命周期return的state才是组件最终的state，所以set之后的state并不一定是组件最终state，因为该生命周期可能会拿到即将更新的state，也就是prevState，对其做一些处理，然后返回一个新的
    state**，该生命周期最终return的state对于shouldComponentUpdate来说，是其参数中的nextState，对于componentDidUpdate来说是其内部的this.state
    * 注：componentDidUpdate(prevProps,prevState)中的prevState是组件更新之前（可能是组件内部setState或是外部props变化引起的）组件的state，并不是getDerivedStateFromProps中return的state，该生命周期内部的this.state才是getDerivedStateFromProps中return的state

#### 6、key & diff算法
###### key：
* 在一个组件中渲染列表，列表项必须包含一个独一无二的key值
* key值只要在其兄弟节点间独一无二就好 不需要在全局独一无二
* key值是不可读的 比如父组件定义的key如果以属性的形式传给子组件，子组件是收不到的（可以通过其他属性命名传给子组件）   
 eg：```<Child key = { index } />```是拿不到key的   
    ```<Child id = { index } />```是可以拿到值的
* react会在渲染数组时 自动为数组项加上值为index的key，但使用index作为key是有问题的，react diff算法需要key值做判断，如果在数组项最前面插入一个值，那么index对应的值发生了变化，react会用新的值替换旧的值同时删除旧的值
###### diff算法：
* 了解diff算法前 需要先了解 react fiber分片和优先级的概念 这里先简单将fiber理解为DOM结构的js映射
* 标准diff算法复杂度O(n^3),考虑到前端很少跨级别修改节点，所以虚拟DOM在比较时只比较同一层的节点，复杂度降到O(n)，而且比较时只比较key和type是否相同，相同就为同一节点
* diff算法的原则：
  * diff的是内存中的数组与链表，可以说是通过sibling属性链接的fiber链表(vnode)与react元素数组之间的diff，不会操作DOM，但会给fiber贴上需要换位置、需要删除的标签
* 对谁diff
  * newChildren:在执行app组件render中的return时，会通过插件babel/preset-react调用react.createElement将jsx编译成react.createElement的形式，react.createElement从第三个参数开始就是其children，他们组成的数组就是newChildren
  * oldFibers:fiber是从react.createElement返回的reat元素生成的，fiber的return属性是指向父节点的fiber，其sibling属性指向右边第一个兄弟节点，react元素是jsx编译后的产物，fiber是存在于组件生命周期中的对象，保存了组件状态以及实例或是DOM的引用，就是DOM结构的js映射
* diff算法的实现：
  * 四个阶段：
    1. 链表、数组从头到尾同向遍历，直到oldfiber没有被复用，也就是key不相同或index不匹配
    2. 数组遍历完了，将链表剩余节点标记删除
    3. 链表遍历完了，为数组剩余的每个元素创建新的fiber
    4. key对比
  * 分层比较：diff算法在比较新旧虚拟dom时，只比较同一层
  * 减少比较次数：比较新旧两个虚拟dom时，优先比较两个dom的根节点，如果根节点不相同就认为他们子节点也不相同，就不会继续递归比较两个子树，而是直接删除旧根节点以及根节点下的子节点，然后新的节点更新到旧的上面
  * 稳定的DOM：用key标识节点是否唯一，在两个节点type相同时比较key

#### 7、HOOK
* 在不编写class的情况下 使用state或其他特性
* 就是一个js函数
* 只能在函数最外层调用HOOK，不要在循环、条件判断、子函数中调用
  * => 原因：react在创建HOOK时，以链表的结构存储，前一个HOOK的next指针指向下一个HOOK，在组件更新时会进行HOOK的一一对比，所以要保证每一个HOOK的位置相同、数量一致，循环、条件判断中调用的话会导致数量、位置发生变化，产生错误   
  以自定义useState()为例：   
  ```javascript
  var _state
  function useState(initiaValue){
  //没有_state 说明是第一次执行 把initialValue赋给_state
      _state = _state || initialValue
      function setState(newValue){
          _state = newValue
          render()
      }
      return [_state,setState]
  }
  ```
  到这里一个useState()就实现了，但这个useState只能用一次，因为只有一个_state，想多次使用，就需要一个可以存放多个hook的结构，所以组件渲染时将hook按照调用顺序以链表形式挂在fiber Node上，在组件第一次渲染时，每调用一个hook，就会在链表末尾插入这个hook，在重新渲染的时候，每调用一个hook，会将这个hook从链表中取出，执行更新操作，再插入这个hook原来在链表中所在的位置，这时如果在嵌套的逻辑中出现hook就会出错      
  如果想要有条件的执行effect 可以将条件判断放在effect内部
  *** 
  ```TODO:为什么使用链表而不是数组？？？```   
  是因为链表只需要知道插入位置的前后  插入速度快？？？   
  那数组根据下标也可以快速找到位置
  ***   
* 只能在react函数组件或自定义HOOK中调用HOOK，不要在其他js函数中调用
###### useState()
* 在函数组件里调用useState()来给组件内部添加state
* 重复渲染时，会保留这个state
* 返回一对值，当前状态和更新状态的函数   
  => 与setState()的区别：更新state后 setState()在回调函数中可拿到最新state，useState()在useEffect()中可拿到最新state
* 如果state的初始值需要经过复杂的计算得来，可以传入一个函数，在函数中返回计算后的初始state且此函数只在组件初始渲染时调用
###### useEffect()
* 在函数组件中执行副作用(数据获取、订阅、修改DOM)操作
* 与componentDidMount()、componentDidUodate()、compondnentWillUnmount()具有相同用途
* 在函数组件完成对DOM的更改后调用 默认首次渲染和后续更新都会执行，如果想要实现类似componentDidUpdate()的功能，可在useEffect()的第二个参数传入一个state，当这个state发生变化时才会执行这个由useEffect(),清除操作同样。如果想执行只运行一次(组件挂载和卸载时)的effect，可以在第二个参数传入一个[],告诉react这个effect不依赖于任何props和state，所以不需要重复执行。
* 每次重新渲染，都生成新的effect，替换掉之前的
* react会等待浏览器完成页面渲染之后再调用effect，所以不会阻塞浏览器渲染，让页面加载看起来更快
* 可在useEffect()中返回一个执行清除操作的函数，react会在组件卸载时执行清除操作
###### 自定义HOOK
* 想在两个函数之间共享逻辑时，可以将他提取到第三个函数中，也就是自定义的HOOK中(使用高阶组件同样可以达到效果，只是别人看这个代码时可能会难以理解)
* 自定义Hook是一个函数，以"use"开头，内部可以调用其他HOOK
###### useContext()
* 在组件之间共享状态时可以使用，eg：两个子组件都想使用父组件中的一些逻辑，可以在父组件使用React.createContext()来创建一个context 然后在子组件中使用   
```TODO：对useContext()没有更深的理解 之后看文档有新的理解再补充```

### 8、refs
* **定义**：通过ref将组件传到子组件的方法，是除props典型数据流以外 可以强制修改子组件的方法，注：避免使用refs来完成任何可以通过声明式来完成的事情
* **创建**：```React.createRef()```创建，通过ref属性附加到react元素上
* **访问**：
    * 当ref作用于html元素时，通过```current```属性访问对该节点的引用
    * 当ref作用于class组件时，其```current```属性是class组件的挂载实例
    * ref不能作用于函数组件，因为函数组件没有实例，如果非要在函数组件中使用，可以使用```forwardRef```（forwardRef可以获取自己的ref实例，然后通过ref向下传递给子组件）与``` useImperativeHandle```结合使用
* **触发**：组件挂载时给current传入dom，组件卸载时传入null，ref在componentDidMount和componentDidUpdate触发之前更新
* **在高阶组件中**：在ref不是props，不能透传，这点和key类似，都被react做了特殊处理，如果对HOC添加ref，那么ref引用的是最外层的容器组件，而不是被包裹组件    
  => 解决办法：```forwardRef```可以将refs转发到内部被包裹的组件，接收一个渲染函数，渲染函数接收prop和ref参数，返回一个react节点

#### 9、fragments
* react render要求返回一个元素，当不想用无用的div标签包裹时，可以考虑使用fragments，类似一个空标签
* key是唯一可以传给fragments的元素
* 使用：```<>...</>```

#### 10、react事件系统
* **概念**：react合成事件对象组成合成事件系统   
    * 合成事件和原生事件相同点：
        * 核心概念相同（event、target...）
        * dispatch机制相同，一个事件的触发，都会向上传播   
    * 不同点：
        * 注册方式不同，原生事件属性名小写，合成事件属性采用小驼峰命名规则
        * 对捕获事件的注册不同，原生事件通过addEventListener()的第三个参数来判断事件是否绑定在捕获阶段，合成事件想要绑定在捕获阶段属性名需要按照形如```onClickCapture```来命名
        * 事件监听器中，this指向不同，原生事件this指向current event target，合成事件指向当前组件实例
        * 事件监听器中，event object不同，合成事件中，event object是原生event object的wrapper，也就是说原生event object是作为一个key(key名为nativeEvent)挂载在合成事件event上的，也就是合成事件对象是原生事件对象的父
* **框架图**：
```
 * React和事件系统概述:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
```
注：   
reactEventListner:注册事件      
reactEventEmitter:分发事件   
eventPluginHub:事件存储和分发   
plugin：根据不同事件类型构造不同的合成事件   
流程：   
1）reactEventListener 捕获原始浏览器事件    
2）react对事件进行操作，解决event在不同浏览器上的差异   
3）将事件转发到eventPluginHub询问是否要提取任何合成事件   
4）eventPluginHub对每个事件添加dispatches，对其进行处理   
5）eventPluginHub调度分派事件
* **事件注册**：
    * enqueuePutListener()：调用listenTo()将事件注册到document上，调用putListener()存储对象
```
function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction) {
    return
  }
  var containerInfo = inst._hostContainerInfo
  var isDocumentFragment =
    containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE
  // 找到document
  var doc = isDocumentFragment
    ? containerInfo._node
    : containerInfo._ownerDocument
  // 注册事件，将事件注册到document上
  listenTo(registrationName, doc)
  // 存储事件,放入事务队列中
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  })
}
```
 listenTo():
 ```
 export function listenTo(
  registrationName: string,// 就是传过来的事件属性名 eg: onClick
  mountAt: Document | Element | Node
): void {
  const listeningSet = getListeningSetForElement(mountAt)
  // registrationNameDependencies就是存储了react事件名与浏览器原生事件名对应的一个Map，可以通过这个map拿到浏览器事件名
  const dependencies = registrationNameDependencies[registrationName]

  for (let i = 0; i < dependencies.length; i++) {
    const dependency = dependencies[i]
    // 调用该方法进行注册
    listenToTopLevel(dependency, mountAt, listeningSet)
  }
}
```
* **事件存储**：enqueuePutListener()
```
function enqueuePutListener(inst, registrationName, listener, transaction) {
  //...
  // 注册事件，将事件注册到document上
  listenTo(registrationName, doc)
  // 存储事件,放入事务队列中
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  })
}
```
putListener:
```
putListener: function (inst, registrationName, listener) {
  // 用来标识注册了事件,比如onClick的React对象。key的格式为'.nodeId', 只用知道它可以标示哪个React对象就可以了
  // step1: 得到组件唯一标识
  var key = getDictionaryKey(inst);

  // step2: 得到listenerBank对象中指定事件类型的对象
  var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});

  // step3: 将listener事件回调方法存入listenerBank[registrationName][key]中,比如listenerBank['onclick'][nodeId]
  // 所有React组件对象定义的所有React事件都会存储在listenerBank中
  bankForRegistrationName[key] = listener;

  // ...
}

// 拿到组件唯一标识
var getDictionaryKey = function (inst) {
  return '.' + inst._rootNodeID;
};
```
* **事件分发**：到这里事件已经委托到document上并且存储起来了，这里只需要找到对应的事件类型然后执行就可以了
```
const nativeEventTarget = getEventTarget(nativeEvent)
let targetInst = getClosestInstanceFromNode(nativeEventTarget)
```
```
function getEventTarget(nativeEvent) {
  let target = nativeEvent.target || nativeEvent.srcElement || window

  if (target.correspondingUseElement) {
    target = target.correspondingUseElement
  }

  return target.nodeType === TEXT_NODE ? target.parentNode : target
}
```
batchedEventUpdates批量更新：把当前触发的事件放到批处理队列中
```
function dispatchEventForPluginEventSystem(
  topLevelType: DOMTopLevelEventType,
  eventSystemFlags: EventSystemFlags,
  nativeEvent: AnyNativeEvent,
  targetInst: null | Fiber
): void {
  const bookKeeping = getTopLevelCallbackBookKeeping(
    topLevelType,
    nativeEvent,
    targetInst,
    eventSystemFlags
  )

  try {
    batchedEventUpdates(handleTopLevel, bookKeeping)
  } finally {
    releaseTopLevelCallbackBookKeeping(bookKeeping)
  }
}
```
事件回调可能会改变DOM结构，所以先遍历层次结构，防止任何嵌套的组件，然后缓存起来
```
function handleTopLevel(bookKeeping: BookKeepingInstance) {
  let targetInst = bookKeeping.targetInst
  let ancestor = targetInst
  do {
    if (!ancestor) {
      const ancestors = bookKeeping.ancestors
      ;((ancestors: any): Array<Fiber | null>).push(ancestor)
      break
    }
    const root = findRootContainerNode(ancestor)
    if (!root) {
      break
    }
    const tag = ancestor.tag
    if (tag === HostComponent || tag === HostText) {
      bookKeeping.ancestors.push(ancestor)
    }
    ancestor = getClosestInstanceFromNode(root)
  } while (ancestor)
}
```
for循环遍历这个react Component及其所有父组件,然后调用runExtractedPluginEventsInBatch
```
for (let i = 0; i < bookKeeping.ancestors.length; i++) {
  targetInst = bookKeeping.ancestors[i]
  // getEventTarget上边有讲到
  const eventTarget = getEventTarget(bookKeeping.nativeEvent)
  const topLevelType = ((bookKeeping.topLevelType: any): DOMTopLevelEventType)
  const nativeEvent = ((bookKeeping.nativeEvent: any): AnyNativeEvent)

  runExtractedPluginEventsInBatch(
    topLevelType,
    targetInst,
    nativeEvent,
    eventTarget,
    bookKeeping.eventSystemFlags
  )
}
```
综上，可以看出react实现自己的一套冒泡机制，从触发事件的对象开始，向父组件回溯，依次调用他们注册的callback

* **事件执行**：runExtractedPluginEventsInBatc()是事件执行的入口，他的作用是构造合成事件和批处理构造出的合成事件

* **源码解析文档**：
    * https://juejin.im/post/6844903988794671117#heading-1
    * https://juejin.im/post/6844904066397503502 

* **支持的事件**：https://zh-hans.reactjs.org/docs/events.html
