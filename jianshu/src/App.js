import React ,{ PureComponent }from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter,Route } from 'react-router-dom'
import { GlobalStyled } from './style'
import { GlobalIcon } from './statics/iconfont/iconfont'
import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail'
import Login from './pages/login'
import store from './store'

class App extends PureComponent{
  render(){
    return (
      <Provider store={store}>
        <GlobalStyled />
        <GlobalIcon />
        <BrowserRouter>
           <Header />
           <Route path='/' render = {() => <Home />} exact />
           <Route path='/login' render={() => <Login />} exact />
           <Route path='/detail/:id' render = {() => <Detail />} exact />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
