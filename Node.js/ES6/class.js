//ES6 类相关概念

//类的基本用法
//before
function Person(name, age) {
    this.name = name;
    this.age = age
}
Person.prototype.showName() = function () {
    console.log('name:' + this.name);
}
Person.prototype.showAge() = function () {
    console.log('age:' + this.age);
}
let p = new Person('zhangsan', '14')
p.showName()
p.showAge()
//运行结果
//name:zhangsan
//age:14

//after
class Person2 {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    showAge2() {
        console.log('age:' + this.age);
    }
    showName2() {
        console.log('name:' + this.name);
    }
}
let a = new Person2('lisi', '12')
a.showAge2()
a.showName2()
//执行结果
//age:12 name:lisi

//静态方法:静态方法必须通过类名Person来调用。不可以用实例化对象b来调用
class Person3 {
    static showInfo() {
        console.log('hello');
    }
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    showName3() {
        console.log('name:' + this.name);
    }
    showAge3() {
        console.log('age:' + this.age);
    }
}
let b = new Person3('wangwu', 13)
b.showName3()
b.showAge3()
Person.showInfo()
//运行结果
//name:wangwu  age:13 hello

//ES6继承  extends关键字实现继承  用super关键字调用父类构造函数
class Person4 {
    static showInfo2() {
        console.log('hello world');
    }
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    showName4() {
        console.log('name:' + this.name);
    }
    showAge4() {
        console.log('age:' + this.age);
    }
}
class Student extends Person {
    constructor(name, age, score) {
        super(name, age)//调用父类构造函数
        this.score = score
    }
    showScore() {
        console.log('score' + this.score);
    }
}
let stu = new Student('zhangsan', '14', '100')
stu.showName()
stu.showAge()
stu.showScore()
Student.showInfo2()
 //运行结果
 //name:zhangsan  age:14 score:100 hello world