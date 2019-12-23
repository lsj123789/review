import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class NewArticle extends Component{
    render(){
        const { isLogin } = this.props;
        return (
            isLogin ? 
            <div>NewArticle</div>:
            <Redirect to='/login'/>
        )
    }
}

const mapStateToProps = state => ({
    isLogin:state.getIn(['login','isLogin'])
})

export default connect(mapStateToProps)(NewArticle)