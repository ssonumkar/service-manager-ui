import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Resource } from "../models/resource.model";
import { Service } from "../models/service.model";

@Injectable({ providedIn: "root" })
export class ResourceApiService {
    private baseUrl = `${environment.serviceApiUrl}/resource`;
    
    constructor(private http: HttpClient) {}

    getResourcesByServiceId(serviceId: string): Observable<Resource[]> {
        return this.http.get<Resource[]>(`${this.baseUrl}/by-service/${serviceId}`);
    }

    // getResourceById(resourceId: string): Observable<Resource> {
    //     return this.http.get<Resource>(`${this.baseUrl}/${resourceId}`);
    // }

    create(resource: Resource): Observable<Resource> {
        return this.http.post<Resource>(this.baseUrl, resource);
    }

    update(resource: Resource): Observable<Resource> {
        return this.http.put<Resource>(this.baseUrl, resource);
    }

    delete(resourceId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${resourceId}`);
    }
}