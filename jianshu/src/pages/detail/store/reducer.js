import { fromJS } from 'immutable';
import { GET_DETAIL_DATA } from './constants'

const defaultState = fromJS({
    title:'',
    desc:'',
    imgUrl:'',
})

const getDetailData = (state,action) => {
    return state.merge({
        title:action.title,
        desc:action.desc,
        imgUrl:action.imgUrl
    })
}

export default (state = defaultState ,action) => {
    switch(action.type){
        case GET_DETAIL_DATA:
            return getDetailData(state,action.data)
        default:
        return state
    }
}