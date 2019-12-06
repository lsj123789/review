// 方法一：默认字符串都是英文，长度为count，再去遍历字符串，遇到中文，在count的基础上加一

function byteLength(str){

   let count = str.length;

   for(let i = 0 ; i < count ; i++){

   if(str.charCodeAt(i) > 255){

     count ++

    }

  }

 return count

}

// 方法二：遍历字符串，返回的编码大于255 count加2，小于255 count加1

function byteLength(str){

   let count = 0;

   for(let i = 0 ; i< str.length ; i++){

     if(str.charCodeAt(i) > 255){

     count += 2;

     }else{

   count ++

     }

   }

return count

}