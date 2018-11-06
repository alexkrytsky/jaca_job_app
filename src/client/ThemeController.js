import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import App from './components/app/App';
import RootState from './store/RootState';
import Themes from './constants/Themes';

/**
 * Wrapper to allow state to control the theme
 */
@inject('store')
@observer
class ThemeController extends Component {
  render() {
    const { store } = this.props;

    return (
      <MuiThemeProvider theme={Themes[store.local.paletteType]}>
        <App />
      </MuiThemeProvider>
    );
  }
}

// Tell react that these properties are required
ThemeController.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withRouter(ThemeController);
