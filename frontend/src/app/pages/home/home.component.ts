import { Component, OnInit, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjetService } from '../../core/services/projet.service';
import { ServiceCivilService } from '../../core/services/service-civil.service';
import { Projet } from '../../core/models/projet.model';
import { ServiceCivil } from '../../core/models/projet.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">

      <!-- Navbar -->
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
            <a routerLink="/services">Services</a>
            <a routerLink="/about">À propos</a>
            <a routerLink="/contact">Contact</a>
            <a routerLink="/contact" class="btn-devis">Devis Gratuit</a>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-inner">
          <div class="hero-left">
            <span class="hero-badge">🏆 Bureau d'études certifié ISO 9001</span>
            <h1>Construisons<br><span class="highlight">l'avenir ensemble</span></h1>
            <p>Expertise en construction, terrassement, routes et infrastructures civiles depuis plus de 10 ans à Casablanca et partout au Maroc.</p>
            <div class="hero-actions">
              <a routerLink="/contact" class="btn-primary">Demander un devis gratuit</a>
              <a routerLink="/projets" class="btn-ghost">Voir nos projets →</a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <strong>+{{ animatedProjets }}</strong>
                <span>Projets réalisés</span>
              </div>
              <div class="stat-sep"></div>
              <div class="stat">
                <strong>{{ animatedYears }}+</strong>
                <span>Années d'expérience</span>
              </div>
              <div class="stat-sep"></div>
              <div class="stat">
                <strong>{{ animatedSatisf }}%</strong>
                <span>Clients satisfaits</span>
              </div>
            </div>
          </div>
          <div class="hero-right">
            <div class="hero-card">
              <div class="hc-icon">🏗️</div>
              <div class="hc-text"><strong>Chantier en cours</strong><span>Route Nationale — Casablanca</span></div>
              <span class="tag orange">En cours</span>
            </div>
            <div class="hero-card">
              <div class="hc-icon">✅</div>
              <div class="hc-text"><strong>Projet livré</strong><span>Pont autoroutier — Rabat</span></div>
              <span class="tag green">Livré</span>
            </div>
            <div class="hero-card gold">
              <div class="hc-icon">⭐</div>
              <div class="hc-text"><strong>Certifié ISO 9001</strong><span>Qualité garantie</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Partenaires -->
      <section class="partners">
        <div class="partners-inner">
          <p class="partners-label">Ils nous font confiance</p>
          <div class="partners-track">
            @for (p of partners; track p) {
              <div class="partner-item">{{ p }}</div>
            }
            @for (p of partners; track p) {
              <div class="partner-item">{{ p }}</div>
            }
          </div>
        </div>
      </section>

      <!-- Services -->
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Ce que nous faisons</span>
            <h2>Nos domaines d'expertise</h2>
            <p>Des solutions complètes pour tous vos besoins en génie civil</p>
          </div>
          <div class="services-grid">
            @for (s of services(); track s.id; let i = $index) {
              <div class="service-card">
                <div class="service-icon" [class]="'bg-' + (i % 4)">{{ serviceIcons[i % serviceIcons.length] }}</div>
                <h3>{{ s.nom }}</h3>
                <p>{{ s.description }}</p>
                <a routerLink="/contact" class="service-link">Demander un devis →</a>
              </div>
            }
            @empty {
              <div class="service-card"><div class="service-icon bg-0">🏗️</div><h3>Terrassement</h3><p>Préparation et nivellement du terrain</p></div>
              <div class="service-card"><div class="service-icon bg-1">🛣️</div><h3>Routes</h3><p>Construction et réhabilitation de voiries</p></div>
              <div class="service-card"><div class="service-icon bg-2">🏠</div><h3>Bâtiment</h3><p>Gros œuvre et second œuvre</p></div>
              <div class="service-card"><div class="service-icon bg-3">🌉</div><h3>Ouvrages d'art</h3><p>Ponts, viaducs et structures spéciales</p></div>
            }
          </div>
          <div class="section-cta"><a routerLink="/services">Voir tous nos services →</a></div>
        </div>
      </section>

      <!-- Projets -->
      <section class="section bg-gray">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Nos réalisations</span>
            <h2>Projets récents</h2>
            <p>Découvrez quelques-uns de nos derniers chantiers</p>
          </div>
          <div class="projets-grid">
            @for (p of projets().slice(0, 3); track p.id) {
              <div class="projet-card">
                <div class="projet-img">
                  @if (p.imagePath) {
                    <img [src]="'http://localhost:8080' + p.imagePath" [alt]="p.titre" />
                  } @else {
                    <div class="projet-placeholder">🏗️</div>
                  }
                  <div class="projet-overlay"></div>
                </div>
                <div class="projet-body">
                  <h3>{{ p.titre }}</h3>
                  <p>{{ p.description }}</p>
                </div>
              </div>
            }
          </div>
          <div class="section-cta"><a routerLink="/projets">Voir tous les projets →</a></div>
        </div>
      </section>

      <!-- Pourquoi nous -->
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Nos atouts</span>
            <h2>Pourquoi choisir Bureau d'Etudes IEB ?</h2>
          </div>
          <div class="why-grid">
            <div class="why-card"><span>🎯</span><h3>Expertise technique</h3><p>Ingénieurs certifiés avec plus de 10 ans d'expérience dans les grands projets d'infrastructure.</p></div>
            <div class="why-card"><span>⚡</span><h3>Délais respectés</h3><p>Nous nous engageons à livrer vos projets dans les délais convenus, sans compromis.</p></div>
            <div class="why-card"><span>💎</span><h3>Qualité premium</h3><p>Matériaux de haute qualité et contrôle rigoureux à chaque étape du chantier.</p></div>
            <div class="why-card"><span>📞</span><h3>Suivi personnalisé</h3><p>Un interlocuteur dédié pour suivre l'avancement de votre projet en temps réel.</p></div>
          </div>
        </div>
      </section>

      <!-- CTA Final -->
      <section class="cta-final">
        <div class="cta-final-inner">
          <h2>Prêt à démarrer votre projet ?</h2>
          <p>Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et personnalisé</p>
          <div class="cta-actions">
            <a routerLink="/contact" class="btn-primary">Demander un devis gratuit</a>
            <a href="tel:+212600000000" class="btn-outline">📞 +212 6 XX XX XX XX</a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-col">
            <div class="footer-brand"><span>🏗️</span><span>Bureau d'Etudes IEB</span></div>
            <p class="footer-desc">Expertise en génie civil et infrastructures depuis 2014. Votre partenaire de confiance pour tous vos projets de construction au Maroc.</p>
          </div>
          <div class="footer-col">
            <h4>Nos services</h4>
            <ul>
              <li><a routerLink="/services">Terrassement</a></li>
              <li><a routerLink="/services">Construction de routes</a></li>
              <li><a routerLink="/services">Bâtiment & Gros œuvre</a></li>
              <li><a routerLink="/services">Ouvrages d'art</a></li>
              <li><a routerLink="/services">Assainissement</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Liens rapides</h4>
            <ul>
              <li><a routerLink="/">Accueil</a></li>
              <li><a routerLink="/projets">Projets</a></li>
              <li><a routerLink="/services">Services</a></li>
              <li><a routerLink="/about">À propos</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>📍 Casablanca, Maroc</li>
              <li>📞 +212 6 XX XX XX XX</li>
              <li>✉️ contact&#64;ieb-civil.ma</li>
              <li>🕐 Lun-Ven : 8h00 - 18h00</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2024 Bureau d'Etudes IEB — Tous droits réservés</p>
        </div>
      </footer>

      <!-- WhatsApp flottant -->
      <a href="https://wa.me/212600000000?text=Bonjour Bureau d'Etudes IEB, je souhaite obtenir un devis."
         target="_blank" class="whatsapp-btn" title="Contactez-nous sur WhatsApp">
        💬
      </a>

    </div>
  `,
  styles: [`
    .page { min-height: 100vh; display: flex; flex-direction: column; }

    /* Navbar */
    .navbar { background: white; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; height: 70px; }
    .brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
    .brand-icon { font-size: 2rem; }
    .brand-text { display: flex; flex-direction: column; }
    .brand-name { font-weight: 700; font-size: 1rem; color: #0d47a1; line-height: 1.2; }
    .brand-sub { font-size: 0.72rem; color: #64748b; }
    .nav-links { display: flex; align-items: center; gap: 1.75rem; }
    .nav-links a { text-decoration: none; color: #374151; font-weight: 500; font-size: 0.9rem; transition: color 0.2s; }
    .nav-links a:hover { color: #0d47a1; }
    .btn-devis { background: #0d47a1 !important; color: white !important; padding: 0.55rem 1.25rem; border-radius: 8px; font-weight: 600 !important; }
    .btn-devis:hover { background: #1565c0 !important; }

    /* Hero */
    .hero { background: linear-gradient(135deg, #071e3d 0%, #0d47a1 45%, #1976d2 75%, #1e88e5 100%); color: white; padding: 5rem 1.5rem; min-height: 88vh; display: flex; align-items: center; position: relative; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
    .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 1; }
    @media (max-width: 900px) { .hero-inner { grid-template-columns: 1fr; } .hero-right { display: none; } }
    .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.12); backdrop-filter: blur(10px); padding: 0.5rem 1.25rem; border-radius: 25px; font-size: 0.85rem; font-weight: 500; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.2); }
    .hero h1 { font-size: 3.75rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.25rem; }
    .highlight { color: #ffd54f; }
    .hero p { font-size: 1.1rem; opacity: 0.85; margin-bottom: 2rem; line-height: 1.7; max-width: 500px; }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
    .btn-primary { display: inline-block; background: #ffd54f; color: #0d47a1; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 0.95rem; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 15px rgba(255,213,79,0.4); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,213,79,0.5); }
    .btn-ghost { display: inline-block; color: white; padding: 0.9rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; border: 1.5px solid rgba(255,255,255,0.4); transition: background 0.2s; }
    .btn-ghost:hover { background: rgba(255,255,255,0.1); }
    .hero-stats { display: flex; align-items: center; gap: 2rem; }
    .stat strong { display: block; font-size: 1.75rem; font-weight: 800; }
    .stat span { font-size: 0.8rem; opacity: 0.75; }
    .stat-sep { width: 1px; height: 40px; background: rgba(255,255,255,0.2); }
    .hero-right { display: flex; flex-direction: column; gap: 1rem; }
    .hero-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
    .hero-card.gold { background: rgba(255,213,79,0.12); border-color: rgba(255,213,79,0.25); }
    .hc-icon { font-size: 2rem; flex-shrink: 0; }
    .hc-text { flex: 1; }
    .hc-text strong { display: block; font-size: 0.9rem; font-weight: 600; }
    .hc-text span { font-size: 0.8rem; opacity: 0.7; }
    .tag { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
    .tag.orange { background: #ff9800; color: white; }
    .tag.green { background: #4caf50; color: white; }

    /* Partenaires */
    .partners { background: white; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 1.5rem 0; overflow: hidden; }
    .partners-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .partners-label { text-align: center; font-size: 0.8rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
    .partners-track { display: flex; gap: 2rem; animation: scroll 20s linear infinite; width: max-content; }
    @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .partner-item { background: #f1f5f9; border-radius: 8px; padding: 0.5rem 1.5rem; font-weight: 600; font-size: 0.85rem; color: #475569; white-space: nowrap; }

    /* Sections */
    .section { padding: 5rem 1.5rem; }
    .section.bg-gray { background: #f8fafc; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-badge { display: inline-block; background: #e3f2fd; color: #0d47a1; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
    .section-header h2 { font-size: 2.25rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.75rem; }
    .section-header p { color: #64748b; font-size: 1.05rem; }
    .section-cta { text-align: center; margin-top: 2.5rem; }
    .section-cta a { color: #0d47a1; text-decoration: none; font-weight: 600; }

    /* Services */
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
    .service-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; border: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 0.6rem; }
    .service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-color: #bfdbfe; }
    .service-icon { width: 54px; height: 54px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; }
    .bg-0 { background: #dbeafe; } .bg-1 { background: #ede9fe; } .bg-2 { background: #dcfce7; } .bg-3 { background: #fef3c7; }
    .service-card h3 { font-size: 1rem; font-weight: 600; color: #1a1a2e; }
    .service-card p { color: #64748b; font-size: 0.88rem; line-height: 1.6; flex: 1; }
    .service-link { color: #0d47a1; text-decoration: none; font-weight: 600; font-size: 0.85rem; }

    /* Projets */
    .projets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; }
    .projet-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; }
    .projet-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
    .projet-img { height: 220px; overflow: hidden; position: relative; }
    .projet-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
    .projet-card:hover .projet-img img { transform: scale(1.05); }
    .projet-placeholder { width: 100%; height: 100%; background: #e3f2fd; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .projet-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.3), transparent); }
    .projet-body { padding: 1.25rem; }
    .projet-body h3 { font-weight: 600; color: #1a1a2e; margin-bottom: 0.4rem; }
    .projet-body p { color: #64748b; font-size: 0.88rem; line-height: 1.5; }

    /* Why */
    .why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
    .why-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); text-align: center; border: 1px solid #f1f5f9; }
    .why-card span { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
    .why-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: #1a1a2e; }
    .why-card p { color: #64748b; font-size: 0.88rem; line-height: 1.6; }

    /* CTA Final */
    .cta-final { background: linear-gradient(135deg, #071e3d, #0d47a1); color: white; padding: 5rem 1.5rem; text-align: center; }
    .cta-final-inner { max-width: 700px; margin: 0 auto; }
    .cta-final-inner h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
    .cta-final-inner p { font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem; }
    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-outline { display: inline-block; border: 2px solid rgba(255,255,255,0.4); color: white; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-weight: 600; }

    /* Footer */
    .footer { background: #071e3d; color: #94a3b8; padding: 4rem 1.5rem 0; }
    .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
    .footer-brand { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.1rem; color: white; margin-bottom: 1rem; }
    .footer-desc { font-size: 0.85rem; line-height: 1.7; color: #64748b; }
    .footer-col h4 { color: white; font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
    .footer-col ul li { font-size: 0.85rem; }
    .footer-col ul li a { color: #64748b; text-decoration: none; transition: color 0.2s; }
    .footer-col ul li a:hover { color: white; }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding: 1.5rem 0; text-align: center; }
    .footer-bottom p { font-size: 0.8rem; color: #475569; }

    /* WhatsApp */
    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 56px; height: 56px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; text-decoration: none; box-shadow: 0 4px 20px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.2s, box-shadow 0.2s; animation: pulse 2s infinite; }
    .whatsapp-btn:hover { transform: scale(1.1); box-shadow: 0 6px 25px rgba(37,211,102,0.5); animation: none; }
    @keyframes pulse { 0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); } 50% { box-shadow: 0 4px 30px rgba(37,211,102,0.7); } }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  projets = signal<Projet[]>([]);
  services = signal<ServiceCivil[]>([]);
  serviceIcons = ['🏗️', '🛣️', '🏠', '🌉', '⚡', '💧', '🔧', '📐'];

  animatedProjets = 0;
  animatedYears = 0;
  animatedSatisf = 0;

  partners = ['ONCF', 'ADM', 'ONEE', 'Ministère TP', 'Lydec', 'CasaBlanca', 'OCP', 'Marsa Maroc', 'Al Omrane', 'CDG'];

  constructor(
    private projetService: ProjetService,
    private serviceCivilService: ServiceCivilService
  ) {}

  ngOnInit() {
    this.projetService.getAllProjets().subscribe(p => this.projets.set(p.content));
    this.serviceCivilService.getAllServices().subscribe(s => this.services.set(s.content));
  }

  ngAfterViewInit() {
    this.animatedProjets = 150;
    this.animatedYears = 10;
    this.animatedSatisf = 100;
  }

  animateCounter(prop: 'animatedProjets' | 'animatedYears' | 'animatedSatisf', target: number, duration: number) {
    const steps = 50;
    const increment = target / steps;
    const delay = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        this[prop] = target;
        clearInterval(timer);
      } else {
        this[prop] = Math.floor(current);
      }
    }, delay);
  }
}
