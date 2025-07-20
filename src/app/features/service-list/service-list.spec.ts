import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { ServiceListComponent } from './service-list';
import { ServiceApiService } from '../../services/service-api.service';
import { Service } from '../../models/service.model';

describe('ServiceListComponent', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;
  let mockServiceApi: jasmine.SpyObj<ServiceApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;

  const mockService: Service = {
    id: 'test-service',
    resources: []
  };

  beforeEach(async () => {
    mockServiceApi = jasmine.createSpyObj('ServiceApiService', ['getServices', 'deleteService']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [ServiceListComponent],
      providers: [
        { provide: ServiceApiService, useValue: mockServiceApi },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
    
    // Setup default mock responses
    mockServiceApi.getServices.and.returnValue(of([mockService]));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load services on init', () => {
    component.ngOnInit();
    expect(mockServiceApi.getServices).toHaveBeenCalled();
    expect(component.services).toEqual([mockService]);
  });

  it('should navigate to service form on new service', () => {
    component.onNewService();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/service', 'new']);
  });

  it('should navigate to edit service', () => {
    component.editService('test-service');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/resource', 'test-service', 'edit']);
  });

  it('should delete service after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockServiceApi.deleteService.and.returnValue(of(undefined));
    
    component.deleteService('test-service');
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockServiceApi.deleteService).toHaveBeenCalledWith('test-service');
  });

  it('should not delete service if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.deleteService('test-service');
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockServiceApi.deleteService).not.toHaveBeenCalled();
  });

  it('should handle action events correctly', () => {
    spyOn(component, 'editService');
    spyOn(component, 'deleteService');

    component.handleAction({ action: 'edit', row: { id: 'test-service' } });
    expect(component.editService).toHaveBeenCalledWith('test-service');

    component.handleAction({ action: 'delete', row: { id: 'test-service' } });
    expect(component.deleteService).toHaveBeenCalledWith('test-service');
  });
});
