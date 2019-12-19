import {
    fromJS
} from 'immutable';

const defaultState = fromJS({
    topicItem: [{
            id: 1,
            title: '社会热点',
            imgUrl: 'https://upload-images.jianshu.io/upload_images/17794320-faea132de3d4305f.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
        },
        {
            id: 2,
            title: '手绘',
            imgUrl: '//cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
        }
    ],
    articleList: [
        {
        id: 1,
        title: 'Android圆角ViewGrup/View库，治好设计的圆角病！',
        desc: 'LinearLayout、RelativeLayout、FrameLayout支持圆角ImageView、TextView、View支持圆角CircleImageView使用xml进行配置，使用简单',
        imgUrl: 'https://upload-images.jianshu.io/upload_images/2435754-f3470c314e927df6.png?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    },{
        id:2,
        title:'Intel Hades Cayon冥王峡谷黑苹果10.15.1正式版',
        desc:'核显+独显，硬解，预览，变频， 正常开关机，原生电源管理，声卡，麦克风双网卡，MINIDP，SD卡插，雷雳，USB，USB-C，蓝牙，WIFI',
        imgUrl:'https://upload-images.jianshu.io/upload_images/20117810-725c808ebf09c742.png?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    },{
        id:3,
        title:'仿百度地图的凹陷BottomNavigationView',
        desc:'anchor_fab： 用来指定凹陷下去的 View ，一般都为 FloatingActionButton shadow_length：用来指定高度（阴影大小cornerRadius：用来指定拐角处的平滑半径大小',
        imgUrl:'https://upload-images.jianshu.io/upload_images/17794320-faea132de3d4305f.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    },{
        id:4,
        title:'010-searx一个可定制的搜索引擎',
        desc:'本篇文章主要分享一个基于Blockstack的DApp-searx,一个可定制的搜索引擎。',
        imgUrl:'https://upload-images.jianshu.io/upload_images/3420049-0d6c540181157cf8.png?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    }
]
})

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}