import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/projet.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly PUBLIC_API = 'http://localhost:8080/api/public';
  private readonly ADMIN_API = 'http://localhost:8080/api/admin';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  envoyerMessage(message: Omit<Message, 'id'>): Observable<Message> {
    return this.http.post<Message>(
      `${this.PUBLIC_API}/message`,
      JSON.stringify(message),
      { headers: this.headers }
    );
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.ADMIN_API}/messages`);
  }

  supprimerMessage(id: number): Observable<any> {
    return this.http.delete(`${this.ADMIN_API}/messages/${id}`);
  }
}
