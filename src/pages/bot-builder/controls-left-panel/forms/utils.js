export const cleanUnusedvariables = (message) => {
  const variables= message.variables || [];
    variables.forEach(variable => {
      if(message.text.indexOf(variable) === -1) {
        message.variables = message.variables.filter(item => item !== variable);
      }
    })
    return message;
}

export const elementTextChange = (element, text, variable) => {
    element.text= text;
    if(variable) {
      if(!element.variables) {
        element.variables = [variable];
      } else {
        element.variables.push(variable);
      }
    }
    return element;
}

export const minMaxValCheck = ({ maxNumValue, minNumValue }) => ~~maxNumValue < ~~minNumValue;
export const isInvalidMaxFileSize = ({isEnableFileSizeLimit, maxFileSizeLimit, systemFileSizeLimit}) => isEnableFileSizeLimit && (~~maxFileSizeLimit<=0 || ~~maxFileSizeLimit>~~systemFileSizeLimit);