import styled from 'styled-components';

export const HomeWrapper = styled.div `
   width:960px;
   margin:0 auto;
   overflow:hidden;
`
export const HomeLeft = styled.div `
   width:625;
   margin-left:15px;
   padding-top:30px;
   float:left;
   .banner-img{
       width: 625px;
       height: 270px;
   }
`
export const HomeRight = styled.div `
   width:280px;
   float:right;
`

export const TopicWrapper = styled.div`
   padding:20px 0 10px 0;
   overflow:hidden;
   margin-left:-10px;
   border:1px solid #dcdcdc;
`

export const TopicItem = styled.div`
    float:left;
    height: 32px;
    line-height:32px;
    background:#f7f7f7;
    font-size:14px;
    color:#000;
    border:1px solid #dcdcdc;
    border-radius:4px;
    padding-right:10px;
    margin-left:18px;
    margin-bottom:18px;
    .topic-pic{
        display:block;
        margin-right:10px;
        float:left;
        width: 32px;
        height: 32px;
    }
`

export const ListItem = styled.div`
    padding:20px 0;
    border-bottom:1px solid #dcdcdc;
    overflow:hidden;
    .pic{
       width: 125px;
       height: 100px;
       display:block;
       float:right;
       border-radius:10px;
    }
`
export const ListInfo  = styled.div`
    width: 500px;
    float:left;
    .title{
       line-height: 27px;
       font-size:18px;
       font-weight:bold;
       color:#333;
    }
    .desc{
       line-height:19px;
       font-size:13px;
       color:#999;
    }
`

export const RecommendWrapper = styled.div`
    margin:30px 0;
    width: 280px;
`
export const RecommendItem = styled.div`
    width: 280px;
    height: 50px;
    background:url(${(props) => props.imgUrl});
    background-size:contain;
`

export const WriterWrapper = styled.div`
    width: 278px;
    height: 300px;
    border-radius:3px;
`
export const WriterHeader = styled.div`
    margin-top:20px;
    margin-bottom:15px;
    line-height:20px;
    font-size:14px;
    color:#969696;
`
export const WriterSwitch = styled.div`
    float:right;
    font-size:13px;
    cursor: pointer;
    .spin{
        display:block;
        float:left;
        font-size:12px;
        margin-right:3px;
        transition:all .2s ease-in;
        transform-origin:center center;  
    }
`

export const WriterItem = styled.div`
       height: 50px;
       overflow:hidden;
       margin-top:20px;
       .writerPic{
          float:left;
          height: 50px;
          width: 50px;
          border-radius:50%;
          margin-left:10px;
       }
       .writerName{
          float:right;
          width: 200px;
          height: 20px;
          margin-bottom:10px;
          cursor: pointer;
          color:#333;
          font-size:14px;
       }
       .writerDesc{
          float:right;
          width: 200px;
          height: 20px;
          font-size:12px;
          color:#969696;
       }
`