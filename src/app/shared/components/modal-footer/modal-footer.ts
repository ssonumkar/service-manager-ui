import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterButton } from './footer-button.model';

@Component({
  selector: 'app-modal-footer',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-footer.html',
  styleUrl: './modal-footer.scss'
})
export class ModalFooter {

  @Input() footerButtons: FooterButton[] = [];
  @Output() actionClick = new EventEmitter<string>();

  handleClick(action: string): void {
    this.actionClick.emit(action);
  }
}
