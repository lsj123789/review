import React , { Component } from 'react';
import { connect } from 'react-redux';
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
                          <HotSearchSwitch onClick={() => handleChangePage(page,totalPage)}>换一批</HotSearchSwitch>
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
        const { handleInputFocus ,handleInputBlur , focused , mouseIn} = this.props;
        return(
            <WrapperHeader>
                <Logo />
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载APP</NavItem>
                    <NavItem className='right'>
                        <i className='iconfont'>&#xe636;</i>
                    </NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <SearchWrapper>
                      <NavSearch 
                        className={focused || mouseIn? 'focused' : null} 
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                      <i className={focused || mouseIn ? 'focused iconfont' : 'iconfont'}>&#xe601;</i>
                      {this.getHotSearchArea()}
                    </SearchWrapper>
                    <Addition>
                        <Button className='reg'>注册</Button>
                        <Button className='writing'>
                        <i className='iconfont'>&#xe617;</i>
                            写文章
                        </Button>
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
        totalPage:state.getIn(['header','totalPage'])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputFocus(){
            dispatch(actionCreators.getHotSearchList())
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
        handleChangePage(page,totalPage){
            if(page < totalPage){
                dispatch(actionCreators.changePage(page + 1))
            }else{
                dispatch(actionCreators.changePage(1))
            }
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);