import { TYPES } from '../../../shared/constants/bot-control-types.constants';

export const controlsData = [
  { icon: 'message', type: TYPES.MESSAGE, name: 'Message', messages: [{text: ""}], placeholder: 'Type your message here' },
  { icon: 'profile', type: TYPES.NAME, name: 'Name', text:'', placeholder: '', isSaveInVariable: false, isAddFallBackValue: false, variableFallBackValue:'' },
  { icon: 'email', type: TYPES.EMAIL, name: 'Email', text: '', placeholder: '', isSaveInVariable: false, isDisableNonBusinessEmails: false, isCustValidationMsg: false, validationMessage: '' },
  { icon: 'phone', type: TYPES.PHONE, name: 'Phone', text: '', placeholder: '', isSaveInVariable: false, isEnableCountryCode: false, isCustValidationMsg: false, validationMessage: '' },
  { icon: 'number', type: TYPES.NUMBER, name: 'Number', text: '', placeholder: '', isSaveInVariable: false, isSetMinMaxNum: false, isCustValidationMsg: false, validationMessage: '' },
  { icon: 'yesno', type: TYPES.YESNO, name: 'Yes/No', text: '',
    options: [
    {value: "Yes", next: null},
    {value: "No", next: null}
    ], isSaveInVariable: false, isAssignToLeadQualificationStage: false },
  { icon: 'file', type: TYPES.FILE, name: 'File', isSaveInVariable: false, isAssignToLeadQualificationStage: false, isFileUploadValidation: false, isCustValidationMsg: false },
  { icon: 'rating', type: TYPES.RATING, name: 'Rating' },
  { icon: 'button', type: TYPES.BUTTON, name: 'Button', text: '', options: [{value: '', next: null}] },
  { icon: 'address', type: TYPES.ADDRESS, name: 'Address', text: '', placeholder: '', isSaveInVariable: false },
  { icon: 'scale', type: TYPES.SCALE, name: 'Scale', placeholder: '', text: '', isSaveInVariable: false, isEnableLabels: false },
  { icon: 'list', type: TYPES.LIST, name: 'List', text: '', list: [], isEnableSearch: false, isEnableMultiSelect: false, isSaveInVariable: false}
];

export const additionalBlocksData = [
  { icon: '', name: 'Conditional logic'},
  { icon: '', name: 'Goals'},
  { icon: '', name: 'Stripe'},
  { icon: '', name: 'Appointmant'},
]
