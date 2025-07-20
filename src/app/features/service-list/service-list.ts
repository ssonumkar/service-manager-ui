import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceApiService } from '../../services/service-api.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Service } from '../../models/service.model';
import { CommonModule } from '@angular/common';
import { EntityListWrapperComponent } from '../../shared/components/entity-list-wrapper/entity-list-wrapper';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule, RouterModule, EntityListWrapperComponent],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  title = "Swisscom Services";
  buttonText = 'New Service';
  columns = ['ID'];
  actions = ['edit', 'delete'];
  keys = ['id']; 
  routerSubscription!: Subscription;
  constructor(
    private serviceApi: ServiceApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(): void {
    console.log('ServiceListComponent initialized');
    this.loadServices();
  }

  loadServices(): void {
    this.serviceApi.getServices().subscribe({
      next: (data) => {
        this.services = data;
        console.log("Data fetched for services: ", this.services);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading services:', err);
      }
    });
  }

  editService(service: string): void {    
    this.router.navigate(['/resource', service, 'edit']);
  }

  deleteService(service: string): void {
    if (confirm(`Are you sure you want to delete service ${service}?`)) {
      console.log("service in delete: ", service);
      this.serviceApi.deleteService(service).subscribe(() => {
        this.loadServices();
      });
    }
  }
  handleAction(event: { action: string; row: any }) {
    const { action, row } = event;
    if (action === 'edit') {
      this.editService(row.id);
    } else if (action === 'delete') {
      this.deleteService(row.id);
    }
  }
  onNewService() {
    this.router.navigate(['/service', 'new']);
  }

}
