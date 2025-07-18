import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-section',
  imports: [CommonModule],
  templateUrl: './toggle-section.html',
  styleUrl: './toggle-section.scss'
})
export class ToggleSection {
  @Input() title: string = '';
  expanded: boolean = false;
  toggle(): void {
    this.expanded = !this.expanded
  } 
}
