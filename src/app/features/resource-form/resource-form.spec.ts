import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ResourceFormComponent } from './resource-form';
import { ResourceApiService } from '../../services/resource-api.service';
import { Resource } from '../../models/resource.model';

describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;
  let fixture: ComponentFixture<ResourceFormComponent>;
  let mockResourceApi: jasmine.SpyObj<ResourceApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const mockResource: Resource = {
    id: 'test-resource',
    serviceId: 'test-service',
    owners: []
  };

  beforeEach(async () => {
    mockResourceApi = jasmine.createSpyObj('ResourceApiService', ['create']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ serviceId: 'test-service' })
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [ResourceFormComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ResourceApiService, useValue: mockResourceApi },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields and service ID on init', () => {
    component.ngOnInit();
    expect(component.formFields).toBeDefined();
    expect(component.formFields.length).toBeGreaterThan(0);
    expect(component.serviceId).toBe('test-service');
  });

  it('should create resource and navigate on successful submit', () => {
    mockResourceApi.create.and.returnValue(of(mockResource));
    
    const formData: Resource = {
      id: 'test-resource',
      serviceId: 'test-service',
      owners: []
    };
    component.handleSubmit(formData);
    
    expect(mockResourceApi.create).toHaveBeenCalledWith(formData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/resource', 'test-service', 'edit']);
  });

  it('should handle error on resource creation failure', () => {
    const error = new Error('Creation failed');
    mockResourceApi.create.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    
    const formData: Resource = {
      id: 'test-resource',
      serviceId: 'test-service',
      owners: []
    };
    component.handleSubmit(formData);
    
    expect(console.error).toHaveBeenCalledWith('Error creating service:', error);
  });

  it('should close modal and navigate', () => {
    component.closeModal();
    
    expect(component.showModal).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/resource', 'test-service', 'edit']);
  });
});
