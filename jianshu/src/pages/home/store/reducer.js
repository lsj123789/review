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
    articleList: [{
        id: 1,
        title: 'Android圆角ViewGrup/View库，治好设计的圆角病！',
        desc: 'LinearLayout、RelativeLayout、FrameLayout支持圆角ImageView、TextView、View支持圆角CircleImageView使用xml进行配置，使用简单',
        imgUrl: 'https://upload-images.jianshu.io/upload_images/2435754-f3470c314e927df6.png?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    }, {
        id: 2,
        title: 'Intel Hades Cayon冥王峡谷黑苹果10.15.1正式版',
        desc: '核显+独显，硬解，预览，变频， 正常开关机，原生电源管理，声卡，麦克风双网卡，MINIDP，SD卡插，雷雳，USB，USB-C，蓝牙，WIFI',
        imgUrl: 'https://upload-images.jianshu.io/upload_images/20117810-725c808ebf09c742.png?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    }, {
        id: 3,
        title: '仿百度地图的凹陷BottomNavigationView',
        desc: 'anchor_fab： 用来指定凹陷下去的 View ，一般都为 FloatingActionButton shadow_length：用来指定高度（阴影大小cornerRadius：用来指定拐角处的平滑半径大小',
        imgUrl: 'https://upload-images.jianshu.io/upload_images/17794320-faea132de3d4305f.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    }, {
        id: 4,
        title: '010-searx一个可定制的搜索引擎',
        desc: '本篇文章主要分享一个基于Blockstack的DApp-searx,一个可定制的搜索引擎。',
        imgUrl: 'https://upload-images.jianshu.io/upload_images/3420049-0d6c540181157cf8.png?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240'
    }],
    recommendList: [{
        id: 1,
        imgUrl: 'http://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png'
    }, {
        id: 2,
        imgUrl: 'http://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
    }, {
        id: 3,
        imgUrl: 'http://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
    }, {
        id: 4,
        imgUrl: 'http://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
    }],
    writerList:[{
        id:1,
        name:'Hobbit霍比特人',
        desc:'写了242.6k字 · 1k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/7133325/f4370cf6-cf4d-4839-9b54-87beaa767d48?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:2,
        name:'晖宗聊绘画 ',
        desc:'写了167.7k字 · 2.5k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/4287007/b7b9c810-069e-4385-aec7-1823e94ee43d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:3,
        name:'格列柯南',
        desc:'写了756.9k字 · 43.8k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/3730494/4a86a2a7-d5b9-47f1-969a-d8ef4711488b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:4,
        name:'小托夫',
        desc:'写了296.8k字 · 1.5k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/2594450/a5bbf755-a88e-42da-9eb7-eb4c0e895683.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:5,
        name:'老沈1',
        desc:'写了135.7k字 · 705喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/7416466/fc1a1a0d-e3c7-4bca-9720-028c5c9914f3.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:6,
        name:'阿栈',
        desc:'写了486.2k字 · 1.5k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/2558050/7761b285-2805-4534-9870-ba7dcc7538ec.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:7,
        name:'名贵的考拉熊',
        desc:'写了253.8k字 · 18.8k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/7663825/7c28763e-002b-4e89-8dea-5b8da210ef2c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:8,
        name:'木清琳',
        decs:'写了292.6k字 · 29.4k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/2631077/dc99c361412c?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:9,
        name:'只有一半影子的人',
        decs:'写了271.2k字 · 1.4k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/6305091/dc5b863a-26fc-47df-af32-18177f6cc9ff.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    },{
        id:10,
        name:'灰土豆',
        decs:'写了341.3k字 · 1.9k喜欢',
        imgUrl:'https://upload.jianshu.io/users/upload_avatars/677687/c84b99723362.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'
    }]
})

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}