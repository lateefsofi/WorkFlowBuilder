import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './App.scss';
import theme from './theme/theme.component';
import Layout from './layout/Layout.component';
import Loader from './shared/components/loader/Loader.component.js';
import AppRouting from './routing/appRouting.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <AppRouting /> */}
        {/* <MuiThemeProvider theme={theme}> */}
          <Layout/>
          {/* <Loader/> */}
        {/* </MuiThemeProvider> */}
        </div>
      </Router>
    );
  }
}

export default App;
