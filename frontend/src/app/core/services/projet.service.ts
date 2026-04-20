import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet.model';

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class ProjetService {
  private readonly PUBLIC_API = 'http://localhost:8080/api/public';
  private readonly ADMIN_API = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getProjets(page = 0, size = 6, search = ''): Observable<Page<Projet>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);
    return this.http.get<Page<Projet>>(`${this.PUBLIC_API}/projets`, { params });
  }

  getAllProjets(): Observable<Page<Projet>> {
    return this.getProjets(0, 100);
  }

  creerProjet(formData: FormData): Observable<Projet> {
    return this.http.post<Projet>(`${this.ADMIN_API}/projets`, formData);
  }

  modifierProjet(id: number, formData: FormData): Observable<Projet> {
    return this.http.put<Projet>(`${this.ADMIN_API}/projets/${id}`, formData);
  }

  supprimerProjet(id: number): Observable<any> {
    return this.http.delete(`${this.ADMIN_API}/projets/${id}`);
  }
}
