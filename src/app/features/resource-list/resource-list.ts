import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Resource } from '../../models/resource.model';
import { OwnerListComponent } from '../owner-list/owner-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourceFormComponent } from "../resource-form/resource-form";
import { ToggleSection } from "../../shared/components/toggle-section/toggle-section";
import { EntityListWrapperComponent } from '../../shared/components/entity-list-wrapper/entity-list-wrapper';
import { ResourceApiService } from '../../services/resource-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceApiService } from '../../services/service-api.service';
import { Filter } from '../../models/Filter.model';

@Component({
  selector: 'app-resource-list',
  imports: [CommonModule, FormsModule, EntityListWrapperComponent],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss'
})
export class ResourceListComponent {

  serviceId: string = '';
  title = "Resources";
  buttonText = 'New Resource';
  columns = ['ID'];
  actions = ['edit', 'delete'];
  resources: Resource[] = [];
  // filters: Filter[] = [];
  selectedServiceId: string = '';
  selectedResourceId: string = '';

  constructor(
    private resourceApiService: ResourceApiService,
    private serviceApi: ServiceApiService, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef, 
    private router: Router) { 
    
  }  
  ngOnInit(): void {
    console.log('Resource Loaded');
    this.serviceId = this.route.snapshot.paramMap.get('id') || '';
    this.loadResources();
  }

  loadResources(): void {
    // This method should be implemented to load resources based on serviceId
    // For example, you might call a service API to fetch resources
    this.resourceApiService.getResourcesByServiceId(this.serviceId).subscribe({
      next: (data) => {
        this.resources = data;
        console.log("Data fetched for resources: ", this.resources);
        this.cdr.detectChanges(); // Ensure change detection runs after data load
      },
      error: (err) => { 
        console.error('Error loading resources:', err);
      }
    });
  }

  // loadFilters(): void {
  //   this.serviceApi.getServices().subscribe(services => {
  //   this.filters = [
  //     {
  //       label: 'Service',
  //       options: services.map(s => s.id),
  //       selected: '',
  //       onChange: (id: string) => {
  //         this.selectedServiceId = id;
  //         this.resourceApiService.getResourcesByServiceId(id).subscribe(resources => {
  //           this.resources = resources;
  //         });
  //       }
  //     },
  //   ];
  // });
  // }
  onNewService(): void {
    // Logic to handle new resource creation
    console.log('New Resource button clicked');
  }
  
  handleAction(event: { action: string; row: any }) {
    if (event.action === 'edit') {
      this.editResource(event.row);
    } else if (event.action === 'delete') {
      this.deleteResource(event.row.id);
    }
  }
  editResource(resource: Resource): void {
    console.log('Edit Resource:', resource);
    // Navigate to the resource edit page
    this.router.navigate(['/owner', resource.id, 'edit']);
  }
  deleteResource(resourceId: string): void {
    if (confirm(`Are you sure you want to delete resource ${resourceId}?`)) {
      this.resourceApiService.delete(resourceId).subscribe({
        next: () => {
          this.loadResources();
        },
        error: (err) => {
          console.error('Error deleting resource:', err);
        }
      });
    }
  }  

}
