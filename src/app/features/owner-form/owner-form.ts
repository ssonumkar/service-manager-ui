import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-owner-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-form.html',
  styleUrl: './owner-form.scss',
  standalone: true
})
export class OwnerFormComponent {
  @Input() owner: any = {}; // Initialize with an empty object or a specific owner model
  // This component will handle the form for creating or editing an owner
  // It will likely include methods to handle form submission and validation
  // as well as any necessary interactions with a service to save the owner data.

}
