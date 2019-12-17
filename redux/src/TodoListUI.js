import React, { Component } from 'react';
import { Input ,Button ,List } from 'antd';

const TodoListUI = props => {
    const{ list , inputValue, handleInputChange ,handleBtnClick ,handleDeleteItem} = props;
    return(
        <div style={{margin:'10px'}}>
        <Input 
        value={inputValue} 
        placeholder='todo info' 
        onChange={handleInputChange} 
        style={{width:'300px',marginRight:'10px'}}
        />
        <Button type='primary' onClick={handleBtnClick}>提交</Button>
        <List
          style={{marginTop:'10px',width:'373px'}}
          bordered
          dataSource={list}
          renderItem = {
              (item,index) => (<List.Item style={{cursor:'pointer'}}
              onClick={() => handleDeleteItem(index)}>{item}</List.Item>)
          }
         />
     </div>
    )
}

export default TodoListUI;