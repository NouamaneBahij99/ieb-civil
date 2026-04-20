import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjetService } from '../../../core/services/projet.service';
import { ServiceCivilService } from '../../../core/services/service-civil.service';
import { MessageService } from '../../../core/services/message.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
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
            @if (nbMessages() > 0) { <span class="badge">{{ nbMessages() }}</span> }
          </a>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="site-link">← Site public</a>
          <button (click)="logout()" class="logout-btn">🚪 Déconnexion</button>
        </div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Bienvenue, <strong>{{ username() }}</strong> — {{ today }}</p>
          </div>
        </div>
        <div class="stats-grid">
          <div class="stat-card blue">
            <div class="stat-icon">🏗️</div>
            <div class="stat-info"><strong>{{ nbProjets() }}</strong><span>Projets</span></div>
            <a routerLink="/admin/projets" class="stat-link">Gérer →</a>
          </div>
          <div class="stat-card purple">
            <div class="stat-icon">🔧</div>
            <div class="stat-info"><strong>{{ nbServices() }}</strong><span>Services</span></div>
            <a routerLink="/admin/services" class="stat-link">Gérer →</a>
          </div>
          <div class="stat-card orange">
            <div class="stat-icon">✉️</div>
            <div class="stat-info"><strong>{{ nbMessages() }}</strong><span>Messages</span></div>
            <a routerLink="/admin/messages" class="stat-link">Voir →</a>
          </div>
          <div class="stat-card green">
            <div class="stat-icon">✅</div>
            <div class="stat-info"><strong>100%</strong><span>Disponibilité</span></div>
            <span class="stat-link">En ligne</span>
          </div>
        </div>
        <div class="section">
          <h2>Actions rapides</h2>
          <div class="actions-grid">
            <a routerLink="/admin/projets" class="action-card"><span>➕</span><strong>Ajouter un projet</strong><p>Publier un nouveau chantier</p></a>
            <a routerLink="/admin/services" class="action-card"><span>🔧</span><strong>Gérer les services</strong><p>Ajouter ou modifier</p></a>
            <a routerLink="/admin/messages" class="action-card"><span>✉️</span><strong>Voir les messages</strong><p>{{ nbMessages() }} message(s) reçu(s)</p></a>
            <a routerLink="/" class="action-card"><span>🌐</span><strong>Voir le site</strong><p>Prévisualiser le site public</p></a>
          </div>
        </div>
        <div class="section">
          <h2>État du système</h2>
          <div class="system-grid">
            <div class="system-card"><div class="system-status online"></div><div><strong>Backend Spring Boot</strong><span>localhost:8080 — Opérationnel</span></div></div>
            <div class="system-card"><div class="system-status online"></div><div><strong>Base de données PostgreSQL</strong><span>civil_db — Connectée</span></div></div>
            <div class="system-card"><div class="system-status online"></div><div><strong>Frontend Angular</strong><span>localhost:4200 — En ligne</span></div></div>
            <div class="system-card"><div class="system-status online"></div><div><strong>Authentification JWT</strong><span>Sécurisée — Active</span></div></div>
          </div>
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
    .topbar { margin-bottom: 2rem; }
    .topbar h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a2e; }
    .topbar p { color: #64748b; font-size: 0.9rem; margin-top: 0.25rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: white; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-top: 4px solid; }
    .stat-card.blue { border-color: #1976d2; } .stat-card.purple { border-color: #7c3aed; } .stat-card.orange { border-color: #f59e0b; } .stat-card.green { border-color: #10b981; }
    .stat-icon { font-size: 2rem; }
    .stat-info strong { display: block; font-size: 2rem; font-weight: 800; color: #1a1a2e; line-height: 1; }
    .stat-info span { color: #64748b; font-size: 0.9rem; }
    .stat-link { color: #1976d2; text-decoration: none; font-size: 0.85rem; font-weight: 600; }
    .section { margin-bottom: 2rem; }
    .section h2 { font-size: 1.25rem; font-weight: 700; color: #1a1a2e; margin-bottom: 1.25rem; }
    .actions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
    .action-card { background: white; border-radius: 12px; padding: 1.5rem; text-decoration: none; color: inherit; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; gap: 0.4rem; border: 1px solid #e2e8f0; }
    .action-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: #1976d2; }
    .action-card span { font-size: 2rem; } .action-card strong { font-size: 0.95rem; color: #1a1a2e; } .action-card p { font-size: 0.8rem; color: #64748b; margin: 0; }
    .system-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .system-card { background: white; border-radius: 12px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .system-status { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .system-status.online { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
    .system-card div strong { display: block; font-size: 0.9rem; color: #1a1a2e; }
    .system-card div span { font-size: 0.8rem; color: #64748b; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  nbProjets = signal(0);
  nbServices = signal(0);
  nbMessages = signal(0);
  username = signal('');
  today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor(
    private projetService: ProjetService,
    private serviceCivilService: ServiceCivilService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.projetService.getAllProjets().subscribe(p => this.nbProjets.set(p.totalElements));
    this.serviceCivilService.getAllServices().subscribe(s => this.nbServices.set(s.totalElements));
    this.messageService.getMessages().subscribe(m => this.nbMessages.set(m.length));
    this.username.set(this.authService.currentUser()?.username || 'Admin');
  }

  logout() { this.authService.logout(); }
}
