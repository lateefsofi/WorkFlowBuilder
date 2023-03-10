import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './builder-top-nav.component.scss';

export class BuilderTopNav extends Component{
  constructor (props){
    super(props);
    this.state = {
      isEdit: false,

    }
    // this.toggleEditBotName = this.toggleEditBotName.bind(this);
  }

  componentDidMount() {

  }

  // toggleEditBotName() {
  //   this.setState((prevState)=> ({isEdit: !prevState.isEdit}));
  // }

  render() {
    return(
      <div className="builder-top-nav">
        <div className="builder-top-nav-left">
          <span className="bot-name">
          {
            // this.state.isEdit?  
            <input type="text" value={this.props.botName} onChange={this.props.onNameChangeHandler}/>
            
            // :
            // this.props.botName
          }
          {/* <i className="arrow-left"></i> */}
          </span>
          {/* {
            this.state.isEdit?
            <i onClick={this.toggleEditBotName}>x</i>:
          } */}
          
        </div>
        <div className="builder-top-nav-mid">
          <Link to="/bot-builder">Design</Link>
          <Link className={ window.location.pathname === '/bot-builder'? 'active': '' } to="/bot-builder">Builder</Link>
          <Link className={ window.location.pathname === '/bot-builder'? 'active': '' } to="/bot-builder">Settings</Link>
          <Link className={ window.location.pathname === '/bot-builder'? 'active': '' } to="/bot-builder">Share</Link>
        </div>
        <div className="builder-top-nav-right">
          <Link to="/">
            <i className="arrow-left"></i>
            Go back
          </Link>
        </div>
      </div>
    );
  }
}