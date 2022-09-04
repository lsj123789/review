##### 一、原型、原型链
###### 注：笔记中所有的"原型"指"_proto_","原型对象"指"prototyoe"
**1、概念**：
* js中分为函数对象和普通对象，每个对象都有_proto_,但只有函数对象有prototype属性
* Object、Function、Regexp、String、Number、Boolean、Date都是js内置函数，内置函数的prototype也只是一个普通对象，他的原型也指向其构造函数原型对象
* 属性_protp_是一个对象，有两个属性，分别是constructor和_proto_
* 原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建的   

**2、设计原型、原型链的准则**：
* 原型对象的constructor指向构造函数本身
* 实例的原型和构造函数的原型对象指向同一个地方

**3、分析经典原型、原型链关系图(图片在桌面 JavaScript中)**   
```javascript
// 从上方 function Foo() 开始分析这一张经典之图
function Foo()
let f1 = new Foo();
let f2 = new Foo();

// 实例原型等于构造函数原型对象
f1.__proto__ = Foo.prototype;
f2.__proto__ = Foo.prototype;
// Function.prototype本质上是一个对象 对象原型等于构造函数原型对象
Foo.prototype.__proto__ = Object.protitype;
// 原型链终止
Object.prototype.__proto__ = null;
// 原型对象的constructor指向构造函数
Foo.prototype.constructor = Foo;
// 实例原型指向构造函数原型对象 在图中 Foo 是一个Function
Foo.__proto__ = Function.prototype;
// Function.prototype是一个对象 对象原型指向构造函数原型对象
Function.prototype.__proto__  = Object.protitype;
// 原型链到此停止
Object.prototype.__proto__ = null;
// 此处注意Foo 和 Function的区别， Foo是 Function的实例

// 从中间 Function Object()开始分析这一张经典之图
Function Object()
let o1 = new  Object();
let o2 = new  Object();

// 实例原型指向构造函数原型对象
o1.__proto__ = Object.prototype;
o2.__proto__ = Object.prototype;
// 原型链到此停止
Object.prototype.__proto__ = null;
// 原型对象的constructor指向构造函数
Object.prototype.constructor = Object;
// 这里的Object是 Function Object 所以是函数实例 符合第二条设计原则 实例的原型 指向构造函数的原型对象
// 这里有点绕，Object本质是函数，Function本质是对象
Object.__proto__ = Function.prototype;
Function.prototype.__proto__ =  Object.prototype;
// 原型链到此停止
Object.prototype.__proto__ = null;

// 从下方 Function Function()开始分析这一张经典之图
Function Function()
// 实例原型指向构造函数原型对象
Function.__proto__ = Function.prototype
// 原型对象的constructor指向构造函数
Function.prototype.constructor = Function;
```

**4、意义**：
* 目前的理解是 实例共有属性可以放在原型上，减少内存消耗


##### 二、继承
1、ES5、ES6继承区别：
* ES5：实质就是先创建子类实例对象this，然后把父类的方法加到子类this上   
```Parent.call(this)```
* ES6: 先将父类实例的属性和方法加到this上，然后再用子类构造函数修改this（所以必须调用super）

2、ES5继承：
* 原型链继承：
    * 子类原型对象指向父类实例   
  ```Child.prototype = new Parent()```
    * 优点：可以继承父类所有属性和方法
    * 缺点：子类无法向父类传参；如果要给子类的原型上新增属性或方法，要放到```Child.prototype = new Parent()```这样的语句的后面；父类原型上的属性呗多个实例共享，可能造成一个实例修改了父类的某个属性导致其他实例上该属性也随之变化
* 构造函数继承
    * 在子类构造函数内部调用父类构造函数
    ```javascript
    fucntion Child() {
        Parent.call(this, ...arguments);
    }
    ```
    * call、apply立即执行，call传参一个一个传，apply以数组形式传参，bind创建一个新函数，使用时需要手动调用一下
    * 优点：保证原型链中引用类型值的独立，不再被所有实例共享；子类可以向父类传参
    * 缺点：只能继承父类实例的属性和方法，不能继承父类原型上的属性和方法
* 组合继承
    * 使用原型链继承实现继承父类原型上的属性和方法，借用构造函数实现对父类实例属性的继承
    ```javascript
    // 构造继承
    function Child() {
        Parent.call(this, ...arguments);
    }
    // 原型链继承
    Child.prototype = new Parent();
    // 修改constructor指向
    Child.prototyoe.constructor = Child;
    ```
    * 优点：可继承父类实例的属性方法，也可继承父类原型上的属性和方法；弥补原型链中引用属性共享问题；可传参可复用
    * 缺点：父类构造函数被调用两次；生成两个实例，子类实例中的属性和方法会覆盖子类原型（父类实例）上的属性和方法，增加不必要的内存
* 寄生组合式继承
    * 使用```Object.create(proto, [propertiesObject])```创建一个新对象，使用现有对象来提供新对象的proto,参数含义：proto指新创建的对象的原型对象，该参数最终返回到新建对象的原型上；propertiesObject是可选参数，指添加到新建对象上的可枚举属性，注意这些属性是他自身的，不是原型链上的
    ```javascript
    function Child() {
        Parent.call(this, ...arguments);
    };
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    ```
    * 优点：共有方法写在原型上；私有方法写在构造函数里；可以向父类传参；不会调用两次父类构造函数
    * 缺点：需要手动绑定constructor

2、ES6继承
* 通过class配合extends和super关键字实现继承
* super即可以做函数用，也可当对象用，两者区别：
    * 作为函数：代表父类构造函数，es6要求，子类构造函数必须执行一次super函数，super虽然代表父类构造函数，但返回的是子类实例，也就是super内部的this指向Child的实例，super其实就相当于 ```Parent.prototype.constructor.call(this)```,作为函数只能在子类构造函数中使用，在其他地方使用会报错
    * 作为对象：在普通方法中指向父类原型对象，那么此时只能通过super访问父类原型对象上的属性和方法，不能访问父类实例上的属性和方法；在静态方法中指向父类
    * 注意：在子类的构造函数中，只有调用super之后，才可以使用this，否则会报错，因为子类实例的创建是基于父类实例，只有super才能调用父类实例；使用extends关键字实现继承可以不使用constructor和super，因为没有的话会默认生成并调用他们

##### 三、this
1、ES5中，this永远指向最后一个调用它的那个对象
```javascript
    var name = "windowsName";
    var a = {
        // name: "Cherry",
        fn : function () {
        // undefined 因为最后调用他的是a
            console.log(this.name);
        }
    }
    window.a.fn();
```
```javascript
    var name = "windowsName";
    var a = {
        name : null,
        // name: "Cherry",
        fn : function () {
         // windowsName 因为a.fn赋给了f 而f是在window中调用的
            console.log(this.name);
        }
    }

    var f = a.fn;
    f();
```
```javascript
    var name = "windowsName";

    function fn() {
        var name = 'Cherry';
        innerFunction();
        function innerFunction() {
        // windowsName
            console.log(this.name);
        }
    }

    fn()
```
2、ES6 箭头函数：箭头函数中没有this绑定，必须通过查找作用域链来决定其值
3、函数的调用
* 作为一个函数调用
```javascript
    var name = "windowsName";
    function a() {
        var name = "Cherry";

        console.log(this.name);// windowsName

        console.log("inner:" + this); // inner: Window
    }
    a();
    // 非严格模式浏览器中 outer: Window node环境下 global  严格模式undefined
    console.log("outer:" + this)
```
* 函数作为对象的属性方法调用
```javascript
    var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);// Cherry
        }
    }
    a.fn();
```
* 使用构造函数调用函数, 使用new关键字的时候，就是调用了构造函数，看起来像创建一个函数，但其实是调用构造函数创建一个对象
```javascript
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// This creates a new object
var a = new myFunction("Li","Cherry");
a.lastName; // 返回 "Cherry"
```
* 作为函数方法 调用函数（call、apply）
```javascript
    var name = "windowsName";

    function fn() {
        var name = 'Cherry';
        innerFunction();
        function innerFunction() {
            console.log(this.name); // windowsName
        }
    }

    fn()
```

##### 四、函数柯里化
* 一种编程技巧：把本来接受n个参数的函数A，转换成只接受一个参数的函数B，B的唯一参数就是A的多个参数中的第一个参数，B返回一个函数C，C又接收一个参数（A的第二个参数），不断反复，直到返回一个接收A的第n个参数的函数N，N中判断这是最后一个函数了，执行，然后返回最终的值
* 简单例子：
```javascript
function add(a, b) {
    return a + b;
}

add(4, 6); // 10

// 非柯里化
function add () {
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

add(4, 6) // 10

// 函数柯里化
// 这个例子中，add函数有内部函数，内部函数一直引用着外部的n，这样就形成一个闭包，所以函数柯里化是闭包的一个应用之一
function add(num) {
    let x = num;
    return function(y) {
        return x + y;
    }
}

add(4)(6); // 10
```

##### 模块化规范
* AMD: Asynchronus Module Definition,异步模块定义，eg：require.js
```javascript
/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```
* CMD：Common Module Definition,通用模块定义,eg:sea.js
```javascript
/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a,b){
        return a+b;
    }
    exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function(math){
    var sum = math.add(1+2);
});
```
* AMD和CMD的区别：AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块；CMD推崇就近依赖，在用到的地方再去require
* CommonJS:主要在node中使用，通过require引入，module.export导出。CommonJS一个模块就是一个脚本文件，require命令第一次加载该脚本就会执行整个脚本，并在内存中生成一个如下对象：
```javascript
{
  // require模块名
  id: '...',
  // 模块输出的各个接口
  exports: { ... },
  // 该模块脚本是否执行完毕
  loaded: true,
  ...
}
```
也就是说，以后再用到这个模块时，就会从这个对象的exports属性上取值，即使再次执行require命令，也不会重新执行该模块，而是在缓存中取值，所以无论一个模块被require多少次，都只有第一次require时执行一次，以后再加载都是从缓存中取值，除非手动清除缓存
* ES6 Module:import 导入，export或export default导出，import是编译时执行，所以具有提升效果，会提升到模块头部首先执行，es6模块是动态导入，所以导入的模块不会被缓存，而是成为一个指向被加载模块的引用
* CommonJS和Module区别：
    * common是运行时加载，可以使用变量或表达式   
    ``` const 'f' + 'oo' =  require('my_modules')```   
    module是编译时加载，不可以使用变量或表达式，编译时执行加载效率更高
    * common暴露出来的是值的拷贝，也就是说一旦输出一个值，模块内部对该值的操作不影响模块外部这个值的拷贝
    ```javascript
    // lib.js
    var counter = 1;
    function addCounter() {
        counter++;
    }
    module.exports = {
        counter: counter,
        addCounter: addCounter
    }
    
    // main.js
    var counter = require('./lib').counter;
    var addCounter = require('./lib').addCounter;
    
    console.log(counter); // 1
    addCounter()
    console.log(counter); // 1
    ```   
    Module则相反，Module输出的是值的引用
