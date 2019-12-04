# -
一些遇到的问题原因和解决办法总结

👉Git篇

-----------------------------------------------------------------------------------------------------------------------
✍1.记Git报错-refusing to merge unrelated histories

  原因：本地仓库和远程仓库实际上是独立的两个仓库。假如我之前是直接clone的方式在本地建立起远程github仓库的克隆本地仓库就不会有这问题了。
  
  解决：执行命令：git pull origin master –allow-unrelated-histories（合并两个独立启动仓库的历史）
  
  
✍2. ! [rejected]        master -> master (fetch first)
   error: failed to push some refs to 'https://github.com/lsj123789/JS.git'
   hint: Updates were rejected because the remote contains work that you do
   hint: not have locally. This is usually caused by another repository pushing
   hint: to the same ref. You may want to first integrate the remote changes
   
   原因：本地没有update到最新版本的项目（git上有README.md文件没下载下来）本地直接push所以会出错。
   
   解决：git pull origin 分支名
   
✍3.git remote -v 查看远程仓库地址
   
---------------------------------------------------------------------------------------------------------------------
 👉ES6篇
   
   
   ✍1.对象
   
   (1)object.is() 比较两个值是否相等，两者数据类型相同值也相同时返回true 多数情况下 运算结果和===相同  例外：他认为+0和-0不相等 认NaN等于NaN
   
   (2)object.assgin(target,source1,source2) 合并对象，第一个参数时目标对象，后面的参数都是源对象，将源对象的所有可枚举属性复制到目标对象，同名属性时，后面的属性覆盖前面的属性值，该方法实际上属于浅拷贝，也就是说，如果源对象的某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
   
   (3)object.keys()：遍历对象 返回对象key值
   
     let arr = [1,2,3]
   
     console.log(Object.keys(arr))//输出['0','1','2']
   
     let obj = {a:1,b:2,c:3}
   
     console.log(Object.keys(obj))//输出['a','b','c']
   
   (4)object.values()：返回一个数组，成员时参数对象自身（不含继承）的所有可遍历的属性的键值,key为数值的属性，按照数值大小，从小到大遍历，例如：
   
     const obj = {100:'a',2:'b',5:'c'}
   
     console.log(Object.values(obj))//["b","","a"]
   
   如果参数是字符串，会返回组成字符串的各个字母组成的数组
   
   (5)object.entries()返回一个数组，成员是参数对象自身（不含继承的）所有可遍历属性的键值对数组，除了返回值不一样，该方法行为和object.value()基本一致
   
   自己实现object.entries():
   
   generator函数版本：
   
    function*entries(obj){
   
    for(let key of Object.keys(obj)){
    
      yield[key,obj[key]]
      
    }
    
   }
   
   普通函数版本：
   
    function entries(obj){
   
    for(let key of Object.keys(obj)){
    
      arr.push([key,obj[key]])
      
    }
    
     return arr
     
   }
   
--------------------------------------------------------------------------------------------------------------------------------------
   
👉数组篇
 
  （1）array.of():返回由所有参数值组成的数组，如果没有参数值，就返回空数组。解决构造器因参数个数不同，导致的行为有差异的问题
  
      let a = Array.of(3,1,2)//[3,1,2]
      
      let a = Array.of(3)//[3]
      
  （2）array.from():将两类对象转为真正的数组（不改变原对象，返回新数组）
  
   类数组对象：最基本要求就是具有length属性的对象，如果没有length属性，from转化完之后是空数组。
  
     参数：
     
     第一个参数（必需）：要转化为真正数组的对象
     
     第二个参数（可选）：类似数组map方法，对每个元素进行处理，将处理后的值放入返回的数组
     
     第三个参数（可选）：用来绑定this
     
     let obj = {0:'a',1:'b',2:'c',length:3}//对象拥有length属性
     
     let arr = Array.from(obj)//['a','b','c']
   
  ✍改变原数组的九个方法：
  
  ES5:pop(),shift(),push(),unshift(),reverse(),splice().sort()
  
  ES6:copyWithin(),fill()
  
   (1)pop()：删除数组中最后一个元素，并返回该元素
   
  （2）shift()：删除数组中第一个元素，并返回这个元素
  
  （3）push()：向数组末尾添加元素，并返回新的长度
  
  （4）unshift():向数组开头添加一个或多个元素，并返回新的长度
  
  （5）reverse():颠倒数组中元素的顺序
  
  （6）splice(）：添加/删除数组中的元素，返回被删除的项目
  
   index(必须)：整数，规定添加/删除项目的位置，使用负数可以从数组结尾处规定位置
   
   howmany(必须)：要删除项目的数量，如果为0，则不会删除项目
   
   item1,...itemn(可选)：向数组添加新的项目
  
      删除元素：
      
      let a = [1,2,3,4,5,6,7]
      
      let item = a.splice(0,3)//[1,2,3]
      
      console.log(a)//[4,5,6,7]
      
      let item = a.splice(-1,3)//[7] 因为从最后一个元素开始删除三个元素，因为是最后一个元素，所以只删除7
      
      删除并添加：
      
      let a = [1,2,3,4,5,6,7]
      
      let item = a.splice(0,3,'添加')//[1,2,3]
      
      console.log(a)//['添加',4,5,6,7]
      
      不删除只添加：
      
      let a = [1,2,3]
      
      let item = a.splice(0,0,'添加1','添加2')//没有删除元素 返回空数组[]
      
      console.log(a)//['添加1，添加2，1，2，3']      
      
  （7）sort():数组排序，并返回这个数组。参数是规定排序顺序的比较函数，如果没有传比较函数的话，默认按字母升序，如果不是字符串不是元素，会调用                    toString()将元素转化为字符串，然后再比较字符串
   
   sort的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：

   若比较函数返回值<0，那么a将排到b的前面;
   
   若比较函数返回值=0，那么a 和 b 相对位置不变；
   
   若比较函数返回值>0，那么b 排在a 将的前面；
   
   数组元素为数字的升序降序：
   
      var arr = [1,5,2,3,4,6]
      
      arr.sort(function(a,b){
        
        return a - b//升序
        
        return b - a //降序
        
      })
      
   数组多条件排序：
   
       var array = [{id:10,age:2},{id:5,age:4},{id:6,age:10},{id:9,age:6},{id:2,age:8},{id:10,age:9}];
        
       array.sort(function(a,b){
       
         if(a.id === b.id){
         
         return b.age - a.age //如果id值相等，按照age值降序排序
         
         }else{
         
         return a.id - b.id //如果id值不相等，按照id值升序排序
         
         }
         
         // [{"id":2,"age":8},{"id":5,"age":4},{"id":6,"age":10},{"id":9,"age":6},{"id":10,"age":9},{"id":10,"age":2}]
       
       })
       
 （8）copyWithin():在当前数组内部，将指定位置的成员复制到其他位置，并返回这个数组
  
      array.copyWithin(target, start = 0, end = this.length)
      
   参数:

   三个参数都是数值，如果不是，会自动转为数值.

   target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
   
   start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
   
   end（可选）：到该位置前停止读取数据，默认等于数组长度。使用负数可从数组结尾处规定位置。
   
      [1,2,3,4,5].copyWithin(0,-2,-1)//[4,2,3,4,5]
      
 （9）fill():使用一个定值，填充一个数组
 
   参数:

   第一个元素(必须): 要填充数组的值

   第二个元素(可选): 填充的开始位置,默认值为0

   第三个元素(可选)：填充的结束位置，默认是为this.length
   
      ['a','b','c'].fill(7) //[7,7,7]
      
      ['a','b','c'].fill(7,1,2) //['a',7,'c']
      
  不改变原数组的八个方法：ES5:join(),toLocateString(),toString(),slice(),cancat(),indexOf(),lastIndexOf() ES7:includes()
  
  (1)join():把数组中所有元素通过指定的分隔符进行分隔放入一个字符串，返回生成的字符串
  
       let a = ['hello','world']
       
       a.join(+)//'hello+world'
       
    let a= [['OBKoro1','23'],'test'];
    
    let str1=a.join(); // OBKoro1,23,test
    
    let b= [{name:'OBKoro1',age:'23'},'test'];
    
    let str2 = b.join(); // [object Object],test// 对象转字符串推荐JSON.stringify(obj);
    
   所以，join()/toString()方法在数组元素是数组的时候，会将里面的数组也调用join()/toString(),如果是对象的话，对象会被转为[object Object]字符串。
    
  （2）toLocateString():返回一个表示数组元素的字符串。该字符串由数组中的每个元素的toLocateString()返回值经调用join、()方法1连接（）由逗号隔开 
      
   组成
      
      let a=[{name:'OBKoro1'},23,'abcd'];
      
      let str=a.toLocaleString(); // [object Object],23,abcd
      
  （3）slice():浅拷贝数组的元素：方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且原数组不会被修改
  
       let a = ["hello","world"]
       
       let b = a.slice(0,1)//["hello"]
       
   （4）concat():合并两个或多个数组，并返回一个新数组
   
   （5）indexOf():查找数组是否存在某个元素返回下标，如果不存在则返回-1
   
   参数:

   searchElement(必须):被查找的元素

   fromIndex(可选):开始查找的位置(不能大于等于数组的长度，返回-1)，接受负值，默认值为0。

   严格相等的搜索:

   数组的indexOf搜索跟字符串的indexOf不一样,数组的indexOf使用严格相等===搜索元素，即数组元素要完全匹配才能搜索成功。

   注意：indexOf()不能识别NaN
   
   （6）lastIndexOf():查找指定元素在数组中的最后一个位置，返回索引，如果不存在，则返回-1
   
   （7）includes():查找数组是否包含某个元素，返回布尔值
   
   参数：

   searchElement(必须):被查找的元素

   fromIndex(可选):默认值为0，参数表示搜索的起始位置，接受负值。正值超过数组长度，数组不会被搜索，返回false。负值绝对值超过长数组度，重置从0开始搜索。

   includes方法是为了弥补indexOf方法的缺陷而出现的:

   indexOf方法不能识别NaN
   
   indexOf方法检查是否包含某个值不够语义化，需要判断是否不等于-1，表达不够直观
   
     let a=['OB','Koro1',1,NaN];
   
     let b=a.includes(NaN); // true 识别NaN
   
     let b=a.includes('Koro1',100); // false 超过数组长度 不搜索
   
     let b=a.includes('Koro1',-3); // true 从倒数第三个元素开始搜索 
   
     let b=a.includes('Koro1',-100); // true 负值绝对值超过数组长度，搜索整个数组
     
  ✍数组遍历
  
  遍历方法(12个):

  ES5：forEach、every 、some、 fliter、map、reduce、reduceRight、
  
  ES6：find、findIndex、keys、values、entries
  
  （1）forEach():按升序为数组中含有效值的每一项执行一次回调函数，无法中途退出循环，只能return退出本次回调，然后进行下一次回调
  
   参数：function（必须）数组中每个元素需要调用的函数
   
    回调函数的参数：cuurentValue（必须）数组当前元素的值；index（可选）当前元素索引值；arr（可选）数组对象本身
   
   hisValue(可选)：当执行函数时this绑定对象的值，默认值为undefined
     
    let a = [1, 2, ,3]; // 最后第二个元素是空的，不会遍历(undefined、null会遍历)
    
    let obj = { name: 'OBKoro1' };
    
    let result = a.forEach(function (value, index, array) { 
    
    a[3] = '改变元素';
    
    a.push('添加到尾端，不会被遍历')
    
    console.log(value, 'forEach传递的第一个参数'); // 分别打印 1 ,2 ,改变元素
    
    console.log(this.name); // OBKoro1 打印三次 this绑定在obj对象上
    
    break; // break会报错
    
    return value; // return只能结束本次回调 会执行下次回调
    
    console.log('不会执行，因为return 会执行下一次循环回调')
    
    }, obj);
    
    console.log(result); // 即使return了一个值,也还是返回undefine
    
  （2）filter():过滤原始数组，返回新数组，包含所有通过所提供函数实现的测试的所有元素
  
     let a = [12,3,56,78]
     
     let result = a.filter(funcion(value,index,array){
     
     return value >= 18;
     
     })
     
     console.log(result,a)//[56,78] [12,3,56,78]
     
  (3) map():对数组中每个元素进行处理，返回新数组，也就是说创建一个新数组，他的结果是该数组中每个元素都调用一个提供的函数后返回的结果
  
 （4）reduce():为数组提供累加器，合并为一个值
 
      数组求和：
      
      let sum = [0,1,2,3].reduce(function(a,b){
      
      return a+b//6
      
      },0)
      
      将二维数组转化为一堆 将数组元素展开
      
      let x = [[0,1],[2,3]].reduce((a,b) => a.concat(b),[])//[00,1,2,3]
  
   -------------------------------------------------------------------------------------------------------------------------------------

 👉DOM方法
   
  ✍ 1.querySelectorAll()返回文档中匹配指定css选择器的所有元素
   
   （1）获取文档中所有的 <p> 元素， 并为匹配的第一个 <p> 元素 (索引为 0) 设置背景颜色:
  
        var x = document.querySelecttoAll('p')
        
        x[0].style.backgroundColor = "red"
        
   （2）获取文档中所有 class="example" 的 <p> 元素， 并为匹配的第一个 <p> 元素 (索引为 0) 设置背景颜色:
  
       var x = document.querySelecttoAll("p.example")
       
       x[0].style.backgroundColor = "red"
       
   （3）计算文档中 class="example" 的 <p> 元素的数量（使用 NodeList 对象的 length 属性）:

         var x = document.querySelecttoAll(".example").length
         
   （4）查找文档中共包含 "target" 属性的 <a> 标签，并为其设置边框:
  
         var x = document.querySelecttoAll("a[target]")
         
         for(var i = 0; i < x.length ; i ++){
         
           x[i].style.border = "1px soild red"
           
         }
         
   （5）查找每个父元素为 div 的 p元素，并为其设置背景颜色：
  
          var x = document.querySelecttoAll("div > p")
          
          for(var i = 0; i < x.length ; i++){
          
          x[i].style.backgroudColor = "red"
          
          }
          
   
  ✍ 2.setAttribute()：添加指定的属性，并为其赋指定的值
  
        设置input元素的type属性：
        
         document.getElementsByTagName("input")[0].setAttribute("type","button")
   
          
