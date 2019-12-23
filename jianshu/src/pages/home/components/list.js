import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListItem , ListInfo ,LoadMore} from '../style'
import { actionCreators } from '../store'

class List extends Component{
    render(){
        const { articleList ,articleIndex , changeArticleIndex} = this.props;
        const jsArticleList = [...articleList.toJS()].splice(0,articleIndex)
        return(
            <>
            {jsArticleList.map(item => {
                return (
                   <Link key={item.id} to={`detail/${item.id}`}>
                    <ListItem>
                        <img className='pic' src={item.imgUrl} alt='' />
                       <ListInfo>
                          <h3 className='title'>{item.title}</h3>
                          <p className='desc'>{item.desc}</p>
                       </ListInfo>
                    </ListItem>
                   </Link>
                )
            })}
            <LoadMore onClick ={() => changeArticleIndex(articleIndex)}>加载更多</LoadMore>
            </>
        )
    }
}

const mapStateToProps= state =>({
    articleList:state.getIn(['home','articleList']),
    articleIndex:state.getIn(['home','articleIndex'])
})

const mapDispatchToProps = dispatch => ({
    changeArticleIndex(articleIndex){
      if(articleIndex <= 12){
          dispatch(actionCreators.changeArticleIndex(articleIndex +4))
      }else{
         alert('没有更多啦')
      }

    }
})
export default connect(mapStateToProps,mapDispatchToProps)(List)