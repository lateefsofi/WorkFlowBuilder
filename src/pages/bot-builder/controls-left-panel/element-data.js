import { TYPES } from '../../../shared/constants/bot-control-types.constants';

export const controlsData = [
  { icon: 'message', type: TYPES.MESSAGE, name: 'Message', hasOptions: false, placeholder: 'Type your message here' },
  { icon: 'profile', type: TYPES.NAME, name: 'Name', hasOptions: true },
  { icon: 'email', type: TYPES.EMAIL, name: 'Email', hasOptions: true },
  { icon: 'phone', type: TYPES.PHONE, name: 'Phone', hasOptions: true },
  { icon: 'number', type: TYPES.NUMBER, name: 'Number', hasOptions: true },
  { icon: 'yesno', type: TYPES.YESNO, name: 'Yes/No', hasOptions: true },
  { icon: 'file', type: TYPES.FILE, name: 'File', hasOptions: true },
  { icon: 'rating', type: TYPES.RATING, name: 'Rating', hasOptions: true },
  { icon: 'button', type: TYPES.BUTTON, name: 'Button', options: [], hasOptions: true },
  { icon: 'address', type: TYPES.ADDRESS, name: 'Address', hasOptions: true },
  { icon: 'scale', type: TYPES.SCALE, name: 'Scale', hasOptions: true },
  { icon: 'list', type: TYPES.LIST, name: 'List', hasOptions: true }
];

export const additionalBlocksData = [
  { icon: '', name: 'Conditional logic'},
  { icon: '', name: 'Goals'},
  { icon: '', name: 'Stripe'},
  { icon: '', name: 'Appointmant'},
]
