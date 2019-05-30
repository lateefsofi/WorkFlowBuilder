import { TYPES } from '../../../shared/constants/bot-control-types.constants';

export const controlsData = [
  { icon: 'message', type: TYPES.MESSAGE, name: 'Message', messages: [{text: ""}], hasOptions: false, placeholder: 'Type your message here' },
  { icon: 'profile', type: TYPES.NAME, name: 'Name', text:'', hasOptions: false, placeholder: '', saveInVariable: false },
  { icon: 'email', type: TYPES.EMAIL, name: 'Email', text: '', placeholder: '', saveInVariable: false, disableNonBusinessEmails: false, custValidationMsg: false, validationMessage: '' },
  { icon: 'phone', type: TYPES.PHONE, name: 'Phone', text: '', placeholder: '', saveInVariable: false, enableCountryCode: false, custValidationMsg: false },
  { icon: 'number', type: TYPES.NUMBER, name: 'Number', text: '', placeholder: '', saveInVariable: false, setMinMaxNum: false, custValidationMsg: false },
  { icon: 'yesno', type: TYPES.YESNO, name: 'Yes/No', hasOptions: true, text: '',
    options: [
    {value: "Yes", next: null},
    {value: "No", next: null}
    ], saveInVariable: false, assignToLeadQualificationStage: false },
  { icon: 'file', type: TYPES.FILE, name: 'File', isSaveInVariable: false, isAssignToLeadQualificationStage: false, isFileUploadValidation: false, isCustValidationMsg: false },
  { icon: 'rating', type: TYPES.RATING, name: 'Rating', hasOptions: true },
  { icon: 'button', type: TYPES.BUTTON, name: 'Button', options: [], hasOptions: true },
  { icon: 'address', type: TYPES.ADDRESS, name: 'Address', text: '', placeholder: '', saveInVariable: false },
  { icon: 'scale', type: TYPES.SCALE, name: 'Scale', placeholder: '', text: '', isSaveInVariable: false, isEenableLabels: false },
  { icon: 'list', type: TYPES.LIST, name: 'List', text: '', listItems: [], isEenableSearch: false, isEnableMultiSelect: false, isSaveInVariable: false}
];

export const additionalBlocksData = [
  { icon: '', name: 'Conditional logic'},
  { icon: '', name: 'Goals'},
  { icon: '', name: 'Stripe'},
  { icon: '', name: 'Appointmant'},
]
