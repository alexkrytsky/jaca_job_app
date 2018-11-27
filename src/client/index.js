import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RootState from './store/RootState';
import ThemeController from './ThemeController';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={new RootState()}>
      <ThemeController />
    </Provider>
  </BrowserRouter>, document.getElementById('root')
);
