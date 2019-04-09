import React, { Component } from 'react';

import endPoints from '../../shared/constants/endPoints.constants';
import apiCall from '../../shared/services/web-api.service';
class AddSchool extends Component {
  componentDidMount(){
    apiCall('GET', endPoints.COUNTRIES, null)
      .then((countries)=>{
        console.log(countries);
      })
      .catch(err=>{
        console.log('err', err);
      });
  }
  render() {
    return(
      <h2>This is  Add School screen </h2>
    );
  }
}

export default AddSchool;
