import React , { Component } from 'react';
import { connect } from 'react-redux';
import { WrapperHeader,HotSearch,HotSearchList, HotSearchItem, HotSearchSwitch ,HotSearchTitle ,Logo, Nav , NavItem, NavSearch , Addition , Button , SearchWrapper} from './style'
import  { actionCreators } from './store'

class Header extends Component{

 getHotSearchArea = () => {
     const { hotSearchList ,focused} = this.props;
        if(focused){
            return(
                <HotSearch>
                      <HotSearchTitle>
                          热门搜索
                          <HotSearchSwitch>换一批</HotSearchSwitch>
                      </HotSearchTitle>
                      <HotSearchList> 
                          {
                              hotSearchList.map(item => {
                              return <HotSearchItem key={item}>{item}</HotSearchItem>
                              })
                          }
                      </HotSearchList>
                  </HotSearch>
            )
        }else{
            return null
        }
    }

    render(){
        const { handleInputFocus ,handleInputBlur , focused} = this.props;
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
                        className={focused ? 'focused' : null} 
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                      <i className={focused ? 'focused iconfont' : 'iconfont'}>&#xe601;</i>
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
        hotSearchList:state.getIn(['header','hotSearchList'])
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);