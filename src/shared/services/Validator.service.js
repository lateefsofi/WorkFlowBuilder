const Validator = (rules, form) => {
    let formErrors = {}
    Object.keys(rules).forEach((element) => {
        // Object.keys(rules[element]).forEach((elementRule) => {
        let isRuleBroked = false;
        for(let elementRule of Object.keys(rules[element])) {
            switch(elementRule){
                case 'required':
                    if(rules[element][elementRule].value && !form[element].value) {
                        formErrors[element] = rules[element][elementRule].message;
                        isRuleBroked = true;
                    }
                    break;
                case 'minLength':
                    if((!form[element] || !form[element].value) || form[element].value.length < rules[element][elementRule].value) {
                        formErrors[element] = rules[element][elementRule].message;
                        isRuleBroked = true;
                    }
                    break;
                case 'maxLength':
                    if(form[element] && form[element].value && form[element].value.length > rules[element][elementRule].value) {
                        formErrors[element] = rules[element][elementRule].message;
                        isRuleBroked = true;
                    }
                    break;
                case 'pattern':
                    const patt = new RegExp(rules[element][elementRule].value);
                    if(form[element] && !patt.test(form[element].value)) {
                        formErrors[element] = rules[element][elementRule].message;
                        isRuleBroked = true;
                    }
                    break;
                case 'compare':
                    if(form[element] && form[rules[element][elementRule].value] && form[element].value !== form[rules[element][elementRule].value].value) {
                        formErrors[element] = rules[element][elementRule].message;
                        isRuleBroked = true;
                    }
            }
            if(isRuleBroked) {
                break;
            }
        }
    });
    return formErrors;
}

export { Validator }