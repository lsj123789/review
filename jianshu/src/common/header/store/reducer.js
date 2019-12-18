import {
    SEARCH_FOCUS,
    SEARCH_BLUR
} from './constants';
import {
    fromJS
} from 'immutable';//把普通js对象变成一个immutable对象

const defaultState = fromJS({
    focused: false,
});

export default (state = defaultState, action) => {
    if (action.type === SEARCH_FOCUS) {
        //immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个新对象
        return state.set('focused', true)
    }
    if (action.type === SEARCH_BLUR) {
        return state.set('focused', false)
    }
    return state
}