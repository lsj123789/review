import React , { Component } from 'react';
import 'antd/dist/antd.css';
import store from './store';
import TodoListUI from './TodoListUI'
import { getInputChangeAction ,addTodoItemAction,deleteItemAction} from './store/actionCreators'

class TodoList extends Component {
    constructor(props){
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange)
    }

    handleInputChange = e => {
      const action = getInputChangeAction(e.target.value)
      store.dispatch(action)
    }

    handleStoreChange = () => {
        this.setState(store.getState())
    }

    handleBtnClick = () => {
        const action = addTodoItemAction()
        store.dispatch(action)
    }

    handleDeleteItem = index => {
        const action = deleteItemAction(index)
        store.dispatch(action)
    }

    render(){
        const { list , inputValue } = this.state;
        return(
            <TodoListUI 
              list={list} 
              inputValue ={inputValue}
              handleBtnClick={this.handleBtnClick}
              handleDeleteItem={this.handleDeleteItem}
              handleInputChange={this.handleInputChange}
            />
        )
    }
}

export default TodoList;