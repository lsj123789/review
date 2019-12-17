import React ,{ Component } from 'react';
import { WrapperHeader ,Logo, Nav , NavItem, NavSearch , Addition , Button , SearchWrapper} from './style'

class Header extends Component {
    render(){
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
                <NavSearch />
                <i className='iconfont'>&#xe601;</i>
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

export default Header;