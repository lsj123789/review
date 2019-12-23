import React , { Component } from 'react';
import { connect } from 'react-redux';
import Topic from './components/topic';
import List from './components/list';
import Writer from './components/writer';
import Recommend from './components/recommend'
import { HomeWrapper , HomeLeft , HomeRight } from './style';
import { actionCreators }  from './store';
import { BackTop } from './style'

class Home extends Component{
    backTop = () => {
        window.scrollTo(0,0)
    }
    bindEvents = () => {
        const { changeShowBackTop } = this.props;
        window.addEventListener('scroll',changeShowBackTop)
    }
    render(){
        const { showBackTop } = this.props;
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
                {showBackTop ? <BackTop onClick = {this.backTop}>返回顶部</BackTop> : null}
            </HomeWrapper>
        )
    }

    componentDidMount() {
        const { getHomeData  } = this.props;
        getHomeData()
        this.bindEvents()
    }
    componentWillUnmount(){
        const { changeShowBackTop } = this.props;
        window.removeEventListener('scroll',changeShowBackTop)
    }
}

const mapStateToProps = state => ({
    showBackTop:state.getIn(['home','showBackTop'])
})

const mapDispatchToProps = dispatch => ({
       getHomeData(){
           dispatch(actionCreators.getHomeData())
       },
       changeShowBackTop(){
           if(document.documentElement.scrollTop > 200){
               dispatch(actionCreators.toggleShowBackTop(true))
           }else{
               dispatch(actionCreators.toggleShowBackTop(false))
           }
       }
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);