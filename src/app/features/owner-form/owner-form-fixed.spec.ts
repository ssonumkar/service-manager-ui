import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { OwnerFormComponent } from './owner-form';
import { OwnerApiService } from '../../services/owner.service';
import { FORM_FIELD_CONFIG } from '../../config/form-field-config';
import { Owner } from '../../models/owner.model';

describe('OwnerFormComponent', () => {
  let component: OwnerFormComponent;
  let fixture: ComponentFixture<OwnerFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockOwnerApi: jasmine.SpyObj<OwnerApiService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockOwnerApi = jasmine.createSpyObj('OwnerApiService', ['create', 'update', 'getOwnersByResourceId']);
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockActivatedRoute = {
      snapshot: {
          paramMap: convertToParamMap({
              resourceId: 'test-resource',
              serviceId: 'test-service'
          }),
          url: [],
          params: {},
          queryParams: {},
          fragment: null,
          data: {},
          outlet: '',
          component: null,
          routeConfig: null,
          title: undefined,
          root: new ActivatedRouteSnapshot,
          parent: null,
          firstChild: null,
          children: [],
          pathFromRoot: [],
          queryParamMap: convertToParamMap({})
      }
    };

    await TestBed.configureTestingModule({
      imports: [OwnerFormComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: OwnerApiService, useValue: mockOwnerApi },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields and route params on init', () => {
    component.ngOnInit();
    expect(component.formFields).toEqual(FORM_FIELD_CONFIG['ownerCreateForm']);
    expect(component.resourceId).toBe('test-resource');
    expect(component.serviceId).toBe('test-service');
    expect(component.showModal).toBeTrue();
    expect(component.modalTitle).toBe('Add Owner');
  });


  describe('handleSubmit', () => {
    const mockFormData: Owner = {
      id: 'test-id',
      resourceId: '',
      serviceId: '',
      name: 'Test Owner',
      accountNumber: 'ACC123',
      level: 1
    };

    it('should call ownerApi.create with correct data and navigate on success', () => {
      mockOwnerApi.create.and.returnValue(of({
        id: 'test-id',
        resourceId: 'test-resource',
        serviceId: 'test-service',
        name: 'Test Owner',
        accountNumber: 'ACC123',
        level: 1
      }));
      
      component.handleSubmit(mockFormData);

      expect(mockOwnerApi.create).toHaveBeenCalledWith({
        ...mockFormData,
        resourceId: 'test-resource',
        serviceId: 'test-service'
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner', 'test-service', 'test-resource', 'edit']);
    });

    it('should handle error when owner creation fails', () => {
      const error = new Error('Creation failed');
      mockOwnerApi.create.and.returnValue(throwError(() => error));
      spyOn(console, 'error');

      component.handleSubmit(mockFormData);

      expect(console.error).toHaveBeenCalledWith('Error creating owner:', error);
    });

    it('should call update API in edit mode', () => {
      const mockFormData: Owner = {
        id: 'test-owner-id',
        resourceId: 'test-resource',
        serviceId: 'test-service',
        name: 'Updated Owner',
        accountNumber: 'ACC999',
        level: 3
      };

      mockOwnerApi.update.and.returnValue(of(mockFormData));
      component.isEditMode = true;

      component.handleSubmit(mockFormData);

      expect(mockOwnerApi.update).toHaveBeenCalledWith(mockFormData);
    });
  });

  describe('closeModal', () => {
    it('should set showModal to false and navigate', () => {
      component.closeModal();

      expect(component.showModal).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner', 'test-service', 'test-resource', 'edit']);
    });
  });

  describe('Edit mode functionality', () => {
    it('should detect edit mode when ownerId is present', () => {
      component.ownerId = 'test-owner-id';
      component.ngOnInit();
      expect(component.isEditMode).toBeTrue();
      expect(component.modalTitle).toBe('Edit Owner');
    });

    it('should load and populate form with owner data in edit mode', () => {
      const mockOwners: Owner[] = [{
        id: 'test-owner-id',
        resourceId: 'test-resource',
        serviceId: 'test-service',
        name: 'Existing Owner',
        accountNumber: 'ACC456',
        level: 2
      }];

      mockOwnerApi.getOwnersByResourceId.and.returnValue(of(mockOwners));
      component.ownerId = 'test-owner-id';
      component.resourceId = 'test-resource';
      component.isEditMode = true;

      component.ngOnInit();

      expect(mockOwnerApi.getOwnersByResourceId).toHaveBeenCalledWith('test-resource');
      expect(component.currentOwner).toEqual(mockOwners[0]);
    });

    it('should prefill form fields with owner data in edit mode', () => {
      const mockOwner: Owner = {
        id: 'test-owner-id',
        resourceId: 'test-resource',
        serviceId: 'test-service',
        name: 'Existing Owner',
        accountNumber: 'ACC456',
        level: 2
      };

      component.formFields = FORM_FIELD_CONFIG['ownerCreateForm'];
      component.populateForm(mockOwner);

      const idField = component.formFields.find(f => f.name === 'id');
      const nameField = component.formFields.find(f => f.name === 'name');
      const accountField = component.formFields.find(f => f.name === 'accountNumber');
      const levelField = component.formFields.find(f => f.name === 'level');

      expect(idField?.value).toBe('test-owner-id');
      expect(nameField?.value).toBe('Existing Owner');
      expect(accountField?.value).toBe('ACC456');
      expect(levelField?.value).toBe('2'); // Should be string for select field
      expect(mockCdr.detectChanges).toHaveBeenCalled();
    });
  });
});
