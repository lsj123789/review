import styled from 'styled-components'

export const LoginWrapper = styled.div `
   position: absolute;
   top:56px;
   left:0;
   right:0;
   bottom:0;
   background:#eee;
   z-index:0;
`

export const LoginBox = styled.div `
   width: 400px;
   height: 180px;
   margin:80px auto;
   background:#fff;
   padding-top:20px;
   box-shadow:0 0 8px rgba(0,0,0,.1)
`

export const Input = styled.input `
   width: 200px;
   height: 30px;
   line-height: 30px;
   padding:0 10px;
   display:block;
   color:#777;
   margin:10px auto;
`

export const Button = styled.div `
   width: 220px;
   height: 30px;
   line-height: 30px;
   color:#fff;
   border-radius:15px;
   background:#3194d0;
   margin:10px auto;
   text-align:center;
   cursor: pointer;
`