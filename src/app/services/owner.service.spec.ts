import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OwnerApiService } from './owner.service';
import { Owner } from '../models/owner.model';
import { environment } from '../../environments/environment';

describe('OwnerApiService', () => {
  let service: OwnerApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.serviceApiUrl}/owner`;

  const mockOwner: Owner = {
    id: 'test-id',
    resourceId: 'test-resource',
    serviceId: 'test-service',
    name: 'Test Owner',
    accountNumber: 'ACC123',
    level: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OwnerApiService]
    });
    service = TestBed.inject(OwnerApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOwners', () => {
    it('should return an array of owners', () => {
      const mockOwners: Owner[] = [mockOwner];

      service.getOwners().subscribe(owners => {
        expect(owners).toEqual(mockOwners);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockOwners);
    });
  });

  describe('getOwnersByResourceId', () => {
    it('should return owners for a specific resource', () => {
      const resourceId = 'test-resource';
      const mockOwners: Owner[] = [mockOwner];

      service.getOwnersByResourceId(resourceId).subscribe(owners => {
        expect(owners).toEqual(mockOwners);
      });

      const req = httpMock.expectOne(`${baseUrl}/by-resource/${resourceId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockOwners);
    });
  });

  describe('getOwnerById', () => {
    it('should return a specific owner by id', () => {
      const ownerId = 'test-id';

      service.getOwnerById(ownerId).subscribe(owner => {
        expect(owner).toEqual(mockOwner);
      });

      const req = httpMock.expectOne(`${baseUrl}/${ownerId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockOwner);
    });
  });

  describe('create', () => {
    it('should create a new owner', () => {
      service.create(mockOwner).subscribe(owner => {
        expect(owner).toEqual(mockOwner);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockOwner);
      req.flush(mockOwner);
    });
  });

  describe('update', () => {
    it('should update an existing owner', () => {
      service.update(mockOwner).subscribe(owner => {
        expect(owner).toEqual(mockOwner);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockOwner);
      req.flush(mockOwner);
    });
  });

  describe('delete', () => {
    it('should delete an owner', () => {
      const ownerId = 'test-id';

      service.delete(ownerId).subscribe(() => {
        // Expect successful deletion
      });

      const req = httpMock.expectOne(`${baseUrl}/${ownerId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
