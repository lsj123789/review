import{ CHANGE_WRITER_PAGE,GET_HOME_DATA } from './constants';

const changeWriterPage = page => ({
    type:CHANGE_WRITER_PAGE,
    page
})

const getHomeData = data => ({
    type:GET_HOME_DATA,
    topicItem:data.topicItem,
    articleList:data.articleList,
    recommendList:data.recommendList,
    writerList:data.writerList
})

export { changeWriterPage , getHomeData }