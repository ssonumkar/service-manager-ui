import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { OwnerFormComponent } from './owner-form';
import { OwnerApiService } from '../../services/owner.service';
import { ConfigLoaderService } from '../../config/config-loader';
import { FORM_FIELD_CONFIG } from '../../config/form-field-config';
import { Owner } from '../../models/owner.model';

describe('OwnerFormComponent', () => {
  let component: OwnerFormComponent;
  let fixture: ComponentFixture<OwnerFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockOwnerApi: jasmine.SpyObj<OwnerApiService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockConfigLoader: jasmine.SpyObj<ConfigLoaderService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockOwnerApi = jasmine.createSpyObj('OwnerApiService', ['create']);
    mockConfigLoader = jasmine.createSpyObj('ConfigLoaderService', ['loadConfig']);
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
        { provide: ConfigLoaderService, useValue: mockConfigLoader }
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
  });

  it('should initialize form with required id field', () => {
    expect(component.form.get('id')).toBeTruthy();
    expect(component.form.get('id')?.hasValidator(Validators.required)).toBeTrue();
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

      expect(console.error).toHaveBeenCalledWith('Error creating service:', error);
    });
  });

  describe('closeModal', () => {
    it('should set showModal to false and navigate', () => {
      component.closeModal();

      expect(component.showModal).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner', 'test-service', 'test-resource', 'edit']);
    });
  });
});
