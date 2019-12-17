import { CHANGE_INPUT_VALUE ,ADD_TODO_ITEM,DELETE_ITEM } from './actionTypes'

export const getInputChangeAction = value => ({
    type:CHANGE_INPUT_VALUE,
    value
});

export const addTodoItemAction = () => ({
    type:ADD_TODO_ITEM
})

export const deleteItemAction = index => ({
    type:DELETE_ITEM,
    index
})
