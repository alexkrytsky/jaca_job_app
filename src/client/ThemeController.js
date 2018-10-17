import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import App from './components/app/App';
import RootState from './store/RootState';

/**
 * Wrapper to allow state to control the theme
 */
@inject('store')
@observer
class ThemeController extends Component {
  render() {
    const { store } = this.props;

    const themes = [
      // Light Themes
      // MSC General
      createMuiTheme({
        palette: {
          type: 'light',
          primary: { main: '#9CAF88' },
          secondary: { main: '#009681' },
        }
      }),
      // Education / Employment
      createMuiTheme({
        palette: {
          type: 'light',
          primary: { main: '#78BE20' },
          secondary: { main: '#D2D755' },
        }
      }),
      // Energy
      createMuiTheme({
        palette: {
          type: 'light',
          primary: { main: '#FF7F41' },
          secondary: { main: '#EE2737' },
        }
      }),
      // Food Bank
      createMuiTheme({
        palette: {
          type: 'light',
          primary: { main: '#93328E' },
          secondary: { main: '#5D285F' },
        }
      }),
      // Housing
      createMuiTheme({
        palette: {
          type: 'light',
          primary: { main: '#F0B323' },
          secondary: { main: '#653819' },
        }
      }),
      // LTCOP
      createMuiTheme({
        palette: {
          type: 'light',
          primary: { main: '#007398' },
          secondary: { main: '#002F6C' },
        }
      }),
      // Dark Themes
      // MSC General
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: { main: '#9CAF88' },
          secondary: { main: '#009681' },
        }
      }),
      // Education / Employment
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: { main: '#78BE20' },
          secondary: { main: '#D2D755' },
        }
      }),
      // Energy
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: { main: '#FF7F41' },
          secondary: { main: '#EE2737' },
        }
      }),
      // Food Bank
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: { main: '#93328E' },
          secondary: { main: '#5D285F' },
        }
      }),
      // Housing
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: { main: '#F0B323' },
          secondary: { main: '#653819' },
        }
      }),
      // LTCOP
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: { main: '#007398' },
          secondary: { main: '#002F6C' },
        }
      }),
    ];

    return (
      <MuiThemeProvider theme={themes[store.paletteType]}>
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
