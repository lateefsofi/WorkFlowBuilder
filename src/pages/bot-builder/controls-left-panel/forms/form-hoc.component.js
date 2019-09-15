import React, {Component} from 'react';

export default function FormHocComponent(HocComponent, element, saveElementPropsHandler){
    return class extends Component{
      constructor(props) {
        super(props);
        this.state = {
            element
        };
      }
      onToggleFallBackValue() {
        const element = {...this.state.element};
        element.isAddFallBackValue = !element.isAddFallBackValue;
        this.setState({
          element
        });
      }
      onCheckBoxChange(field, e) {
        const element = {...this.state.element};
        element[field]= e.target.checked;
        this.setState({
          element
        })
      } 
      render(){
          return (
              <div>
                  <HocComponent 
                    element={this.state.element} 
                    saveElementPropsHandler={saveElementPropsHandler}>
                  </HocComponent>
              </div>

          );
      }
    } 
}