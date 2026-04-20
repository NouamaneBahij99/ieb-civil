import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
            <a routerLink="/services">Services</a>
            <a routerLink="/about" class="active">À propos</a>
            <a routerLink="/contact">Contact</a>
            <a routerLink="/contact" class="btn-devis">Devis Gratuit</a>
          </div>
        </div>
      </nav>

      <header class="hero">
        <div class="hero-content">
          <span class="badge">Qui sommes-nous</span>
          <h1>Bureau d'Etudes IEB</h1>
          <p>Un engagement de qualité et d'excellence depuis plus de 10 ans au service des infrastructures du Maroc</p>
        </div>
      </header>

      <!-- Histoire -->
      <section class="section">
        <div class="section-inner two-col">
          <div class="text-col">
            <span class="section-badge">Notre histoire</span>
            <h2>Bâtir le Maroc de demain</h2>
            <p>Fondée en 2014 à Casablanca, Bureau d'Etudes IEB s'est imposée comme un acteur majeur dans le domaine de la construction et des infrastructures civiles au Maroc.</p>
            <p>Notre expertise couvre l'ensemble des travaux de génie civil : routes, ponts, bâtiments, assainissement et ouvrages d'art. Nous intervenons sur des projets d'envergure nationale pour des clients publics et privés.</p>
            <p>Notre équipe de plus de 200 ingénieurs, techniciens et ouvriers qualifiés met son savoir-faire au service de chaque projet, avec un souci constant de qualité, de sécurité et de respect des délais.</p>
            <a routerLink="/contact" class="btn-primary">Contactez-nous</a>
          </div>
          <div class="stats-visual">
            <div class="stat-box blue"><strong>+150</strong><span>Projets réalisés</span></div>
            <div class="stat-box orange"><strong>10+</strong><span>Années d'expérience</span></div>
            <div class="stat-box green"><strong>200+</strong><span>Employés qualifiés</span></div>
            <div class="stat-box purple"><strong>15</strong><span>Villes au Maroc</span></div>
          </div>
        </div>
      </section>

      <!-- Valeurs -->
      <section class="section bg-gray">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Ce qui nous guide</span>
            <h2>Nos valeurs</h2>
            <p>Les principes qui définissent notre façon de travailler au quotidien</p>
          </div>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-top top-0"><div class="value-icon">🎯</div><span class="value-num">01</span></div>
              <div class="value-body"><h3>Excellence</h3><p>Nous visons l'excellence dans chaque projet, en appliquant les meilleures pratiques et les normes les plus élevées de l'industrie.</p></div>
            </div>
            <div class="value-card">
              <div class="value-top top-1"><div class="value-icon">🛡️</div><span class="value-num">02</span></div>
              <div class="value-body"><h3>Sécurité</h3><p>La sécurité de nos équipes et des riverains est notre priorité absolue sur chaque chantier, sans compromis.</p></div>
            </div>
            <div class="value-card">
              <div class="value-top top-2"><div class="value-icon">⚡</div><span class="value-num">03</span></div>
              <div class="value-body"><h3>Efficacité</h3><p>Nous optimisons chaque étape du projet pour livrer dans les délais et le budget convenus, toujours.</p></div>
            </div>
            <div class="value-card">
              <div class="value-top top-3"><div class="value-icon">🌱</div><span class="value-num">04</span></div>
              <div class="value-body"><h3>Durabilité</h3><p>Nous intégrons les enjeux environnementaux dans nos pratiques pour construire un avenir durable.</p></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Équipe -->
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Notre équipe</span>
            <h2>La direction</h2>
            <p>Des professionnels expérimentés à la tête de l'entreprise</p>
          </div>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar blue">IM</div>
              <h3>Ibrahim El Mansouri</h3>
              <span class="team-role">Directeur Général</span>
              <p>Ingénieur en génie civil, 20 ans d'expérience dans les grands projets d'infrastructure au Maroc et en Afrique.</p>
            </div>
            <div class="team-card">
              <div class="team-avatar orange">SB</div>
              <h3>Sara Benali</h3>
              <span class="team-role">Directrice Technique</span>
              <p>Docteure en géotechnique, spécialiste des ouvrages d'art et des fondations spéciales sur sols difficiles.</p>
            </div>
            <div class="team-card">
              <div class="team-avatar green">KA</div>
              <h3>Karim Alaoui</h3>
              <span class="team-role">Directeur des Projets</span>
              <p>Expert en management de projets complexes, certifié PMP, avec plus de 50 projets livrés avec succès.</p>
            </div>
            <div class="team-card">
              <div class="team-avatar purple">NB</div>
              <h3>Nadia Berrada</h3>
              <span class="team-role">Directrice Qualité & HSE</span>
              <p>Responsable de la certification ISO 9001 et de la politique Hygiène, Sécurité et Environnement du groupe.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Certifications -->
      <section class="section bg-gray">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Nos certifications</span>
            <h2>Reconnus et certifiés</h2>
          </div>
          <div class="cert-grid">
            <div class="cert-card"><div class="cert-icon">🏆</div><h3>ISO 9001:2015</h3><p>Système de management de la qualité</p></div>
            <div class="cert-card"><div class="cert-icon">🛡️</div><h3>ISO 45001:2018</h3><p>Santé et sécurité au travail</p></div>
            <div class="cert-card"><div class="cert-icon">🌱</div><h3>ISO 14001:2015</h3><p>Management environnemental</p></div>
            <div class="cert-card"><div class="cert-icon">⭐</div><h3>Agrément ONEE</h3><p>Office National de l'Électricité et de l'Eau</p></div>
            <div class="cert-card"><div class="cert-icon">🔑</div><h3>Agrément ADM</h3><p>Autoroutes du Maroc</p></div>
            <div class="cert-card"><div class="cert-icon">📋</div><h3>Agrément MTP</h3><p>Ministère des Travaux Publics</p></div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-inner">
          <h2>Travaillons ensemble</h2>
          <p>Confiez-nous votre projet et bénéficiez de notre expertise</p>
          <div class="cta-actions">
            <a routerLink="/contact" class="btn-yellow">Nous contacter</a>
            <a routerLink="/projets" class="btn-outline">Voir nos projets</a>
          </div>
        </div>
      </section>

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

    .section { padding: 5rem 1.5rem; }
    .section.bg-gray { background: #f8fafc; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-badge { display: inline-block; background: #dbeafe; color: #0d47a1; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
    .section-header h2 { font-size: 2.25rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.75rem; }
    .section-header p { color: #64748b; font-size: 1rem; }

    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    @media (max-width: 768px) { .two-col { grid-template-columns: 1fr; } }
    .text-col .section-badge { display: inline-block; background: #dbeafe; color: #0d47a1; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
    .text-col h2 { font-size: 2rem; font-weight: 700; color: #1a1a2e; margin-bottom: 1.5rem; }
    .text-col p { color: #64748b; line-height: 1.8; margin-bottom: 1rem; font-size: 0.95rem; }
    .btn-primary { display: inline-block; background: #0d47a1; color: white; padding: 0.85rem 2rem; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 1rem; }

    .stats-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .stat-box { background: white; border-radius: 14px; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border-top: 4px solid; }
    .stat-box.blue { border-color: #0d47a1; } .stat-box.orange { border-color: #f59e0b; } .stat-box.green { border-color: #10b981; } .stat-box.purple { border-color: #7c3aed; }
    .stat-box strong { display: block; font-size: 2.5rem; font-weight: 800; color: #1a1a2e; }
    .stat-box span { color: #64748b; font-size: 0.9rem; }

    .values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
    .value-card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; border: 1px solid #f1f5f9; }
    .value-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
    .value-top { padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
    .top-0 { background: linear-gradient(135deg, #dbeafe, #eff6ff); }
    .top-1 { background: linear-gradient(135deg, #ede9fe, #f5f3ff); }
    .top-2 { background: linear-gradient(135deg, #dcfce7, #f0fdf4); }
    .top-3 { background: linear-gradient(135deg, #fef3c7, #fffbeb); }
    .value-icon { font-size: 2rem; }
    .value-num { font-size: 2rem; font-weight: 800; color: rgba(0,0,0,0.06); }
    .value-body { padding: 1.25rem 1.5rem 1.5rem; }
    .value-body h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.5rem; }
    .value-body p { color: #64748b; font-size: 0.88rem; line-height: 1.65; }

    .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
    .team-card { background: white; border-radius: 14px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); text-align: center; border: 1px solid #f1f5f9; transition: transform 0.2s; }
    .team-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
    .team-avatar { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: white; margin: 0 auto 1rem; }
    .team-avatar.blue { background: linear-gradient(135deg, #0d47a1, #1976d2); }
    .team-avatar.orange { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
    .team-avatar.green { background: linear-gradient(135deg, #10b981, #34d399); }
    .team-avatar.purple { background: linear-gradient(135deg, #7c3aed, #a78bfa); }
    .team-card h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.3rem; }
    .team-role { display: inline-block; background: #dbeafe; color: #0d47a1; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem; }
    .team-card p { color: #64748b; font-size: 0.85rem; line-height: 1.6; }

    .cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
    .cert-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); text-align: center; border: 1px solid #f1f5f9; transition: transform 0.2s; }
    .cert-card:hover { transform: translateY(-3px); }
    .cert-icon { font-size: 2rem; margin-bottom: 0.75rem; }
    .cert-card h3 { font-size: 0.95rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.25rem; }
    .cert-card p { color: #64748b; font-size: 0.78rem; line-height: 1.4; }

    .cta-section { background: linear-gradient(135deg, #071e3d, #0d47a1); color: white; padding: 5rem 1.5rem; text-align: center; }
    .cta-inner { max-width: 700px; margin: 0 auto; }
    .cta-inner h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
    .cta-inner p { font-size: 1.1rem; opacity: 0.85; margin-bottom: 2rem; }
    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-yellow { display: inline-block; background: #ffd54f; color: #0d47a1; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-weight: 700; }
    .btn-outline { display: inline-block; border: 2px solid rgba(255,255,255,0.4); color: white; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-weight: 600; }

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
export class AboutComponent {}
