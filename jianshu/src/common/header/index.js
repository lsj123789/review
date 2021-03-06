import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router-dom';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { WrapperHeader,HotSearch,HotSearchList, HotSearchItem, HotSearchSwitch ,HotSearchTitle ,Logo, Nav , NavItem, NavSearch , Addition , Button , SearchWrapper} from './style'
import  { actionCreators } from './store'

class Header extends Component{

 getHotSearchArea = () => {
     const { hotSearchList ,focused ,mouseEnter ,mouseLeave ,mouseIn,page,totalPage ,handleChangePage} = this.props;
     const jsList = hotSearchList.toJS() //immutable对象不能使用[i]，转成js对象才能使用
     const pageList = [];
     if(jsList.length){
         //在执行for循环时，jsList还没有值，拿jsList[i]做key值 只会输出10次undefined
         //所以这里判断一下 在jsList有值时，再执行for循环
        for(let i = (page -1)*10;i< page * 10; i++){
            pageList.push(
              <HotSearchItem key={jsList[i]}>{jsList[i]}</HotSearchItem>
            )
        }
     }
        if(focused || mouseIn){
            return(
                <HotSearch onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                      <HotSearchTitle>
                          热门搜索
                          <HotSearchSwitch onClick={() => handleChangePage(page,totalPage,this.spinIcon)}>
                          <i ref={icon => this.spinIcon = icon} className='iconfont spin'>&#xe626;</i>
                              换一批
                          </HotSearchSwitch>
                      </HotSearchTitle>
                      <HotSearchList> 
                          {pageList}
                      </HotSearchList>
                  </HotSearch>
            )
        }else{
            return null
        }
    }

    render(){
        const { login , handleInputFocus ,handleInputBlur , focused , mouseIn , hotSearchList , changeLogin} = this.props;
        return(
            <WrapperHeader>
                <Link to='/'><Logo /></Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载APP</NavItem>
                    <NavItem className='right'>
                        <i className='iconfont'>&#xe636;</i>
                    </NavItem>
                    <NavItem className='right' onClick = {() => changeLogin(login)}>
                      {login ? <Link to='/'>退出</Link> : <Link to='/login'>登录</Link>} 
                    </NavItem>
                    <SearchWrapper>
                      <NavSearch 
                        className={focused || mouseIn? 'focused' : null} 
                        onFocus={() => handleInputFocus(hotSearchList)}
                        onBlur={handleInputBlur}
                      />
                      <i className={focused || mouseIn ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe601;</i>
                      {this.getHotSearchArea()}
                    </SearchWrapper>
                    <Addition>
                        <Button className='reg'>注册</Button>
                        <Link to='/newArticle'>
                            <Button className='writing'>
                            <i className='iconfont'>&#xe617;</i>
                                写文章
                            </Button>
                        </Link>
                    </Addition>
                </Nav>
            </WrapperHeader>
            )
    }
}


const mapStateToProps = state =>{
    return{
        focused:state.get('header').get('focused'),//等同于 state.getIn(['header','focused'])
        hotSearchList:state.getIn(['header','hotSearchList']),
        mouseIn:state.getIn(['header','mouseIn']),
        page:state.getIn(['header','page']),
        totalPage:state.getIn(['header','totalPage']),
        login:state.getIn(['login','isLogin'])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputFocus(hotSearchList){
            // 只有第一次搜索框聚焦时才应该发送请求 请求热门搜索数据
            // 这里应避免无意义请求，提升组件性能
            (hotSearchList.size === 0) && dispatch(actionCreators.getHotSearchList())
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur())
        },
        mouseLeave(){
            dispatch(actionCreators.mouseLeave())
        },
        mouseEnter(){
            dispatch(actionCreators.mouseEnter())
        },
        handleChangePage(page,totalPage,spin){
           let originAngle = spin.style.transform.replace(/[^0-9]/ig,'')//将不是0~9的数字都替换成空
           if(originAngle){
               originAngle = parseInt(originAngle,10)//z字符串转成十进制整数
           }else{
               originAngle = 0
           }
           spin.style.transform = `rotate(${originAngle + 360}deg)`
            if(page < totalPage){
                dispatch(actionCreators.changePage(page + 1))
            }else{
                dispatch(actionCreators.changePage(1))
            }
        },
        changeLogin(bool){
            dispatch(loginActionCreators.changeLogin(!bool))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);