import React from 'react';
import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { CustomToggle, CustomMenu } from '../../../../../shared/components/searchDropdown/Search-dropdown.component';

export const DefaultContryCode = ({ isEnableCountryCode, selectedCountry, setSelectedCountry, countries, onFieldUpdate }) =>  {
  // let selectedCountry = null;
  // const setDefaultCountry = () => {
  //   if(!selectedCountry) {
  //     for(let i=0; i<countries.length; i++) {
  //       if(countries[i].dial_code === defaultCountryCode) {
  //         selectedCountry = countries[i];
  //         break;
  //       }
  //     }
  //   }
  // }

  // const setSelectedCountry = country => {
  //   selectedCountry = country;
  //   onFieldUpdate('defaultCountryCode', country.dial_code)
  // }

  const getSingleCountryData = (country) => 
  (<figure>
    <img src="https://www.countryflags.io/CX/flat/64.png" />
    <figcaption>({country.dial_code}) {country.name}</figcaption>
  </figure>);
  const getCountryData = countries => countries.map(
    country => <Dropdown.Item 
          key={`country-code${country}`}
          onClick={()=>setSelectedCountry(country)}
          eventKey={country}>
          {getSingleCountryData(country)}
        </Dropdown.Item>
  )
  return (
    <Form.Group className="default-country-code-container" check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isEnableCountryCode} onChange={e=>onFieldUpdate('isEnableCountryCode', e.target.checked)} /> Select Default Country Code
      </Form.Label>
      {
        isEnableCountryCode &&
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            {selectedCountry? getSingleCountryData(selectedCountry) : 'Choose country code'}
            <i className="down-chevron" />
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu}>
          {getCountryData(countries)}
          </Dropdown.Menu>
      </Dropdown>
      }
      
    </Form.Group>
  );
}

export default DefaultContryCode;