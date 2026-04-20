import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceCivilService } from '../../core/services/service-civil.service';
import { Page } from '../../core/services/projet.service';
import { ServiceCivil } from '../../core/models/projet.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page">
      <nav class="navbar">
        <div class="nav-inner">
          <a routerLink="/" class="brand">
            <span class="brand-icon">🏗️</span>
            <div class="brand-text">
              <span class="brand-name">Bureau d'Etudes IEB</span>
              <span class="brand-sub">Génie Civil & Infrastructure</span>
            </div>
          </a>
          <div class="nav-links">
            <a routerLink="/projets">Projets</a>
            <a routerLink="/services" class="active">Services</a>
            <a routerLink="/about">À propos</a>
            <a routerLink="/contact">Contact</a>
            <a routerLink="/contact" class="btn-devis">Devis Gratuit</a>
          </div>
        </div>
      </nav>

      <header class="hero">
        <div class="hero-content">
          <span class="badge">Ce que nous faisons</span>
          <h1>Nos Services</h1>
          <p>Des solutions professionnelles pour tous vos projets de génie civil</p>
        </div>
      </header>

      <main class="main">
        <div class="search-bar">
          <div class="search-input">
            <span class="search-icon">🔍</span>
            <input [(ngModel)]="searchQuery" (ngModelChange)="onSearch()" placeholder="Rechercher un service..." />
            @if (searchQuery) { <button class="clear-btn" (click)="clearSearch()">✕</button> }
          </div>
          <span class="results-count">{{ page()?.totalElements || 0 }} service(s)</span>
        </div>

        <div class="grid">
          @for (service of services(); track service.id; let i = $index) {
            <div class="card">
              <div class="card-top" [class]="'top-' + (i % 4)">
                <div class="card-icon">{{ icons[i % icons.length] }}</div>
                <span class="card-num">0{{ i + 1 }}</span>
              </div>
              <div class="card-body">
                <h3>{{ service.nom }}</h3>
                <p>{{ service.description }}</p>
                <a routerLink="/contact" class="card-link">Demander un devis →</a>
              </div>
            </div>
          }
          @empty {
            <div class="empty"><span>🔍</span><p>Aucun service trouvé</p></div>
          }
        </div>

        @if (page() && page()!.totalPages > 1) {
          <div class="pagination">
            <button class="page-btn" [disabled]="currentPage() === 0" (click)="goToPage(currentPage() - 1)">← Précédent</button>
            @for (p of getPages(); track p) {
              <button class="page-btn" [class.active]="p === currentPage()" (click)="goToPage(p)">{{ p + 1 }}</button>
            }
            <button class="page-btn" [disabled]="currentPage() === page()!.totalPages - 1" (click)="goToPage(currentPage() + 1)">Suivant →</button>
          </div>
        }

        <div class="cta">
          <div class="cta-content">
            <h2>Vous avez un projet ?</h2>
            <p>Contactez-nous pour obtenir un devis gratuit et personnalisé sous 48h</p>
          </div>
          <a routerLink="/contact" class="cta-btn">Nous contacter</a>
        </div>
      </main>

      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-brand"><span>🏗️</span><span>Bureau d'Etudes IEB</span></div>
          <div class="footer-links">
            <a routerLink="/projets">Projets</a>
            <a routerLink="/services">Services</a>
            <a routerLink="/about">À propos</a>
            <a routerLink="/contact">Contact</a>
          </div>
          <p class="footer-copy">© 2024 Bureau d'Etudes IEB — Casablanca, Maroc</p>
        </div>
      </footer>

      <a href="https://wa.me/212600000000" target="_blank" class="whatsapp-btn">💬</a>
    </div>
  `,
  styles: [`
    .page { min-height: 100vh; display: flex; flex-direction: column; }
    .navbar { background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; height: 70px; }
    .brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
    .brand-icon { font-size: 2rem; }
    .brand-text { display: flex; flex-direction: column; }
    .brand-name { font-weight: 700; font-size: 1rem; color: #0d47a1; line-height: 1.2; }
    .brand-sub { font-size: 0.72rem; color: #64748b; }
    .nav-links { display: flex; align-items: center; gap: 1.75rem; }
    .nav-links a { text-decoration: none; color: #374151; font-weight: 500; font-size: 0.9rem; transition: color 0.2s; }
    .nav-links a:hover, .nav-links a.active { color: #0d47a1; }
    .btn-devis { background: #0d47a1 !important; color: white !important; padding: 0.55rem 1.25rem; border-radius: 8px; font-weight: 600 !important; }

    .hero { background: linear-gradient(135deg, #071e3d 0%, #0d47a1 50%, #1976d2 100%); color: white; padding: 5rem 1.5rem; text-align: center; }
    .hero-content { max-width: 700px; margin: 0 auto; }
    .badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.25); }
    .hero h1 { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; }
    .hero p { font-size: 1.1rem; opacity: 0.85; }

    .main { flex: 1; max-width: 1200px; margin: 0 auto; width: 100%; padding: 2.5rem 1.5rem; }
    .search-bar { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
    .search-input { flex: 1; display: flex; align-items: center; background: white; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 0 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .search-input:focus-within { border-color: #0d47a1; }
    .search-icon { color: #94a3b8; margin-right: 0.5rem; }
    .search-input input { flex: 1; border: none; outline: none; padding: 0.85rem 0; font-size: 0.95rem; font-family: inherit; }
    .clear-btn { background: none; border: none; cursor: pointer; color: #94a3b8; }
    .results-count { color: #64748b; font-size: 0.9rem; white-space: nowrap; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; border: 1px solid #f1f5f9; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 12px 28px rgba(0,0,0,0.1); border-color: #bfdbfe; }
    .card-top { padding: 2rem 2rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
    .top-0 { background: linear-gradient(135deg, #dbeafe, #eff6ff); }
    .top-1 { background: linear-gradient(135deg, #ede9fe, #f5f3ff); }
    .top-2 { background: linear-gradient(135deg, #dcfce7, #f0fdf4); }
    .top-3 { background: linear-gradient(135deg, #fef3c7, #fffbeb); }
    .card-icon { font-size: 2.5rem; }
    .card-num { font-size: 2rem; font-weight: 800; color: rgba(0,0,0,0.06); }
    .card-body { padding: 1.25rem 2rem 2rem; display: flex; flex-direction: column; gap: 0.6rem; }
    .card-body h3 { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; }
    .card-body p { color: #64748b; font-size: 0.9rem; line-height: 1.65; flex: 1; }
    .card-link { color: #0d47a1; text-decoration: none; font-weight: 600; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.25rem; margin-top: 0.5rem; }
    .card-link:hover { text-decoration: underline; }

    .empty { grid-column: 1/-1; text-align: center; padding: 4rem; color: #94a3b8; }
    .empty span { font-size: 3rem; display: block; margin-bottom: 1rem; }

    .pagination { display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; }
    .page-btn { padding: 0.6rem 1rem; border: 1.5px solid #e2e8f0; background: white; border-radius: 8px; cursor: pointer; font-size: 0.9rem; }
    .page-btn.active { background: #0d47a1; color: white; border-color: #0d47a1; }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .cta { background: linear-gradient(135deg, #0d47a1, #1565c0); color: white; border-radius: 14px; padding: 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap; }
    .cta-content h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.4rem; }
    .cta-content p { opacity: 0.85; font-size: 0.95rem; }
    .cta-btn { display: inline-block; background: #ffd54f; color: #0d47a1; padding: 0.85rem 2rem; border-radius: 10px; text-decoration: none; font-weight: 700; white-space: nowrap; }

    .footer { background: #071e3d; color: #64748b; padding: 2rem 1.5rem; }
    .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .footer-brand { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: white; }
    .footer-links { display: flex; gap: 2rem; }
    .footer-links a { color: #64748b; text-decoration: none; font-size: 0.9rem; }
    .footer-links a:hover { color: white; }
    .footer-copy { font-size: 0.8rem; }

    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 56px; height: 56px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; text-decoration: none; box-shadow: 0 4px 20px rgba(37,211,102,0.4); z-index: 999; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); } 50% { box-shadow: 0 4px 30px rgba(37,211,102,0.7); } }
  `]
})
export class ServicesComponent implements OnInit {
  services = signal<ServiceCivil[]>([]);
  page = signal<Page<ServiceCivil> | null>(null);
  currentPage = signal(0);
  searchQuery = '';
  icons = ['🏗️', '🛣️', '🏠', '🌉', '💧', '🔧', '📐', '⚡'];
  private searchTimeout: any;

  constructor(private serviceCivilService: ServiceCivilService) {}
  ngOnInit() { this.charger(); }

  charger() {
    this.serviceCivilService.getServices(this.currentPage(), 6, this.searchQuery).subscribe(p => {
      this.page.set(p);
      this.services.set(p.content);
    });
  }

  onSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => { this.currentPage.set(0); this.charger(); }, 300);
  }

  clearSearch() { this.searchQuery = ''; this.currentPage.set(0); this.charger(); }
  goToPage(p: number) { this.currentPage.set(p); this.charger(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  getPages(): number[] { return Array.from({ length: this.page()?.totalPages || 0 }, (_, i) => i); }
}
