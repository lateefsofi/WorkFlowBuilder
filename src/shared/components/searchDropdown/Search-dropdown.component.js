import React, { Component } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import './search-dropdown.component.scss';

export class CustomToggle extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
}

export class CustomMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: '' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value.toLowerCase().trim() });
  }

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    const { value } = this.state;

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">
          children: {children}
          {/* {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value), */}
          {/* )} */}
        </ul>
      </div>
    );
  }
}

export class CustomDropdown extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getListItems() {
    const { displayAttribute, listItems, setSelected } = this.props;
    return (listItems || [])
      .map( (item, index) => 
        <Dropdown.Item 
          key={`dp-${displayAttribute}-${index}`} 
          eventKey={index} active
          onClick={()=>setSelected(item)}
        >
          {!displayAttribute?item : item[displayAttribute]}
        </Dropdown.Item>
      )
  }

  render() {
    const { displayAttribute, selectedItem } = this.props;
    return(
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {!displayAttribute?selectedItem : selectedItem[displayAttribute]}
          <i className="down-chevron" />
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
            { this.getListItems() }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

CustomDropdown.propTypes = {
  displayAttribute: PropTypes.string,
  listItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedItem: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  setSelected: PropTypes.func
};