import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Service } from "../models/service.model";
import { Observable } from "rxjs/internal/Observable";

@Injectable({providedIn: "root"})
export class ServiceApiService {
    baseUrl = "/api/services";
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
        return this.http.put<Service>(`${this.baseUrl}/${service.id}`, service);
    }

    deleteService(serviceId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${serviceId}`);
    }
}