import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from '../../models/resource.model';
import { ResourceApiService } from '../../services/resource-api.service';
import { ServiceApiService } from '../../services/service-api.service';
import { EntityListWrapperComponent } from '../../shared/components/entity-list-wrapper/entity-list-wrapper';

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
  showBackButton = true;
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
    this.resourceApiService.getResourcesByServiceId(this.serviceId).subscribe({
      next: (data) => {
        this.resources = data;
        console.log("Data fetched for resources: ", this.resources);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading resources:', err);
      }
    });
  }
  handleBack(): void {
    this.router.navigate(['/services']);
  }

  onNewService(): void {
    this.router.navigate(['/resource/', this.serviceId, 'new']);
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
    this.router.navigate(['/owner', this.serviceId, resource.id, 'edit']);
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
