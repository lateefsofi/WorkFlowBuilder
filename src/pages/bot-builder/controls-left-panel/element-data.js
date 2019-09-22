import { TYPES } from '../../../shared/constants/bot-control-types.constants';

export const controlsData = [
  { icon: 'message', type: TYPES.MESSAGE, name: 'Message', messages: [{text: ""}], placeholder: 'Type your message here' },
  { icon: 'profile', type: TYPES.NAME, name: 'Name', text:'', placeholder: '', isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'' },
  { icon: 'email', type: TYPES.EMAIL, name: 'Email', text: '', placeholder: '', 
    isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'', 
    isDisableNonBusinessEmails: false, 
    isCustValidationMsg: false, validationMessages:{
      businessEmailValidationMsg: {
        placeholder: 'Email error message',
        text: 'Please enter a valid bussiness email'
      }
    }
  },
  { icon: 'phone', type: TYPES.PHONE, name: 'Phone', text: '', placeholder: '', 
    isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'', 
    isEnableCountryCode: false, 
    isCustValidationMsg: false, validationMessages:{
      phoneValidationMsg: {
        placeholder: '',
        text: 'Please enter phone number'
      }
    } },
  { icon: 'number', type: TYPES.NUMBER, name: 'Number', 
    text: '', placeholder: '', 
    isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'', 
    isSetMinMaxNum: false, minNumValue:'', maxNumValue: '', 
    isCustValidationMsg: false, validationMessages:{
      minMaxNumValidationMsg: {
        placeholder: 'Minimum and Maximum validation message',
        text: ''
      }
    } 
  },
  { icon: 'yesno', type: TYPES.YESNO, name: 'Yes/No', text: '',
    options: [
    {value: "Yes", next: null},
    {value: "No", next: null}
    ], isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'', isAssignToLeadQualificationStage: false },
  { icon: 'file', type: TYPES.FILE, name: 'File', text:'', isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'', isAssignToLeadQualificationStage: false, 
    isFileUploadValidation: false, fileTypes: {
      '.pdf': false,
      '.doc': false,
      '.ppt': false,
      '.txt': false,
    },
    isCustValidationMsg: false, validationMessages:{
      allowedFileTypes: {
        placeholder: '',
        text: 'Please upload valid file type.'
      }
    }
  },
  { icon: 'rating', type: TYPES.RATING, name: 'Rating' },
  { icon: 'button', type: TYPES.BUTTON, name: 'Button', text: '', options: [{value: '', next: null}], variableName: '', isAddFallBackValue: false, variableFallBackValue:'' },
  { icon: 'address', type: TYPES.ADDRESS, name: 'Address', text: '', placeholder: '', isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'' },
  { icon: 'scale', type: TYPES.SCALE, name: 'Scale', placeholder: '', text: '', isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:'', isEnableLabels: false },
  { icon: 'list', type: TYPES.LIST, name: 'List', text: '', list: [], isEnableSearch: false, isEnableMultiSelect: false, isSaveInVariable: false, variableName: '', isAddFallBackValue: false, variableFallBackValue:''}
];

export const additionalBlocksData = [
  { icon: '', name: 'Conditional logic'},
  { icon: '', name: 'Goals'},
  { icon: '', name: 'Stripe'},
  { icon: '', name: 'Appointmant'},
]
