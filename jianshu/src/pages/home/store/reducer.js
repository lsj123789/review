import {
    fromJS
} from 'immutable';
import { CHANGE_WRITER_PAGE ,GET_HOME_DATA , CHANGE_ARTICLE_INDEX} from './constants';

const defaultState = fromJS({
    topicItem: [],
    articleList: [],
    articleIndex:4,
    recommendList: [],
    writerList:[],
    writerPage:1,
    writerTotalPage:2,
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_WRITER_PAGE:
            return state.set('writerPage',action.page)
        case GET_HOME_DATA :
            return state.merge({
                topicItem:fromJS(action.topicItem),
                articleList:fromJS(action.articleList),
                recommendList:fromJS(action.recommendList),
                writerList:fromJS(action.writerList)
            })
        case CHANGE_ARTICLE_INDEX:
            return state.set('articleIndex',action.articleIndex)
        default:
            return state;
    }
}