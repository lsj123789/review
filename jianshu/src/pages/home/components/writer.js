import React , { Component } from 'react';
import{ connect } from 'react-redux';
import { WriterWrapper ,WriterHeader , WriterSwitch, WriterItem } from '../style'

class Writer extends Component{
    render(){
        const { writerList } = this.props;
        return(
            <WriterWrapper>
              <WriterHeader>
                  推荐作者
                  <WriterSwitch>
                   <i className='iconfont spin'>&#xe626;</i>
                   换一批
                   </WriterSwitch>
              </WriterHeader>
              {
                  writerList.map(item => {
                      return (
                         <WriterItem key={item.get('id')}>
                           <img alt='' src={item.get('imgUrl')} className='writerPic' />
                           <span className='writerName'>{item.get('name')}</span>
                           <span className='writerDesc'>{item.get('desc')}</span>
                         </WriterItem>
                      )
                  })
              }
            </WriterWrapper>
        )
    }
}

const mapStateToProps = state => ({
    writerList:state.getIn(['home','writerList'])
})

export default connect(mapStateToProps)(Writer);