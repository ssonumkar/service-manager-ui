import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalFooter } from "../modal-footer/modal-footer";
import { FooterButton } from '../modal-footer/footer-button.model';

@Component({
  selector: 'app-modal-wrapper',
  imports: [ModalFooter],
  templateUrl: './modal-wrapper.html',
  styleUrl: './modal-wrapper.scss'
})
export class ModalWrapper {
  @Input() title: string = '';
  @Input() footerButtons: FooterButton[] = [];
  @Output() action = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  handleClick(action: string) {
  this.action.emit(action);
  }
  closeModal() {
    this.close.emit();
  }
}
