import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { loadProjets } from '../../store/projets/projet.actions';
import { selectProjets, selectProjetPage, selectProjetsLoading } from '../../store/projets/projet.selectors';
import { Projet } from '../../core/models/projet.model';
import { Page } from '../../core/services/projet.service';

@Component({
  selector: 'app-projets',
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
            <a routerLink="/projets" class="active">Projets</a>
            <a routerLink="/services">Services</a>
            <a routerLink="/about">À propos</a>
            <a routerLink="/contact">Contact</a>
            <a routerLink="/contact" class="btn-devis">Devis Gratuit</a>
          </div>
        </div>
      </nav>

      <header class="hero">
        <div class="hero-content">
          <span class="badge">Nos Réalisations</span>
          <h1>Projets de Génie Civil</h1>
          <p>Découvrez nos chantiers et réalisations à travers le Maroc</p>
        </div>
      </header>

      <main class="main">
        <div class="search-bar">
          <div class="search-input">
            <span class="search-icon">🔍</span>
            <input [(ngModel)]="searchQuery" (ngModelChange)="onSearch($event)" placeholder="Rechercher un projet..." />
            @if (searchQuery) { <button class="clear-btn" (click)="clearSearch()">✕</button> }
          </div>
          <span class="results-count">{{ (page$ | async)?.totalElements || 0 }} projet(s)</span>
        </div>

        @if (loading$ | async) {
          <div class="loading"><div class="spinner"></div><p>Chargement...</p></div>
        } @else {
          <div class="grid">
            @for (projet of projets$ | async; track projet.id) {
              <div class="card">
                <div class="card-img">
                  @if (projet.imagePath) {
                    <img [src]="'http://localhost:8080' + projet.imagePath" [alt]="projet.titre" />
                  } @else {
                    <div class="card-placeholder">🏗️</div>
                  }
                  <div class="card-overlay"><span class="card-tag">Génie Civil</span></div>
                </div>
                <div class="card-body">
                  <h3>{{ projet.titre }}</h3>
                  <p>{{ projet.description }}</p>
                  <a routerLink="/contact" class="card-link">En savoir plus →</a>
                </div>
              </div>
            }
            @empty {
              <div class="empty"><span>🔍</span><p>Aucun projet trouvé</p></div>
            }
          </div>

          @if ((page$ | async)?.totalPages! > 1) {
            <div class="pagination">
              <button class="page-btn" [disabled]="currentPage === 0" (click)="goToPage(currentPage - 1)">← Précédent</button>
              @for (p of getPages(); track p) {
                <button class="page-btn" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p + 1 }}</button>
              }
              <button class="page-btn" [disabled]="currentPage === (page$ | async)?.totalPages! - 1" (click)="goToPage(currentPage + 1)">Suivant →</button>
            </div>
          }
        }
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
    .loading { display: flex; flex-direction: column; align-items: center; padding: 4rem; gap: 1rem; }
    .spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #0d47a1; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
    .card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 12px 28px rgba(0,0,0,0.12); }
    .card-img { position: relative; height: 230px; overflow: hidden; }
    .card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
    .card:hover .card-img img { transform: scale(1.06); }
    .card-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #dbeafe, #eff6ff); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,30,61,0.6) 0%, transparent 50%); display: flex; align-items: flex-end; padding: 1rem; }
    .card-tag { background: rgba(255,255,255,0.15); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 500; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px); }
    .card-body { padding: 1.5rem; }
    .card-body h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.5rem; }
    .card-body p { color: #64748b; font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem; }
    .card-link { color: #0d47a1; text-decoration: none; font-weight: 600; font-size: 0.85rem; }
    .pagination { display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; }
    .page-btn { padding: 0.6rem 1rem; border: 1.5px solid #e2e8f0; background: white; border-radius: 8px; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .page-btn.active { background: #0d47a1; color: white; border-color: #0d47a1; }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .empty { grid-column: 1/-1; text-align: center; padding: 4rem; color: #94a3b8; }
    .empty span { font-size: 3rem; display: block; margin-bottom: 1rem; }
    .footer { background: #071e3d; color: #64748b; padding: 2rem 1.5rem; }
    .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .footer-brand { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: white; }
    .footer-links { display: flex; gap: 2rem; }
    .footer-links a { color: #64748b; text-decoration: none; font-size: 0.9rem; }
    .footer-copy { font-size: 0.8rem; }
    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 56px; height: 56px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; text-decoration: none; box-shadow: 0 4px 20px rgba(37,211,102,0.4); z-index: 999; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); } 50% { box-shadow: 0 4px 30px rgba(37,211,102,0.7); } }
  `]
})
export class ProjetsComponent implements OnInit, OnDestroy {
  projets$: Observable<Projet[]>;
  page$: Observable<Page<Projet> | null>;
  loading$: Observable<boolean>;

  currentPage = 0;
  searchQuery = '';
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(private store: Store) {
    this.projets$ = this.store.select(selectProjets);
    this.page$ = this.store.select(selectProjetPage);
    this.loading$ = this.store.select(selectProjetsLoading);
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(search => {
      this.currentPage = 0;
      this.store.dispatch(loadProjets({ page: 0, size: 6, search }));
    });
    this.charger();
  }

  charger() {
    this.store.dispatch(loadProjets({ page: this.currentPage, size: 6, search: this.searchQuery }));
  }

  onSearch(value: string) { this.searchSubject.next(value); }
  clearSearch() { this.searchQuery = ''; this.searchSubject.next(''); }
  goToPage(p: number) { this.currentPage = p; this.charger(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  getPages(): number[] {
    const total = this.store.selectSignal(selectProjetPage)()?.totalPages || 0;
    return Array.from({ length: total }, (_, i) => i);
  }
  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
