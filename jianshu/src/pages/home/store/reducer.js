import {
    fromJS
} from 'immutable';

const defaultState = fromJS({
    topicItem: [{
            id: 1,
            title: '社会热点',
            imgUrl: '//cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
        },
        {
            id: 2,
            title: '手绘',
            imgUrl: '//cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
        }
    ]
})

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}