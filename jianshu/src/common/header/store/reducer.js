import {
    SEARCH_FOCUS,
    SEARCH_BLUR,
    CHANGE_HOT_SEARCH_LIST,
    MOUSE_ENTER,
    MOUSE_LEAVE,
    CHANGE_PAGE,
} from './constants';
import {
    fromJS
} from 'immutable'; //把普通js对象变成一个immutable对象

const defaultState = fromJS({
    focused: false, //是否聚焦搜索框
    mouseIn:false,// 鼠标是否移入热门搜索区
    hotSearchList: [], //热门搜索列表
    page: 1, // 热门搜索当前页
    totalPage: 1, //热门搜索总页数
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_FOCUS:
            return state.set('focused', true)
        case SEARCH_BLUR:
            return state.set('focused', false)
        case CHANGE_HOT_SEARCH_LIST:
            return state.merge({
                hotSearchList:action.data,
                totalPage:action.totalPage,
            })
        case MOUSE_ENTER :
            return state.set('mouseIn' , true)
        case MOUSE_LEAVE :
            return state.set('mouseIn' , false)
        case CHANGE_PAGE :
            return state.set('page',action.page)
        default:
            return state
    }
}