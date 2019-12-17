import React from 'react';
import { GlobalStyled } from './style'
import { GlobalIcon } from './statics/iconfont/iconfont'
import Header from './common/header'
function App() {
  return (
    <div>
      <GlobalStyled />
      <GlobalIcon />
      <Header />
    </div>
  );
}

export default App;
