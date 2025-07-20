import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResourceApiService } from './resource-api.service';
import { Resource } from '../models/resource.model';
import { environment } from '../../environments/environment';
import { Owner } from '../models/owner.model';

describe('ResourceApiService', () => {
  let service: ResourceApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.serviceApiUrl}/resource`;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourceApiService]
    });
    service = TestBed.inject(ResourceApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getResourcesByServiceId', () => {
    it('should return resources for a specific service', () => {
      const serviceId = 'test-service';
      const mockResources: Resource[] = [mockResource];

      service.getResourcesByServiceId(serviceId).subscribe(resources => {
        expect(resources).toEqual(mockResources);
      });

      const req = httpMock.expectOne(`${baseUrl}/by-service/${serviceId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResources);
    });
  });

  describe('create', () => {
    it('should create a new resource', () => {
      service.create(mockResource).subscribe(resource => {
        expect(resource).toEqual(mockResource);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockResource);
      req.flush(mockResource);
    });
  });

  describe('update', () => {
    it('should update an existing resource', () => {
      service.update(mockResource).subscribe(resource => {
        expect(resource).toEqual(mockResource);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockResource);
      req.flush(mockResource);
    });
  });

  describe('delete', () => {
    it('should delete a resource', () => {
      const resourceId = 'test-resource';

      service.delete(resourceId).subscribe(() => {
        // Expect successful deletion
      });

      const req = httpMock.expectOne(`${baseUrl}/${resourceId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
