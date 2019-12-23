import React ,{ Component }from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter,Route } from 'react-router-dom'
import { GlobalStyled } from './style'
import { GlobalIcon } from './statics/iconfont/iconfont'
import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail'
import store from './store'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <GlobalStyled />
        <GlobalIcon />
        <BrowserRouter>
        <Header />
           <Route path='/' render = {() => <Home />} exact />
           <Route path='/detail' render = {() => <Detail />} exact />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
