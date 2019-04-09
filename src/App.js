import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './App.scss';
import theme from './theme/theme.component';
import Layout from './layout/Layout.component';
import Loader from './shared/components/loader/Loader.component.js';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Layout/>
          <Loader/>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
