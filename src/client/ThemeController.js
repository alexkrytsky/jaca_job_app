import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import App from './components/app/App';
import RootState from './store/RootState';
import { withRouter } from 'react-router';

@inject('store')
@observer
class ThemeController extends Component {
  render() {
    const { store } = this.props;

    const dark = createMuiTheme({
      palette: {
        type: 'dark'
      }
    });

    const light = createMuiTheme({
      palette: {
        type: 'light'
      }
    });

    return (
      <MuiThemeProvider theme={store.paletteType === 'light' ? light : dark}>
        <App />
      </MuiThemeProvider>
    );
  }
}

ThemeController.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withRouter(ThemeController);
