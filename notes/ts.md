##### 简介
* js的超集
* ts增加代码可读性、可维护性：体现在增加类型校验等，完善js弱语言特性
* ts非常包容：体现在假如定义一个数字变量，确给他赋值为字符串，虽然编译会报错，但查看编译结果会发现这个数字变量会被编译成字符串变量的。
* 社区

##### 数据类型
* 原始数据类型：string、number、booleacn、null、undefined、enum、symbol
```typescript
const str: string = 'hello';
const num: number = 123;
const bool: boolean = true;
const un: undefined = undefined;
const nul: null = null;
```
* 空值一般用void表示，void可以表示变量，也可表示函数返回值
```typescript
const callback = function(): void{
    console.log('I can't return anything');
};
```
* Any：允许赋值为任意类型，声明一个变量为任意值时，对他的任何操作，返回的内容类型都是任意值。变量如果在声明之前未被指定类型，那么她也会被自动识别为任意值类型
* 类型推论：
    * 给变量赋初始值时如果没有指定类型，那么会自动倒推出初始值类型
    ```typescript
        const a = 1;
        a = '1';// 报错 因为a倒推回去发现已经是number类型，不能再赋值其他类型
    ```
    * 如果定义变量时没有赋值，不管之后有没有赋值，赋值成什么类型，都会被倒推成any类型完全不被类型检查
##### 联合类型
* 表示取值可以是多种类型中的一种
```typescript
let muchType: string|number = 'hello';
muchType = 'world';
muchType = 10;
```
* 如果定义变量时没有赋值，不管之后有没有赋值，赋值成什么类型，都会被倒推成any类型完全不被类型检查
* 只能访问此联合类型内的所有类型里共有的属性或者方法
```typescript
let muchType: string|number = 'hello';
muchType = 'world';
muchType = 10;
// 只能使用number和string都支持的方法或属性 eg：toString()
console.log(muchType.length) // 报错 因为muchType现在是number
```
##### 对象类型-接口
* 描述类的一部分抽象行为，也可以描述对象的结构形状
* 接口一般首字母大写
* 赋值的时候，变量的形状必须和接口的形状保持一致
* 接口中可定义可选属性、只读属性、任意属性
```typescript
interface Istate {
    name: string,
    // ？表示age是可选属性，赋值时可写可不写
    age?: number,
    // 只读属性，一旦赋值 不可更改
    readonly sex: string,
    // 属性个数不确定 动态添加
    //这里必须是any类型，如果指定为number类型，那上面的name属性是string类型就会报错，如果指定为string类型，上面的age属性为number类型就会报错
    //除非这个接口里是同一种类型
    [propName: string]: any
}
let obj: Istate;
obj = {
    name: 'zhangsan',
    age: 18, // 可有可无
    isMarried: false,
    sex: 'male'
}
obj.sex = 'female' // 报错，只读属性不可更改
```
##### 数组类型
* [类型 + 方括号]表示法
```typescript
const arrOne: number [] = [1, 2, 3];
const arrTwo: string [] = ['zhangsan', 'lisi', 'wangwu'];
const arrThree: any [] = [1, '2', true];
```
* 数组泛型Array<elemType>表示法
```typescript
const arrOne: Array<number> = [1, 2, 3];
const arrTwo: Array<string> = ['zhangsan', 'lisi', 'wangwu'];
const arrThree: Array<any> = [1, '2', true];
```
* 接口表示法
```typescript
interface Istate {
    userName: string,
    age: number
}
interface Iarr {
    [index: number]: Istate
}
const arr: Iarr = [
    {
        userName: 'zhangsan',
        age: 18
    },
    {
        userName: 'lisi',
        age: 17
    }
];
```
##### 函数类型
* 对函数本身参数约束。对返回值约束
```typescript
// 声明式函数
// 函数参数不确定
function funcType2(name: string, age: number, sex?: string): numebr {
    console.log('i am', name, 'and i am', age, 'years old');
    return age
}
const age:number = funcType2('zhangsan', 18, 'male');

// 函数参数默认值
function funcType3(name: string = 'zhangsan', age: number = 18): number {
    console.log('i am', name);
    return age;
}
const age: number = funcType3();
```
* 函数本身赋值的变量的约束
```typescript
// 声明式函数
const funcType = function(name: string): string {
    return name;
}
// 对funcType2做约束 接收 name:string 返回string 需要用箭头函数
const funcType2: (name: string) => string = function(name: string): string {
    return name;
}
// 用接口规范  等同上面的箭头函数形式
interface funcType3 {
    (name: string): string
}
const funcType3:funcType3 = function(name: string): string{
    return name;
}
```
* 可采用重载的方式才支持联合类型的函数关系
```typescript
function getValue(value: number): number;
function getValue(vale: string): string;
function getValue(value: string|number): string|number {
    return value;
}
const num: number = getValue(1);
const str: string = getValue('hello world');
```
* 结构赋值限制类型
```typescript
fucntion add(
    {name, age}: {name: string, age:  number}
): number {
    return age;
}
```

##### 类型断言
* 可以用来手动指定一个值的类型
* 语法： <类型>值 或者 as类型
```typescript
// <类型>值的写法
{
    const getAssert = (name: string|number) => {
        return (<string>name).length;
    }
}
// as类型 写法 react中必须采用这种写法 因为<>在jsx语法中被解析成标签
{
    const getAssert = (name: string|number) => {
        return (name as string).length;
    }
}
```
* 在tsx语法（react的jsx语法的ts版）必须采用后面一种
* 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不被允许的

##### 类型别名
* 基础类型
```typescript
type strType = string|number;
let str: strType = '10';
str = 10;
```
* 对接口也可采用类型别名
```typescript
interface muchType1 {
    name: string
}
interface muchType2 {
    age: number
}
type muchType = muchType1 | muchType2;
const obj1: muchType = {
    name: 'zhangsan',
    age: 10
}
const obj2: muchType = {name:'zhangsan'}
const obj3: muchType = {age: 10}
```
* 限制字符串的选择
```typescript
type sex = 'male'|'female';
const getSex = (sex: sex): string => {
    return sex;
}
getSex('female');
```

##### 枚举
* 枚举(Enmu)类型用于取值被限定在一定范围内的场景
* 采用关键字enum定义，eg：```enum Days{Sun, Mon, Tues, Wed, Thu,Fri, Sat}```
* 枚举成员默认会被赋值为从0开始递增的数字，除非自己指定从几开始
```typescript
enum Days {
    Sun = 3,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}
console.log(Days.Sat) // 9
console.log(Days.Mon) // 4
console.log(Days[3]) // "Sun"
```
* 同时也会被枚举值到枚举名进行反向映射，也就是key和value双向映射
```typescript
enum Days {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}
console.log(Days.Sat) // 6
console.log(Days.Mon) // 1
console.log(Days[1]) // "Mon"
```

##### 类修饰符
* public private和protected
* public修饰的属性或者方法是共有的，可以在任何地方被访问到，默认所有的属性或者方法都是public的
* private修饰的属性或方法是是私有的，不能在声明他的类的外面访问
* protected修饰的属性或方法是受保护的，和private类似
```typescript
// 创建父类
class Parent {
    name: 'zhangsan'
    protected age: 18;
    private isMarried: false
    sayParentName() {
        console.log('i am', this.name);
    }
}

// 实例化父类
const parentExample = new Parent();
parentExample.sayParentName();
// parentExample.isMarried 报错 因为是私有的

// 创建子类
class Child extends Parent {
    callParent() {
        // 调用父类方法
        super.sayParentName();
        super.age;
    };
    
}
// 实例化子类
const childExample = new Child();
childExample.callParent();
// console.log(childExample.age);  报错 被保护的属性只能在类及其之类中访问 实例对象不能直接访问
```

##### 泛型
* 在定义函数、接口或类的时候，不预先指定其具体类型，而在使用的时候动态添加类型的一种特性
```typescript
// 在函数中使用泛型
function createArray<T>(length: number, value: T):Array<T> {
    let arr = [];
    for(let i = 0; i < length; i++) {
        arr[i] = value;
    }
    return arr;
}

const strArr: string[] = createArray<string>(3, '1');
const numArr: number[] = createArray(3, 1);

// 接口中使用泛型
interface ICreate {
    <T>(name: string, value: T): Array<T>
}

let func: ICreate;
func = function<T>(name: string, value: T): Array<T> {
    return [];
}

const strArr2: string[] = func('zhangsan', 'lisi');
const numArr2: number[] = func('zhangsan', 2);
```
