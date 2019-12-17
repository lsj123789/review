import React ,{ Component } from 'react';
import { WrapperHeader ,Logo, Nav , NavItem, NavSearch , Addition , Button} from './style'

class Header extends Component {
    render(){
        return(
        <WrapperHeader>
            <Logo />
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载APP</NavItem>
                <NavItem className='right'>Aa</NavItem>
                <NavItem className='right'>登录</NavItem>
                <NavSearch />
                <Addition>
                    <Button className='reg'>注册</Button>
                    <Button className='writing'>写文章</Button>
                </Addition>
            </Nav>
        </WrapperHeader>
        )
    }
}

export default Header;