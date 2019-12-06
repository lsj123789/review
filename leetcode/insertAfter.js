// 仿照insertBefore 自定义insertAfter方法

Element.prototype.insertAfter = function(targetNode,afterNode){

    let beforeNode = afterNode.nextElementSibling;
 
    if(beforeNode === null){
 
           this.appendChild(targetNode)
 
    }else{
 
           this.insertBefore(targetNode,beforeNode)
 
      }
 
 }