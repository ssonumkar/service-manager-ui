import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ServiceFormComponent } from './service-form';
import { ServiceApiService } from '../../services/service-api.service';
import { Service } from '../../models/service.model';

describe('ServiceFormComponent', () => {
  let component: ServiceFormComponent;
  let fixture: ComponentFixture<ServiceFormComponent>;
  let mockServiceApi: jasmine.SpyObj<ServiceApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const mockService: Service = {
    id: 'test-service',
    resources: []
  };

  beforeEach(async () => {
    mockServiceApi = jasmine.createSpyObj('ServiceApiService', ['createService']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({})
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [ServiceFormComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ServiceApiService, useValue: mockServiceApi },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields on init', () => {
    component.ngOnInit();
    expect(component.formFields).toBeDefined();
    expect(component.formFields.length).toBeGreaterThan(0);
  });

  it('should create service and navigate on successful submit', () => {
    mockServiceApi.createService.and.returnValue(of(mockService));
    
    component.handleSubmit(mockService);
    
    expect(mockServiceApi.createService).toHaveBeenCalledWith(mockService);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/services']);
  });

  it('should handle error on service creation failure', () => {
    const error = new Error('Creation failed');
    mockServiceApi.createService.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    
    component.handleSubmit(mockService);
    
    expect(console.error).toHaveBeenCalledWith('Error creating service:', error);
  });

  it('should close modal and navigate', () => {
    component.closeModal();
    
    expect(component.showModal).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/services']);
  });
});
