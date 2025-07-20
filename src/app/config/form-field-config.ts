import { FormField } from "../shared/components/form/form-field.model";

export const FORM_FIELD_CONFIG: { [key: string]: FormField[] } = {
  serviceCreateForm: [
    {
      label: 'Service ID',
      name: 'id',
      type: 'text',
      required: true,
      placeholder: 'Enter Service ID',
      validators: ['required']
    }
  ],
  resourceCreateForm: [
    {
      label: 'Resource ID',
      name: 'id',
      type: 'text',
      required: true,
      placeholder: 'Enter Resource ID',
      validators: ['required']
    }
  ],
  ownerCreateForm: [
    {
      label: 'Owner ID',
      name: 'id',
      type: 'text',
      required: true,
      placeholder: 'Enter Owner ID',
      validators: ['required']
    },
    {
      label: 'Owner Name',
      name: 'name',
      type: 'text',
      required: true,
      placeholder: 'Enter Owner Name',
      validators: ['required']
    },
    {
      label: 'Account Number',
      name: 'accountNumber',
      type: 'text',
      required: true,
      placeholder: 'Enter Account Number (10-12 digits)',
      validators: ['required', '^[0-9]{10,12}$']
    },
    {
      label: 'Level',
      name: 'level',
      type: 'select',
      required: true,
      placeholder: 'Select Level',
      options: ['1', '2', '3'],
      validators: ['required']
    }
  ]
};