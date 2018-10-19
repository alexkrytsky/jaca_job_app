import { createMuiTheme } from '@material-ui/core';

const Themes = [
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

export default Themes;
