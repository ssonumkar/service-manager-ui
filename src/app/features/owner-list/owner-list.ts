import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from '../../models/owner.model';
import { OwnerApiService } from '../../services/owner.service';
import { ResourceApiService } from '../../services/resource-api.service';
import { ServiceApiService } from '../../services/service-api.service';
import { EntityListWrapperComponent } from '../../shared/components/entity-list-wrapper/entity-list-wrapper';

@Component({
  selector: 'app-owner-list',
  imports: [CommonModule, FormsModule, EntityListWrapperComponent],
  templateUrl: './owner-list.html',
  styleUrl: './owner-list.scss',
  standalone: true
})
export class OwnerListComponent {
  resourceId: string = '';
  serviceId: string = '';
  owners: Owner[] = [];
  title = "Owners";
  buttonText = 'New Owner';
  columns = ['ID', 'Name', 'AccountNumber', 'Level'];
  actions = ['edit', 'delete'];
  selectedServiceId: string = '';
  selectedResourceId: string = '';
  showBackButton = true;
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private ownerApiService: OwnerApiService,
    private resourceApiService: ResourceApiService,
    private serviceApiService: ServiceApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    console.log('OwnerListComponent initialized');
    this.resourceId = this.route.snapshot.paramMap.get('resourceId') || '';
    this.serviceId = this.route.snapshot.paramMap.get('serviceId') || '';
    this.loadOwners();
  }

  loadOwners(): void {
    this.ownerApiService.getOwnersByResourceId(this.resourceId).subscribe({
      next: (data) => {
        this.owners = data;
        this.cdr.detectChanges(); // Ensure change detection runs after data load
      },
      error: (err) => {
        console.error('Error loading owners:', err);
      }
    });
  }
  onNewOwner(): void {
    this.router.navigate(['/owner', this.serviceId, this.resourceId, 'new']);
  }
  handleAction(event: { action: string; row: any }) {
    if (event.action === 'edit') {
      this.editOwner(event.row);
    } else if (event.action === 'delete') {
      this.deleteOwner(event.row.id);
    }
  }
  editOwner(owner: string): void {
    console.log('Edit Owner:', owner);
  }
  handleBack(): void {
    this.router.navigate(['/resource', this.serviceId, 'edit']);
  }
  deleteOwner(ownerId: string): void {
    if (confirm(`Are you sure you want to delete owner ${ownerId}?`)) {
      this.ownerApiService.delete(ownerId).subscribe({
        next: () => {
          console.log(`Owner ${ownerId} deleted successfully`);
          this.loadOwners();
        },
        error: (err) => {
          console.error('Error deleting owner:', err);
        }
      });
    }
  }
}
