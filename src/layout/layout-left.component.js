import React from 'react';
import { Link } from 'react-router-dom'

export const LayoutLeft = ()=>
  <ul>
    <li>
      <Link to="/bot-builder"> <i className="builder-icon"></i> </Link>
    </li>
  </ul>

export default LayoutLeft;