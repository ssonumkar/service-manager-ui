import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Service } from "../models/service.model";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../environments/environment";

@Injectable({providedIn: "root"})
export class ServiceApiService {
    private baseUrl = `${environment.serviceApiUrl}/service`;
    constructor(private http: HttpClient) {}
    
    getServices() {
        return this.http.get<Service[]>(this.baseUrl);
    }
    getServiceById(serviceId: string): Observable<Service> {
        return this.http.get<Service>(`${this.baseUrl}/${serviceId}`);  
    }
    createService(service: Service): Observable<Service> {
        return this.http.post<Service>(this.baseUrl, service);
    }

    updateService(service: Service): Observable<Service> {
        return this.http.put<Service>(this.baseUrl, service);
    }

    deleteService(serviceId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${serviceId}`);
    }
}