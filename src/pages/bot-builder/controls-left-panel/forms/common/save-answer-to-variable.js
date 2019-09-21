import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../forms.scss';

export class SaveAnswerInVariable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variableName: props.variableName || ''
    } 
    this.onTextChange = this.onTextChange.bind(this);
    this.onCreateVariable = this.onCreateVariable.bind(this);
  }

  onTextChange(e) {
    this.setState({
      variableName: e.target.value
    })
  }

  onCreateVariable() {
    this.props.onFieldUpdate('variableName', this.state.variableName);
  }

  render() {
    const { 
      isSaveInVariable,
      isAddFallBackValue,
      variableName,
      variableFallBackValue,
      onFieldUpdate
    } = this.props;
    return(
      <div className="check-box-container">
        <Form.Group check="true" inline="true">
          <Form.Label check="true">
            <Form.Control type="checkbox" checked={isSaveInVariable} onChange={e=>onFieldUpdate('isSaveInVariable', e.target.checked)} /> Save Answer to a Variable
          </Form.Label>
          {
            isSaveInVariable &&
            <div className="variable-container">
              <span className="atSymbol">@</span>
              <Form.Control className="txt-variable-name" type="text" placeholder="Variable Name"
                onChange={this.onTextChange}
                value={this.state.variableName}
              />
              <Button onClick={this.onCreateVariable} className="create-action" type="button" color="primary">Create</Button>
              {
                variableName &&
                <React.Fragment>
                  <Button className="add-fallback-val-action" onClick={()=>onFieldUpdate('isAddFallBackValue', !isAddFallBackValue)} type="button" color="primary">Add Fallback value</Button>
                  {
                    isAddFallBackValue &&
                    <Form.Control  type="text" placeholder="Fallback Value" 
                      onChange={e=>onFieldUpdate('variableFallBackValue', e.target.value)}
                      value={variableFallBackValue}
                    />
                  }
                </React.Fragment>
              }
            </div>
          }
        </Form.Group>
      </div>
    )
  }
}

export default SaveAnswerInVariable;