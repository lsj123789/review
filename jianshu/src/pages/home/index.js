import React , { Component } from 'react';
import Topic from './components/topic';
import List from './components/list';
import Writer from './components/writer';
import Recommend from './components/recommend'
import { HomeWrapper , HomeLeft , HomeRight } from './style';

class Home extends Component{
    render(){
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img className='banner-img' alt='' src='https://upload.jianshu.io/admin_banners/web_images/4824/066b16f3ca11cfb4f2a47b0ecc53010e0e5e5e95.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'/>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
            </HomeWrapper>
        )
    }
}

export default Home;