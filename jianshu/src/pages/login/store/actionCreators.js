import { CHANGE_LOGIN } from './constants'

const changeLogin = (account,password,isLogin) => ({
    type:CHANGE_LOGIN,
    account,
    password,
    isLogin
})

export { changeLogin }