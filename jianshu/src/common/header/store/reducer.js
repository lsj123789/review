import {
    SEARCH_FOCUS,
    SEARCH_BLUR,
    CHANGE_HOT_SEARCH_LIST
} from './constants';
import {
    fromJS
} from 'immutable'; //把普通js对象变成一个immutable对象

const defaultState = fromJS({
    focused: false,
    hotSearchList: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_FOCUS:
            return state.set('focused', true)
        case SEARCH_BLUR:
            return state.set('focused', false)
        case CHANGE_HOT_SEARCH_LIST:
            return state.set('hotSearchList', action.data)
        default:
            return state
    }
}