import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwnerFormComponent } from "../owner-form/owner-form";
import { StateKeys } from '../../shared/constants/state.constants';
import { ToggleSection } from "../../shared/components/toggle-section/toggle-section";
import { Owner } from '../../models/owner.model';
import { EntityListWrapperComponent } from '../../shared/components/entity-list-wrapper/entity-list-wrapper';
import { ActivatedRoute, Route } from '@angular/router';
import { OwnerApiService } from '../../services/owner.service';
import { Filter } from '../../models/Filter.model';
import { ResourceApiService } from '../../services/resource-api.service';
import { ServiceApiService } from '../../services/service-api.service';

@Component({
  selector: 'app-owner-list',
  imports: [CommonModule, FormsModule, EntityListWrapperComponent],
  templateUrl: './owner-list.html',
  styleUrl: './owner-list.scss',
  standalone: true
})
export class OwnerListComponent {
  resourceId: string = '';
  owners: Owner[] = [];
  title = "Owners";
  buttonText = 'New Owner';
  columns = ['ID', 'Name', 'AccountNumber', 'Level'];
  actions = ['edit', 'delete'];
  filters: Filter[] = [];
  selectedServiceId: string = '';
  selectedResourceId: string = '';
  private cdr = inject(ChangeDetectorRef);
  constructor(
    private ownerApiService: OwnerApiService,
    private resourceApiService: ResourceApiService,
    private serviceApiService: ServiceApiService, 
    private route: ActivatedRoute 
    ) {
    // This constructor can be used to initialize any services or state }
  }
  ngOnInit(): void {
    console.log('OwnerListComponent initialized');
    this.resourceId = this.route.snapshot.paramMap.get('id') || '';
    // this.loadFilters()
    this.loadOwners();
  }

  loadOwners(): void {
    // This method should be implemented to load owners based on resourceId
    // For example, you might call a service API to fetch owners
    console.log('Loading owners for resource ID:', this.resourceId);
    // Simulate loading owners
    this.ownerApiService.getOwnersByResourceId(this.resourceId).subscribe({
      next: (data) => {
        this.owners = data;
        this.cdr.detectChanges(); // Ensure change detection runs after data load
        console.log("Data fetched for owners: ", this.owners);
      },
      error: (err) => {
        console.error('Error loading owners:', err);
      }
    });
  } 
  loadFilters(): void {
    this.serviceApiService.getServices().subscribe(services => {
    this.filters = [
      {
        label: 'Service',
        options: services.map(s => s.id),
        selected: '',
        onChange: (id: string) => {
          this.selectedServiceId = id;
          this.resourceApiService.getResourcesByServiceId(id).subscribe(resources => {
            // this.resources = resources;
            this.filters[1].options = resources.map(r => r.id);
            this.filters[1].selected = '';
            // this.resources = []; // reset owners
          });
        }
      },
      {
        label: 'Resource',
        options: [],
        selected: '',
        onChange: (id: string) => {
          this.resourceId = id;
          this.loadOwners();
        }
      }
    ];
  });
  }
  onNewOwner(): void {
    // Logic to handle new owner creation
    console.log('New Owner button clicked');
  }
  handleAction(event: { action: string; row: any }) {
    if (event.action === 'edit') {
      this.editOwner(event.row);
    } else if (event.action === 'delete') {
      this.deleteOwner(event.row.id);
    }
  }
  editOwner(owner: string): void {
    // Navigate to the owner edit page
    console.log('Edit Owner:', owner);
  }
  deleteOwner(ownerId: string): void {
    if (confirm(`Are you sure you want to delete owner ${ownerId}?`)) {
      this.ownerApiService.delete(ownerId).subscribe({
        next: () => {
          console.log(`Owner ${ownerId} deleted successfully`);
          this.loadOwners(); // Reload owners after deletion
        },
        error: (err) => {
          console.error('Error deleting owner:', err);
        }
      });
    }
  }
}
