import {
    GET_DETAIL_DATA
} from './constants'
import axios from 'axios'

const detailDataAction = data => ({
    type: GET_DETAIL_DATA,
    data
})

const getDetailData = (id) => {
    return dispatch => {
        axios.get(`/api/detail.json?id=${id}`).then(res => {
            dispatch(detailDataAction(res.data.data))
        })
    }
}

export {
    getDetailData
}