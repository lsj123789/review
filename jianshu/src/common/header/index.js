import React ,{ Component } from 'react';
import { WrapperHeader ,Logo, Nav , NavItem, NavSearch , Addition , Button , SearchWrapper} from './style'

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            focused:false,
        }
    }
    handleInputBlur = () => {
        this.setState({
            focused:false,
        })
    }
    handleInputFocus = () => {
        this.setState({
            focused:true
        })
    }
    render(){
        const { focused } = this.state;
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
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
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
}

export default Header;