import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { MuiThemeProvider } from '@material-ui/core/styles';

import './App.scss';
import Layout from './layout/Layout.component';
import Loader from './shared/components/loader/Loader.component.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout/>
        </div>
      </Router>
    );
  }
}

export default App;
