import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { OwnerListComponent } from './owner-list';
import { OwnerApiService } from '../../services/owner.service';
import { Owner } from '../../models/owner.model';

describe('OwnerListComponent', () => {
  let component: OwnerListComponent;
  let fixture: ComponentFixture<OwnerListComponent>;
  let mockOwnerApi: jasmine.SpyObj<OwnerApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const mockOwner: Owner = {
    id: 'test-owner',
    resourceId: 'test-resource',
    serviceId: 'test-service',
    name: 'Test Owner',
    accountNumber: 'ACC123',
    level: 1
  };

  beforeEach(async () => {
    mockOwnerApi = jasmine.createSpyObj('OwnerApiService', ['getOwnersByResourceId', 'delete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ 
          serviceId: 'test-service',
          resourceId: 'test-resource'
        })
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [OwnerListComponent],
      providers: [
        { provide: OwnerApiService, useValue: mockOwnerApi },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockCdr },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerListComponent);
    component = fixture.componentInstance;
    
    mockOwnerApi.getOwnersByResourceId.and.returnValue(of([mockOwner]));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load owners on init', () => {
    component.ngOnInit();
    expect(mockOwnerApi.getOwnersByResourceId).toHaveBeenCalledWith('test-resource');
    expect(component.owners).toEqual([mockOwner]);
  });

  it('should navigate to owner form on new owner', () => {
    component.onNewOwner();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner', 'test-service', 'test-resource', 'new']);
  });

  it('should navigate to edit owner', () => {
    component.editOwner(mockOwner);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner', 'test-service', 'test-resource', 'test-owner', 'edit']);
  });

  it('should delete owner after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockOwnerApi.delete.and.returnValue(of(undefined));
    
    component.deleteOwner('test-owner');
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOwnerApi.delete).toHaveBeenCalledWith('test-owner');
  });

  it('should not delete owner if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.deleteOwner('test-owner');
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOwnerApi.delete).not.toHaveBeenCalled();
  });

  it('should handle back navigation', () => {
    component.handleBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/resource', 'test-service', 'edit']);
  });

  it('should handle action events correctly', () => {
    spyOn(component, 'editOwner');
    spyOn(component, 'deleteOwner');

    component.handleAction({ action: 'edit', row: mockOwner });
    expect(component.editOwner).toHaveBeenCalledWith(mockOwner);

    component.handleAction({ action: 'delete', row: { id: 'test-owner' } });
    expect(component.deleteOwner).toHaveBeenCalledWith('test-owner');
  });
});
