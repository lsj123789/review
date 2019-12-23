import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actionCreators } from './store'
import { LoginWrapper , LoginBox , Input , Button } from './style'

class Login extends Component{
    render(){
        const { handleLogin ,isLogin } = this.props;
        return (
            !isLogin ?
            (<LoginWrapper>
                <LoginBox>
                    <Input placeholder='请输入账号' ref={(input) => {this.account = input}}/>
                    <Input placeholder='请输入密码' type='password' ref={(input) => {this.password = input}}/>
                    <Button onClick={() => handleLogin(this.account,this.password,isLogin)}>登录</Button>
                </LoginBox>
            </LoginWrapper>):
            <Redirect to='/' />
        )
    }
}

const mapStateToProps = state => ({
    isLogin:state.getIn(['login','isLogin'])
})

const mapDispatchToProps = dispatch => ({
    handleLogin(accountElem,passwordElem,isLogin){
       dispatch(actionCreators.changeLogin(accountElem,passwordElem,!isLogin))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)