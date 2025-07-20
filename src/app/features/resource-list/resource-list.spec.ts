import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { ResourceListComponent } from './resource-list';
import { ResourceApiService } from '../../services/resource-api.service';
import { ServiceApiService } from '../../services/service-api.service';
import { Resource } from '../../models/resource.model';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;
  let mockResourceApi: jasmine.SpyObj<ResourceApiService>;
  let mockServiceApi: jasmine.SpyObj<ServiceApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const mockResource: Resource = {
    id: 'test-resource',
    serviceId: 'test-service',
    owners: []
  };

  beforeEach(async () => {
    mockResourceApi = jasmine.createSpyObj('ResourceApiService', ['getResourcesByServiceId', 'delete']);
    mockServiceApi = jasmine.createSpyObj('ServiceApiService', ['getServices']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: 'test-service' })
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [ResourceListComponent],
      providers: [
        { provide: ResourceApiService, useValue: mockResourceApi },
        { provide: ServiceApiService, useValue: mockServiceApi },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockCdr },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceListComponent);
    component = fixture.componentInstance;
    
    // Setup default mock responses
    mockResourceApi.getResourcesByServiceId.and.returnValue(of([mockResource]));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load resources on init', () => {
    component.ngOnInit();
    expect(mockResourceApi.getResourcesByServiceId).toHaveBeenCalledWith('test-service');
    expect(component.resources).toEqual([mockResource]);
  });

  it('should navigate to resource form on new service', () => {
    component.onNewService();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/resource/', 'test-service', 'new']);
  });

  it('should navigate to edit resource', () => {
    component.editResource(mockResource);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner', 'test-service', 'test-resource', 'edit']);
  });

  it('should delete resource after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockResourceApi.delete.and.returnValue(of(undefined));
    
    component.deleteResource('test-resource');
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockResourceApi.delete).toHaveBeenCalledWith('test-resource');
  });

  it('should not delete resource if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.deleteResource('test-resource');
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockResourceApi.delete).not.toHaveBeenCalled();
  });

  it('should handle back navigation', () => {
    component.handleBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/services']);
  });

  it('should handle action events correctly', () => {
    spyOn(component, 'editResource');
    spyOn(component, 'deleteResource');

    component.handleAction({ action: 'edit', row: mockResource });
    expect(component.editResource).toHaveBeenCalledWith(mockResource);

    component.handleAction({ action: 'delete', row: { id: 'test-resource' } });
    expect(component.deleteResource).toHaveBeenCalledWith('test-resource');
  });
});
