import React from 'react';
import { Link } from 'react-router-dom'

export const LayoutLeft = ()=>
  <React.Fragment>
    <ul className="left-nav-top">
      <li>
        <Link to="/bot-builder"> <i className="builder-icon"></i> </Link>
      </li>
    </ul>
    <ul className="left-nav-mid">
      <li>
        <Link to="/bot-builder"> <i className="cloud-message-icon"></i> </Link>
      </li>
      <li>
        <Link to="/bot-builder"> <i className="stats-icon"></i> </Link>
      </li>
      <li>
        <Link to="/bot-builder"> <i className="cloud-ok-icon"></i> </Link>
      </li>
      <li>
        <Link to="/bot-builder"> <i className="settings-icon"></i> </Link>
      </li>
      <li>
        <Link to="/bot-builder"> <i className="delete-main-icon"></i> </Link>
      </li>
    </ul>
    <ul className="left-nav-bottom">
      <li>
        <Link to="/bot-builder"> <span className="icon-container"> <i className="book-icon"></i> </span>  </Link>
      </li>
      <li>
        <Link to="/bot-builder"> <span className="icon-container"> <i className="notification-bell-icon"></i> </span> </Link>
      </li>
      <li>
        <Link to="/bot-builder"> <span className="icon-container profile-icon-container"> <i className="profile-icon"></i> </span> </Link>
      </li>
    </ul>
  </React.Fragment>

export default LayoutLeft;