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
} from 'immutable';
import axios from 'axios';

const changeHostSearchList = data => ({
    type: CHANGE_HOT_SEARCH_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

const searchFocus = () => ({
    type: SEARCH_FOCUS
})

const searchBlur = () => ({
    type: SEARCH_BLUR
})

const getHotSearchList = () => {
    return dispatch => {
        axios.get('/api/headerList.json').then(res => {
            dispatch(changeHostSearchList(res.data.data))
        }).catch(() => {
            console.log('error')
        })
    }
}

const mouseEnter = () => ({
    type: MOUSE_ENTER
})

const mouseLeave = () => ({
    type: MOUSE_LEAVE
})

const changePage = (page) => ({
    type: CHANGE_PAGE,
    page,
})

export {
    searchFocus,
    searchBlur,
    getHotSearchList,
    changePage,
    mouseEnter,
    mouseLeave,
}