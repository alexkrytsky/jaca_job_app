import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import RootState from './store/RootState';
import ThemeController from './ThemeController';

ReactDOM.render(
  <Fragment>
    <BrowserRouter>
      <Provider store={new RootState()}>
        <ThemeController />
      </Provider>
    </BrowserRouter>
  </Fragment>, document.getElementById('root')
);
