import React from 'react';
import { connect } from 'react-redux';
import { WrapperHeader ,Logo, Nav , NavItem, NavSearch , Addition , Button , SearchWrapper} from './style'
import  { actionCreators } from './store'

const Header = props => {
   const { focused,handleInputFocus,handleInputBlur } = props;
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
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
              />
              <i className={focused ? 'focused iconfont' : 'iconfont'}>&#xe601;</i>
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

const mapStateToProps = state =>{
    return{
        focused:state.header.focused
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputFocus(){
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);