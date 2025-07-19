import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from '../table/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entity-list-wrapper',
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './entity-list-wrapper.html',
  styleUrl: './entity-list-wrapper.scss'
})
export class EntityListWrapperComponent {
  @Input() title: string = '';
  @Input() buttonText: string = '➕ New';
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
  @Input() actions: string[] = []; // ['edit', 'delete']
  @Input() data: any[] = [];
  @Output() newClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  handleAction(event: { action: string; row: any }) {
  this.actionClick.emit(event);
}

}