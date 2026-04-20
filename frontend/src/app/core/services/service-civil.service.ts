import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceCivil } from '../models/projet.model';
import { Page } from './projet.service';

@Injectable({ providedIn: 'root' })
export class ServiceCivilService {
  private readonly PUBLIC_API = 'http://localhost:8080/api/public';
  private readonly ADMIN_API = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getServices(page = 0, size = 6, search = ''): Observable<Page<ServiceCivil>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);
    return this.http.get<Page<ServiceCivil>>(`${this.PUBLIC_API}/services`, { params });
  }

  getAllServices(): Observable<Page<ServiceCivil>> {
    return this.getServices(0, 100);
  }

  creerService(service: Omit<ServiceCivil, 'id'>): Observable<ServiceCivil> {
    return this.http.post<ServiceCivil>(`${this.ADMIN_API}/services`, service);
  }

  modifierService(id: number, service: Omit<ServiceCivil, 'id'>): Observable<ServiceCivil> {
    return this.http.put<ServiceCivil>(`${this.ADMIN_API}/services/${id}`, service);
  }

  supprimerService(id: number): Observable<any> {
    return this.http.delete(`${this.ADMIN_API}/services/${id}`);
  }
}
