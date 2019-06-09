import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Registration from '../pages/registration/Registration.component';
import Login from '../pages/login/Login.component';
import BuilderMain from '../pages/bot-builder/builder-main';
import BotList from '../pages/bot-details/bot-list.component';

class AppRouting extends Component {
    authenticatedRoutes() {
      if(this.props.isLoggedIn) {
        return (
          <div>
            {/* Add all athenticated routes here */}
          </div>
        )
      }
      return null;
    }
    openRoutes() {
      return (
        <div>
           {/* Add All open routes here */}
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/bot-builder" component={BuilderMain} />
          <Route path="/bots" component={BotList} />
        </div>
      );
    }
    render() {
        return (
            <div>
                {
                    this.openRoutes()
                }
                {
                    this.authenticatedRoutes()
                }
            </div>
        )
    }
}

export default AppRouting;