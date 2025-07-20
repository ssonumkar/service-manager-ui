import { FooterButton } from "../shared/components/modal-footer/footer-button.model";

export const FOOTER_BUTTON_CONFIG:{[key: string]: FooterButton[]} = {
  serviceCreateForm: [
    {
      label: 'baack',
      action: 'back',
      type: 'secondary'
    }
  ],
  resourceCreateForm: [
    {
      label: 'back',
      action: 'back',
      type: 'secondary'
    }
  ],
}