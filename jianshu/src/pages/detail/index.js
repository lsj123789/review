import React , { Component } from 'react';
import { connect } from 'react-redux'
import { DetailWrapper, Header , Content } from './style'
import { actionCreators } from './store'

class Detail extends Component{
    render(){
        const { title , desc , imgUrl } = this.props;
        return(
            <DetailWrapper>
                <Header>{title}</Header>
                <Content>
                   <img alt='' src={imgUrl}/>
                   <p>{desc}</p>
                </Content>
            </DetailWrapper>
        )
    }

    componentDidMount(){
        const { getDetailData } = this.props;
        const id = window.location.pathname.match(/[0-9]/)[0]
        getDetailData(id)
    }
}

const mapStateToProps = state => ({
    title:state.getIn(['detail','title']),
    desc:state.getIn(['detail','desc']),
    imgUrl:state.getIn(['detail','imgUrl'])
})

const mapDispatchToProps = dispatch => ({
    getDetailData(id){
        dispatch(actionCreators.getDetailData(id))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Detail)