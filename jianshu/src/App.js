import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyled } from './style'
import { GlobalIcon } from './statics/iconfont/iconfont'
import Header from './common/header'
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <GlobalIcon />
      <Header />
    </Provider>
  );
}

export default App;
