import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Owner } from "../models/owner.model";

@Injectable ({ providedIn: "root" })
export class OwnerApiService {
    private baseUrl = `${environment.serviceApiUrl}/owner`;
    
    constructor(private http: HttpClient) {}

    getOwners(): Observable<Owner[]> {
        return this.http.get<Owner[]>(this.baseUrl);
    }

    getOwnersByResourceId(resourceId: string): Observable<Owner[]> {
        return this.http.get<Owner[]>(`${this.baseUrl}/by-resource/${resourceId}`);
    }

    getOwnerById(ownerId: string): Observable<Owner> {
        return this.http.get<Owner>(`${this.baseUrl}/${ownerId}`);
    }

    create(owner: Owner): Observable<Owner> {
        return this.http.post<Owner>(this.baseUrl, owner);
    }

    update(owner: Owner): Observable<Owner> {
        return this.http.put<Owner>(this.baseUrl, owner);
    }

    delete(ownerId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${ownerId}`);
    }
}   