import React , { Component } from 'react';
import { DetailWrapper, Header , Content } from './style'

class Detail extends Component{
    render(){
        return(
            <DetailWrapper>
                <Header></Header>
                <img alt=''/>
                <Content></Content>
            </DetailWrapper>
        )
    }
}

export default Detail