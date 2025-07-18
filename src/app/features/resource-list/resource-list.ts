import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Resource } from '../../models/resource.model';
import { OwnerListComponent } from '../owner-list/owner-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourceFormComponent } from "../resource-form/resource-form";
import { ToggleSection } from "../../shared/components/toggle-section/toggle-section";

@Component({
  selector: 'app-resource-list',
  imports: [CommonModule, FormsModule, ResourceFormComponent, ToggleSection],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss'
})
export class ResourceListComponent {

  @Input() resources: Resource[] = []; // Replace 'any' with the actual resource type
  @Output() resourcesChange = new EventEmitter<any[]>();

  loading = true;
  error: string | null = null;
  expanedResource = new Set<string>();
  constructor() {
    // Initialize resources or fetch them from a service if needed
  }
  toggleOwners(resource: any): void {
    if(this.expanedResource.has(resource)) {
      this.expanedResource.delete(resource); // Collapse the resource if it is already expanded
    }else{
      this.expanedResource.add(resource); // Expand the resource if it is not expanded
    }
  }
  isExpanded(resource: any): boolean {
    return this.expanedResource.has(resource); // Return true if the resource is expanded, false otherwise
  }
  ngOnInit() {
    this.loadResources();
  }

  loadResources() {
    // Logic to load resources, e.g., from an API
    this.loading = false; // Set loading to false after loading resources
  }
  removeResource(resourceId: string) {
      this.resources = this.resources.filter(r => r.id !== resourceId);
      this.resourcesChange.emit(this.resources);
  }

}
