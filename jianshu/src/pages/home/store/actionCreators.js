import {
    CHANGE_WRITER_PAGE,
    GET_HOME_DATA,
    CHANGE_ARTICLE_INDEX
} from './constants';
import axios from 'axios';

const changeHomeData = data => ({
    type: GET_HOME_DATA,
    topicItem: data.topicItem,
    articleList: data.articleList,
    recommendList: data.recommendList,
    writerList: data.writerList
})

const changeWriterPage = page => ({
    type: CHANGE_WRITER_PAGE,
    page
})

const changeArticleIndex = articleIndex => ({
    type:CHANGE_ARTICLE_INDEX,
    articleIndex
})

const getHomeData = () => {
    return dispatch => {
        axios.get('/api/home.json').then(res => {
            dispatch(changeHomeData(res.data.data))
        })
    }
}

export {
    changeWriterPage,
    getHomeData,
    changeArticleIndex
}