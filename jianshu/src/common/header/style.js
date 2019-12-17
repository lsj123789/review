import styled from 'styled-components';
import logoPic from '../../statics/logo.png'

export const WrapperHeader = styled.div `
 position:relative;
 height:56px;
 border-bottom:1px solid #f0f0f0;
`

export const Logo = styled.a.attrs({ // attrs就是一种添加属性的方法，也可以接收组件传来的props
    href: '/'
})
`
 position:absolute;
 top:0;
 left:0;
 height:56px;
 display:block;
 width:100px;
 background:url(${logoPic});
 background-size:contain;
`

export const Nav = styled.div `
    height:100%;
    width:960px;
    padding-right:70px;
    box-sizing:border-box;
    margin:0 auto;
`

export const NavItem = styled.div `
&.left{
    float:left;
}
&.right{
    float:right;
    color:#969696;
}
&.active{
    color:#ea6f5a;
}
   line-height:56px;
   padding:0 15px;
   font-size:17px;
   color:#333;
`

export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})
`
    width:160px;
    height: 38px;
    border:none;
    outline:none;
    border-radius:19px;
    margin-top:9px;
    margin-left:20px;
    padding:0 20px;
    box-sizing:border-box;
    background:#eee;
    font-size:14px;
    &::placeholder{
        color:#999;
    }
`
export const Addition = styled.div `
    position:absolute;
    right:0;
    top:0;
    height:56px;
`
export const Button = styled.div `
    float:right;
    line-height:38px;
    border-radius:19px;
    margin-top:9px;
    border:1px solid #ec6149;
    margin-right:20px;
    padding:0 20px;
    font-size:14px;
    &.reg{
        color:#ec6149;
    }
    &.writing{
        color:#fff;
        background:#ec6149
    }
`