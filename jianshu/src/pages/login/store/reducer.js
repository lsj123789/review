import { CHANGE_LOGIN } from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    account:'',
    password:'',
    isLogin:false,
})

const changeLogin = (state,action) => {
    return state.merge({
        account:action.account,
        password:action.password,
        isLogin:action.isLogin
    })
}

export default (state = defaultState , action) => {
    switch(action.type){
        case CHANGE_LOGIN:
            return changeLogin(state,action)
        default:
            return state
    }
}