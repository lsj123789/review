// ES5寄生组合式继承
{
    function inheritPrototype(subType, superType) {
        let prototype = object.create(superType.prototype) // 以父类对象的原型对象 创建一个新对象
        prototype.constructor = subType // 增强对象  修改因重写原型而失去的默认的constructor
        subType.prototype = prototype // 指定对象  将新创建的对象赋给子类的原型
    }
    //从父类初始化实例属性和原型属性
    function superType(name) {
        this.name = name
    }
    superType.prototype.sayName = function () {
        console.log(this.name)
    }
    //借用构造函数增强子类实例
    function subType(name, age) {
        superType.call(this, name)
        this.age = age
    }
    // 父类原型指向子类
    inheritPrototype(subType, superType)
}

// ES6实现继承
{
    class Person {
        constructor(name, age) {
            this.name = name
            this.age = age
        }
        // 原型上的方法
        saySomething() {
            console.log('i am father')
        }
    }
    class User extends Person {
        constructor(name, age, tel) {
            super(name, age)
            this.tel = tel
        }
        sayAnother() {
            console.log('i am son')
        }
    }
}