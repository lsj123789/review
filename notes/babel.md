###### AST可视化工具：https://astexplorer.net/
###### AST标准：https://github.com/estree/estree
#### babel
##### 一、babel 介绍
* 是什么：源码到源码的转译器
* 作用：
    * 编译器
    * 静态分析：分析代码 提取信息 用于生成文档
    * lint
    * type check

##### 二、编译流程
* 编译器和转义器：编译是从一种编程语言到另一种编程语言，主要是高级到低级（高级语言：用于描述逻辑的语言特性，eg：分支、循环、面向对象，接近人的思维，让开发者快速通过他们表达各种逻辑；低级语言：与硬件和执行细节有关，会操作寄存器、内存，具体做内存与寄存器之间的复制，eg：汇编语言、机器语言
* 像babel 高级语言到高级语言的转换工具，成为转换编译器 简称转译器（transpiler）
* 编译流程
    * parse：通过parser把源码转成抽象语法树（AST），之所以叫抽象语法树，是因为数据结构中省略了一些无具体意义的分隔符，eg：{}, ;
    * transform：遍历AST,调用各种transform对AST进行增删改
    * generate：把转换后的AST打印成目标代码，并生成sourcemap
* 为什么编译流程分为这三步？   
    为了让计算机理解代码 需要先对源码进行parse，生成AST，把对代码的修改改为对AST的修改 转换完AST之后再打印成目标代码字符串
* parse：目的是把源码字符串转换成机器能够理解的AST，这个过程分为词法分析和语法分析
    * 词法分析：eg: ```let name = 'zhangsan'```,把他分为不能再分的单词（token），let、 name、 = 、zhangsan，这个构成就是词法分析，按照单词的构成规则拆分为单词
    * 语法分析：将token进行递归组装，生成AST
* transform：处理parse阶段生成的AST，遍历AST，遇到不同的AST节点，调用注册的visitor函数，visitor函数对AST进行增删改，返回新的AST（可指定是否继续生成新的AST），这样遍历完一遍AST后就完成了对AST的修改
* generate：把AST打印成目标代码字符串并生成sourcemap，sourcemap记录源码到目标代码转化关系

##### 三、babel的AST
* AST是对源码的抽象，字面量、标识符、语句、表达式、模块、class语法各有各的AST
* Literal：字面量
    * 'zhangsan' -> StringLiteral
    * `zhangsan` -> TemplateLiteral
    * 123 -> NumberLiteral
    * /[a-z]+/ -> RegexpLiteral
    * true -> BooleanLiteral
    * 1.232434n -> BigintLiteral
    * null -> NullLiteral
identifier: 标识符，变量名、属性名、参数名等各种声明和引用的名字 注释中的内容为identifier
```javascript
    const name = 'zhangsan';// name
    
    function say(name) {
        console.log(name);
    } // say  console log
    
    const obj = {
        name: 'zhangsan'
    }// obj name
```
* statement：语句 可独立执行的单位 eg：break、continue、if、for、声明语句、表达式语句
    * braek -> BreakStatement
    * continue -> ContinueStatement
    * return -> ReturnStatement
* declaration：声明语句 一种特殊的语句，他执行的逻辑是在作用域内声明一个变量、函数、class、import...
    * const a = 1 -> VariableDeclaration
    * function b() {} -> FunctionDeclaration
    * export default c = 1 -> ExportDefaultDeclaration
    * export {d} -> ExportNameDeclaration
    * export * from 'x' -> ExportAllDeclaration
* expression: 表达式 和statement的区别是expression执行完以后有返回值
    * [1, 2, 3] -> ArrayExperssion
    * a = 1 -> AssignmentExperssion 赋值表达式
    * 1 + 2 -> BinaryExperssion 二元表达式
    * -1 -> UnaryExperssion 一元表达式
    * this -> ThisExperssion
    * a::b -> BindExperssion 绑定表达式
class语法举例：class内容是ClassBody, 属性是 ClassProperty, 方法是ClassMethod(通过kind属性区分constructor和method)
```javascript
class Zhangsan extends Persion {
    name: 'zhangsan',
    constructor() {}
    sayName() {}
}
```

```
graph TD
A[ClassDeclaration] --> ClassBody
ClassBody --> ClassProperity
ClassBody --> ClassMethod-kind:constructor
ClassBody --> ClassMethod-kind:method
```
* program和directive: program代表整个程序的节点，他有body属性代表程序体，directive属性存放指令
```javascript
"use strict"
console.log(1)
console.log(2)
```
```
graph TD
A[Program] -->|body|CallExpression-console1
A[Program] -->|body|CallExpression-console2
A[Program] -->|directives|Directive-usestrict
```
* file 和 comment：babel的AST最外层节点是file，他有program、comments、tokens等属性，分别存放program程序体、注释、token等   
    comment分为行内和块级注释   
    * /* zhangsan */ -->  CommentBlock
    * // zhangsan  -->  CommentLine

##### 四、babel的api