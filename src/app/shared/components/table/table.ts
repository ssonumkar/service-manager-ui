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
  @Input() editTooltip: string = 'Edit'; // Dynamic tooltip for edit button
  @Input() deleteTooltip: string = 'Delete'; // Dynamic tooltip for delete button

  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  emitAction(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }

  getRowValue(row: any, header: string): any {
    console.log(row, header);
    // Try multiple variations to match property names
    const variations = [
      header.toLowerCase().replace(/\s+/g, ''), // 'accountnumber'
      header.charAt(0).toLowerCase() + header.slice(1).replace(/\s+/g, ''), // 'accountNumber'
      header.replace(/\s+/g, ''), // 'AccountNumber'
      header // original header
    ];
    
    for (const key of variations) {
      if (row.hasOwnProperty(key) && row[key] !== undefined && row[key] !== null) {
        return row[key];
      }
    }
    
    return '';
  }
}
 
