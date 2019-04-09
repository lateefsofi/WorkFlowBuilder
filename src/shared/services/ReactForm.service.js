/**
 * Create a react form
 * @param {*} form 
 */
const ReactForm = (form) => {
    let reactForm = {}
    Object.keys(form).forEach((field)=>{
        reactForm[field] = {
            value: form[field],
            isDirty: false
        }
    });
    return reactForm;
}

/**
 * Update form state
 * @param {*} currState 
 * @param {*} field 
 * @param {*} event 
 */
const UpdateField = (currState, field, value) => {
    const formValues =  {
        ...currState,
        [field]:{
            value: value,
            isDirty: true
        }  
    };
    return formValues;
}

/**
 * Set the field as dirty on modification or focus
 * @param {*} currState 
 * @param {*} field 
 * @param {*} state 
 */
const SetDirty = (currState, field, state) => {
    const formValues =  {...currState};
    formValues[field].isDirty = state;
    return formValues;
}

/**
 * Set all the form elements dirty state to true/false
 * @param {*} currentState 
 * @param {*} state 
 */
const SetFormDirtyState = (currentState, state) => {
    const formValues =  {...currentState};
    Object.keys(formValues).forEach(key=>{
        formValues[key].isDirty = state
    });
    return formValues
}

const ReactFormValues = (reactForm) => {
    let form = {}
    Object.keys(reactForm).forEach((field) => {
        form[field] = reactForm[field].value;
    });
    return form;
}


export default ReactForm;
export { ReactForm, UpdateField, SetDirty, ReactFormValues, SetFormDirtyState }