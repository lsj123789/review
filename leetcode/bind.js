// ie8以及更早的ie浏览器不支持bind方法

// es6剩余参数实现：

if(!('bind' in Function.prototype)){

   Function.prototype.bind = function(obj,...args){

   return function(...sals){ // 形成闭包，保护obj对象，使bind方法永久绑定一个obj不能篡改

       this.apply(obj,args.concat(sals))// this指将来调用bind方法的原函数对象，arguments是未知的参数，所以用apply，不能用call

   }

 }

}

// es5方法实现：

if(!('bind' in Function.prototype)){

   Function.prototype.bind = function(obj){

   let args = Array.prototype.slice.call(arguments,1);

    let sals = Array.prototype.slice.call(arguments)// arguments 是类数组对象，无法直接调用数组API slice

   return function(){ // 形成闭包，保护obj对象，使bind方法永久绑定一个obj不能篡改

       this.apply(obj,args.concat(sals))// this指将来调用bind方法的原函数对象，arguments是未知的参数，所以用apply，不能用call

   }

 }

}