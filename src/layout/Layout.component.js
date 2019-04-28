import React, { Component } from 'react';
import AppRouting from '../routing/appRouting.component';

import './Layout.component.scss';

import LayoutLeft from './layout-left.component';

export class Layout extends Component {
  render() {
    return (
      <div className="parent-container">
        <div className="top-nav"></div>
        <div className="left-nav">
          <LayoutLeft />
        </div>
        <div className="main-container">
          <AppRouting />
        </div>
      </div>
    )
  }
}

export default Layout;