import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwnerListComponent } from '../owner-list/owner-list';
import { ToggleSection } from "../../shared/components/toggle-section/toggle-section";

@Component({
  selector: 'app-resource-form',
  imports: [CommonModule, FormsModule, OwnerListComponent, ToggleSection],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.scss'
})
export class ResourceFormComponent {

  @Input() resource: any = {}; // Initialize with an empty object or a specific resource model
  removeOwners(arg0: any) {
    throw new Error('Method not implemented.');
  }

  @Output() remove = new EventEmitter<string>();

  addOwner() {
    this.resource.owners.push({
    id: 'owner_' + Date.now(),
    name: '',
    accountNumber: '',
    level: 1
  });
  }
}
