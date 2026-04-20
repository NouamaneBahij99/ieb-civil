import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceCivilService } from '../../../core/services/service-civil.service';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceCivil } from '../../../core/models/projet.model';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-brand"><span>🏗️</span><span>IEB Admin</span></div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active"><span>📊</span> Dashboard</a>
          <a routerLink="/admin/projets" routerLinkActive="active"><span>🏗️</span> Projets</a>
          <a routerLink="/admin/services" routerLinkActive="active"><span>🔧</span> Services</a>
          <a routerLink="/admin/messages" routerLinkActive="active"><span>✉️</span> Messages</a>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="site-link">← Site public</a>
          <button (click)="logout()" class="logout-btn">🚪 Déconnexion</button>
        </div>
      </aside>
      <main class="main">
        <div class="topbar"><h1>Gestion des services</h1></div>
        <div class="card">
          <h3>{{ editId() ? 'Modifier le service' : 'Nouveau service' }}</h3>
          <form (ngSubmit)="soumettre()" class="form">
            <div class="field"><label>Nom du service</label><input [(ngModel)]="nom" name="nom" placeholder="Ex: Terrassement" required /></div>
            <div class="field"><label>Description</label><textarea [(ngModel)]="description" name="description" placeholder="Description du service..." required></textarea></div>
            <div class="form-actions">
              <button type="submit" class="btn-primary">{{ editId() ? '✏️ Modifier' : '➕ Ajouter' }}</button>
              @if (editId()) { <button type="button" class="btn-secondary" (click)="reset()">Annuler</button> }
            </div>
          </form>
        </div>
        <div class="card">
          <h3>Liste des services ({{ services().length }})</h3>
          <table>
            <thead><tr><th>Nom</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
              @for (s of services(); track s.id) {
                <tr>
                  <td><strong>{{ s.nom }}</strong></td>
                  <td class="text-muted">{{ s.description }}</td>
                  <td>
                    <button class="btn-edit" (click)="editer(s)">✏️</button>
                    <button class="btn-delete" (click)="supprimer(s.id!)">🗑️</button>
                  </td>
                </tr>
              }
              @empty { <tr><td colspan="3" class="empty">Aucun service</td></tr> }
            </tbody>
          </table>
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
    .sidebar-footer { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 0.75rem; }
    .site-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
    .logout-btn { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.2); padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem; text-align: left; }
    .main { flex: 1; margin-left: 260px; padding: 2rem; }
    .topbar { margin-bottom: 1.5rem; }
    .topbar h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a2e; }
    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
    .card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem; color: #1a1a2e; }
    .field { margin-bottom: 1rem; }
    .field label { display: block; font-size: 0.85rem; font-weight: 500; color: #374151; margin-bottom: 0.35rem; }
    input, textarea { width: 100%; padding: 0.65rem 0.9rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; }
    input:focus, textarea:focus { outline: none; border-color: #1976d2; }
    textarea { min-height: 100px; resize: vertical; }
    .form-actions { display: flex; gap: 0.75rem; }
    .btn-primary { padding: 0.6rem 1.25rem; background: #1976d2; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-secondary { padding: 0.6rem 1.25rem; background: #f1f5f9; color: #374151; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 0.75rem 1rem; text-align: left; font-size: 0.8rem; font-weight: 600; color: #6b7280; background: #f9fafb; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; }
    td { padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
    .text-muted { color: #6b7280; }
    .btn-edit, .btn-delete { padding: 0.4rem 0.6rem; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; margin-right: 0.25rem; }
    .btn-edit { background: #eff6ff; } .btn-delete { background: #fef2f2; }
    .empty { text-align: center; color: #9ca3af; padding: 2rem; }
  `]
})
export class AdminServicesComponent implements OnInit {
  services = signal<ServiceCivil[]>([]);
  nom = ''; description = '';
  editId = signal<number | null>(null);

  constructor(private serviceCivilService: ServiceCivilService, private authService: AuthService) {}
  ngOnInit() { this.charger(); }
  charger() { this.serviceCivilService.getAllServices().subscribe(s => this.services.set(s.content)); }
  soumettre() {
    const data = { nom: this.nom, description: this.description };
    const op = this.editId() ? this.serviceCivilService.modifierService(this.editId()!, data) : this.serviceCivilService.creerService(data);
    op.subscribe(() => { this.charger(); this.reset(); });
  }
  editer(s: ServiceCivil) { this.editId.set(s.id!); this.nom = s.nom; this.description = s.description; }
  supprimer(id: number) { if (confirm('Supprimer ?')) this.serviceCivilService.supprimerService(id).subscribe(() => this.charger()); }
  logout() { this.authService.logout(); }
  reset() { this.nom = ''; this.description = ''; this.editId.set(null); }
}
