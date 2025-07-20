import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { FooterButton } from '../shared/components/modal-footer/footer-button.model';
import { FormField } from '../shared/components/form/form-field.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class ConfigLoaderService {
  formFieldCache: { [key: string]: Observable<FormField[]> } = {};
  constructor(private http: HttpClient) {}

  getFormFields(entity: string): Observable<FormField[]> {
    if (this.formFieldCache[entity]) {
      return this.formFieldCache[entity];
    }
    return this.http.get<FormField[]>(`/assets/config/form-field-config.json`).pipe(
      map((data: any) => data[entity])
    );
  }

  getFooterButtons(configKey = 'default'): Observable<FooterButton[]> {
    return this.http.get<FooterButton[]>(`/assets/config/form-button-config.json`).pipe(
      map((data: any) => data[configKey])
    );
  }
}