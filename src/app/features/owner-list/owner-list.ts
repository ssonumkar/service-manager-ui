import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwnerFormComponent } from "../owner-form/owner-form";
import { StateKeys } from '../../shared/constants/state.constants';
import { ToggleSection } from "../../shared/components/toggle-section/toggle-section";

@Component({
  selector: 'app-owner-list',
  imports: [CommonModule, FormsModule, OwnerFormComponent, OwnerFormComponent, ToggleSection],
  templateUrl: './owner-list.html',
  styleUrl: './owner-list.scss'
})
export class OwnerListComponent {
  @Input() owners: any[] = []; // Replace 'any' with the actual owner type
  stateService: any;
  router: any;
  
  editOwner(owner: any): void {
    this.stateService.setState(StateKeys.Owner, owner);
    this.router.navigate(['/owner', owner.id, 'edit']);
  }

  deleteOwner(ownerId: string): void {
    this.owners = this.owners.filter(o => o.id !== ownerId);
    console.log('owners after deletion:', this.owners);
  }
}
