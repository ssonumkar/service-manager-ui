import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];
  @Input() actions: string[] = [];

  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  emitAction(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }

  getRowValue(row: any, header: string): any {
    console.log(row, header);
    const key = header.toLowerCase().replace(/\s+/g, '');
    return row[key] ?? row[header] ?? '';
  }
}
 
