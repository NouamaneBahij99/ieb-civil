import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageService } from '../../../core/services/message.service';
import { AuthService } from '../../../core/services/auth.service';
import { Message } from '../../../core/models/projet.model';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-brand"><span>🏗️</span><span>IEB Admin</span></div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active"><span>📊</span> Dashboard</a>
          <a routerLink="/admin/projets" routerLinkActive="active"><span>🏗️</span> Projets</a>
          <a routerLink="/admin/services" routerLinkActive="active"><span>🔧</span> Services</a>
          <a routerLink="/admin/messages" routerLinkActive="active"><span>✉️</span> Messages
            @if (messages().length > 0) { <span class="badge">{{ messages().length }}</span> }
          </a>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="site-link">← Site public</a>
          <button (click)="logout()" class="logout-btn">🚪 Déconnexion</button>
        </div>
      </aside>

      <main class="main">
        <div class="topbar"><h1>Messages reçus</h1></div>

        <div class="card">
          <h3>{{ messages().length }} message(s)</h3>
          @if (messages().length === 0) {
            <div class="empty-state">
              <span>📭</span>
              <p>Aucun message pour le moment</p>
            </div>
          } @else {
            <div class="messages-list">
              @for (m of messages(); track m.id) {
                <div class="message-card">
                  <div class="message-header">
                    <div class="avatar">{{ m.nomExpediteur[0].toUpperCase() }}</div>
                    <div class="message-meta">
                      <strong>{{ m.nomExpediteur }}</strong>
                      <span>{{ m.email }}</span>
                    </div>
                    <button class="btn-delete" (click)="supprimer(m.id!)">🗑️ Supprimer</button>
                  </div>
                  <div class="message-body">{{ m.contenu }}</div>
                </div>
              }
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard { display: flex; min-height: 100vh; background: #f1f5f9; }
    .sidebar { width: 260px; background: #0a1628; color: white; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; }
    .sidebar-brand { display: flex; align-items: center; gap: 0.75rem; padding: 1.5rem; font-size: 1.2rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .sidebar-nav { flex: 1; padding: 1rem 0; }
    .sidebar-nav a { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1.5rem; color: #94a3b8; text-decoration: none; font-weight: 500; transition: all 0.2s; }
    .sidebar-nav a:hover { background: rgba(255,255,255,0.05); color: white; }
    .sidebar-nav a.active { background: rgba(25,118,210,0.2); color: #60a5fa; border-right: 3px solid #1976d2; }
    .badge { background: #ef4444; color: white; border-radius: 10px; padding: 0.1rem 0.5rem; font-size: 0.7rem; font-weight: 700; margin-left: auto; }
    .sidebar-footer { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 0.75rem; }
    .site-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
    .logout-btn { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.2); padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem; text-align: left; }
    .main { flex: 1; margin-left: 260px; padding: 2rem; }
    .topbar { margin-bottom: 1.5rem; }
    .topbar h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a2e; }
    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem; color: #1a1a2e; }
    .empty-state { text-align: center; padding: 3rem; color: #9ca3af; }
    .empty-state span { font-size: 3rem; display: block; margin-bottom: 1rem; }
    .messages-list { display: flex; flex-direction: column; gap: 1rem; }
    .message-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; transition: box-shadow 0.2s; }
    .message-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .message-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #1976d2, #42a5f5); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
    .message-meta { flex: 1; }
    .message-meta strong { display: block; font-size: 0.95rem; color: #1a1a2e; }
    .message-meta span { font-size: 0.85rem; color: #6b7280; }
    .btn-delete { padding: 0.4rem 0.8rem; background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; border-radius: 6px; cursor: pointer; font-size: 0.8rem; white-space: nowrap; }
    .btn-delete:hover { background: #fee2e2; }
    .message-body { background: #f9fafb; border-radius: 8px; padding: 0.85rem 1rem; color: #374151; font-size: 0.9rem; line-height: 1.6; }
  `]
})
export class AdminMessagesComponent implements OnInit {
  messages = signal<Message[]>([]);
  constructor(private messageService: MessageService, private authService: AuthService) {}
  ngOnInit() { this.messageService.getMessages().subscribe(m => this.messages.set(m)); }
  supprimer(id: number) {
    if (confirm('Supprimer ?')) this.messageService.supprimerMessage(id).subscribe(() => {
      this.messages.update(msgs => msgs.filter(m => m.id !== id));
    });
  }
  logout() { this.authService.logout(); }
}
