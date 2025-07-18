import { Component, inject } from '@angular/core';
import { ResourceListComponent } from '../resource-list/resource-list';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceApiService } from '../../services/service-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateService } from '../../shared/services/state.service';
import { StateKeys } from '../../shared/constants/state.constants';

@Component({
  selector: 'app-service-form',
  imports: [CommonModule, FormsModule, ResourceListComponent],
  templateUrl: './service-form.html',
  styleUrl: './service-form.scss',
  standalone: true
})
export class ServiceFormComponent {
  

  service: any = {}; // Initialize with an empty object or a specific service model
  
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private api: ServiceApiService,
      private stateService: StateService
    ) {}

  ngOnInit() {
    this.service = this.stateService.getState(StateKeys.Service);
    console.log('Service loaded from state:', this.service);
  }
  addResource() {
     this.service.resources.push({
    id: 'res_' + Date.now(),
    owners: []
  });
  }
  editResource(resource: any) {
    this.stateService.setState(StateKeys.Resource, resource);
    // Navigate to the resource edit page

  }
  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/']);
  }
  onSubmit() {
    console.log('Service submitted:', this.service);
    this.api.updateService(this.service).subscribe({
      next: (response) => {
        console.log('Service updated successfully', response);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error updating service', error);
      }
    });
  }
}
