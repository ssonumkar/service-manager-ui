import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceApiService } from '../../services/service-api.service';
import { Router, RouterModule } from '@angular/router';
import { Service } from '../../models/service.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../shared/services/state.service';
import { StateKeys } from '../../shared/constants/state.constants';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceListComponent implements OnInit {
  services: Service[] = []; 
  loading = true;
  error: string | null = null;

  constructor(private serviceApi: ServiceApiService, private router: Router, private stateService: StateService,private cdr: ChangeDetectorRef) { // Replace 'any' with the actual service type
    // This serviceApi should be injected via Angular's dependency injection 
  }
  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.loading = true;
    this.serviceApi.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
        console.log('Services loaded:', this.services);
        this.cdr.detectChanges(); // Ensure the view is updated
      },
      error: (err) => {   
        this.error = 'Failed to load services';
        console.error(err);
        this.loading = false;
      }
  });
  
  }

  editService(service: any) {
    this.stateService.setState(StateKeys.Service, service)
    this.router.navigate(['/service', service.id, 'edit']);
  }

  deleteService(id: string) {
    if(confirm('Are you sure you want to delete this service?')) {
      this.serviceApi.deleteService(id).subscribe({
        next: () => {
          this.loadServices(); // Reload the services after deletion
        },
        error: (err) => {
          this.error = 'Failed to delete service';
          console.error(err);
        }
      });
    } 
  }

}
