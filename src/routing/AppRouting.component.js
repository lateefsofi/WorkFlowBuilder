import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import Registration from '../pages/registration/Registration.component';
import Login from '../pages/login/Login.component';
import BotBuilder from '../pages/bot-builder/bot-builder.component';

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
          <Route path="/bot-builder" component={BotBuilder} />
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.AuthReducer.isLoggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

// export default connect(mapStateToProps)(AppRouting);
export default AppRouting;