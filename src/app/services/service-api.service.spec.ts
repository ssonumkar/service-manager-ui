import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceApiService } from './service-api.service';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';
import { Resource } from '../models/resource.model';
import { Owner } from '../models/owner.model';

describe('ServiceApiService', () => {
  let service: ServiceApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.serviceApiUrl}/service`;

  const mockOwner: Owner = {
    id: 'owner-id',
    resourceId: 'test-resource',
    serviceId: 'test-service',
    name: 'Test Owner',
    accountNumber: 'ACC123',
    level: 1
  };

  const mockResource: Resource = {
    id: 'test-resource',
    serviceId: 'test-service',
    owners: [mockOwner]
  };

  const mockService: Service = {
    id: 'test-service',
    resources: [mockResource]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceApiService]
    });
    service = TestBed.inject(ServiceApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getServices', () => {
    it('should return an array of services', () => {
      const mockServices: Service[] = [mockService];

      service.getServices().subscribe(services => {
        expect(services).toEqual(mockServices);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockServices);
    });
  });

  describe('getServiceById', () => {
    it('should return a specific service by id', () => {
      const serviceId = 'test-service';

      service.getServiceById(serviceId).subscribe(result => {
        expect(result).toEqual(mockService);
      });

      const req = httpMock.expectOne(`${baseUrl}/${serviceId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockService);
    });
  });

  describe('createService', () => {
    it('should create a new service', () => {
      service.createService(mockService).subscribe(result => {
        expect(result).toEqual(mockService);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockService);
      req.flush(mockService);
    });
  });

  describe('updateService', () => {
    it('should update an existing service', () => {
      service.updateService(mockService).subscribe(result => {
        expect(result).toEqual(mockService);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockService);
      req.flush(mockService);
    });
  });

  describe('deleteService', () => {
    it('should delete a service', () => {
      const serviceId = 'test-service';

      service.deleteService(serviceId).subscribe(() => {
        // Expect successful deletion
      });

      const req = httpMock.expectOne(`${baseUrl}/${serviceId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
