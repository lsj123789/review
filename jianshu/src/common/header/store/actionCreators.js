import {
    SEARCH_FOCUS,
    SEARCH_BLUR,
    CHANGE_HOT_SEARCH_LIST
} from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';

const changeHostSearchList = data => ({
    type: CHANGE_HOT_SEARCH_LIST,
    data:fromJS(data)
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

export {
    searchFocus,
    searchBlur,
    getHotSearchList
}