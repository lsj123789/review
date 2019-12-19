import React , { Component } from 'react';
import{ connect } from 'react-redux';
import { WriterWrapper ,WriterHeader , WriterSwitch, WriterItem } from '../style'
import  * as actionCreators  from '../store/actionCreators';

class Writer extends Component{

    getWriterArea = () => {
        const { writerList,writerPage } = this.props;
        const jsWriterList = writerList.toJS()
        const newWriterList = [];
        if(jsWriterList.length){
            for( let i = (writerPage - 1)*5;i< writerPage*5;i++){
              newWriterList.push(
               <WriterItem key={jsWriterList[i].id}>
                 <img alt='' src={jsWriterList[i].imgUrl} className='writerPic' />
                 <span className='writerName'>{jsWriterList[i].name}</span>
                 <span className='writerDesc'>{jsWriterList[i].desc}</span>
               </WriterItem>)
            }
        }
        return newWriterList;
    }

    render(){
        const { changePage , writerTotalPage , writerPage } = this.props;
        return(
            <WriterWrapper>
              <WriterHeader>
                  推荐作者
                  <WriterSwitch onClick={() => changePage(writerPage,writerTotalPage)}>
                   <i className='iconfont spin'>&#xe626;</i>
                   换一批
                   </WriterSwitch>
              </WriterHeader>
              {this.getWriterArea()}
            </WriterWrapper>
        )
    }
}

const mapStateToProps = state => ({
    writerList:state.getIn(['home','writerList']),
    writerPage:state.getIn(['home','writerPage']),
    writerTotalPage:state.getIn(['home','writerTotalPage'])
})

const mapDispatchToProps = dispatch => ({
    changePage(page,totalPage){
        if(page < totalPage) {
            dispatch(actionCreators.changeWriterPage(page+ 1))
        }else{
            dispatch(actionCreators.changeWriterPage(1))
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Writer);