import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
            <a routerLink="/about">À propos</a>
            <a routerLink="/contact" class="active">Contact</a>
            <a routerLink="/contact" class="btn-devis">Devis Gratuit</a>
          </div>
        </div>
      </nav>

      <header class="hero">
        <div class="hero-content">
          <span class="badge">Parlons de votre projet</span>
          <h1>Contactez-nous</h1>
          <p>Notre équipe vous répond dans les plus brefs délais</p>
        </div>
      </header>

      <main class="main">
        <div class="content-grid">
          <div class="info-col">
            <h2>Nos coordonnées</h2>
            <div class="info-cards">
              <div class="info-card">
                <div class="info-icon top-0">📍</div>
                <div><strong>Adresse</strong><span>Casablanca, Maroc</span></div>
              </div>
              <div class="info-card">
                <div class="info-icon top-1">📞</div>
                <div><strong>Téléphone</strong><span>+212 6 XX XX XX XX</span></div>
              </div>
              <div class="info-card">
                <div class="info-icon top-2">✉️</div>
                <div><strong>Email</strong><span>contact&#64;ieb-civil.ma</span></div>
              </div>
              <div class="info-card">
                <div class="info-icon top-3">🕐</div>
                <div><strong>Horaires</strong><span>Lun - Ven : 8h00 - 18h00</span></div>
              </div>
            </div>
            <div class="why-box">
              <h3>Pourquoi nous choisir ?</h3>
              <ul>
                <li>✅ Plus de 10 ans d'expérience</li>
                <li>✅ Équipe certifiée ISO 9001</li>
                <li>✅ Devis gratuit sous 48h</li>
                <li>✅ Suivi de chantier en temps réel</li>
                <li>✅ +150 projets réalisés</li>
              </ul>
            </div>
            <a href="https://wa.me/212600000000" target="_blank" class="whatsapp-card">
              <span>💬</span>
              <div>
                <strong>Discutez avec nous sur WhatsApp</strong>
                <span>Réponse rapide garantie</span>
              </div>
              <span class="arrow">→</span>
            </a>
          </div>

          <div class="form-col">
            @if (success()) {
              <div class="success-card">
                <div class="success-icon">✅</div>
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                <button (click)="reset()" class="btn-reset">Envoyer un autre message</button>
              </div>
            } @else {
              <form (ngSubmit)="envoyer()" class="form">
                <h2>Envoyer un message</h2>
                <div class="field">
                  <label>Nom complet *</label>
                  <input
                    name="nom"
                    [value]="nom"
                    (input)="nom=$any($event.target).value"
                    placeholder="Votre nom complet"
                    [class.invalid]="submitted && !nom" />
                  @if (submitted && !nom) { <span class="err">Champ obligatoire</span> }
                </div>
                <div class="field">
                  <label>Adresse email *</label>
                  <input
                    name="email"
                    type="email"
                    [value]="email"
                    (input)="email=$any($event.target).value"
                    placeholder="votre&#64;email.com"
                    [class.invalid]="submitted && !email" />
                  @if (submitted && !email) { <span class="err">Champ obligatoire</span> }
                </div>
                <div class="field">
                  <label>Votre message *</label>
                  <textarea
                    name="contenu"
                    [value]="contenu"
                    (input)="contenu=$any($event.target).value"
                    (change)="contenu=$any($event.target).value"
                    (keyup)="contenu=$any($event.target).value"
                    (paste)="onPaste($event)"
                    placeholder="Décrivez votre projet en détail..."
                    [class.invalid]="submitted && !contenu"></textarea>
                  @if (submitted && !contenu) { <span class="err">Champ obligatoire</span> }
                </div>
                @if (erreur()) {
                  <div class="error-banner">❌ {{ erreur() }}</div>
                }
                <button type="submit" class="btn-submit" [disabled]="loading()">
                  {{ loading() ? '⏳ Envoi en cours...' : '✉️ Envoyer le message' }}
                </button>
              </form>
            }
          </div>
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
    .main { flex: 1; max-width: 1200px; margin: 0 auto; width: 100%; padding: 3rem 1.5rem; }
    .content-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3rem; }
    @media (max-width: 768px) { .content-grid { grid-template-columns: 1fr; } }
    .info-col h2 { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-bottom: 1.5rem; }
    .info-cards { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
    .info-card { display: flex; align-items: center; gap: 1rem; background: white; border-radius: 12px; padding: 1rem 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border: 1px solid #f1f5f9; }
    .info-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
    .top-0 { background: linear-gradient(135deg, #dbeafe, #eff6ff); }
    .top-1 { background: linear-gradient(135deg, #dcfce7, #f0fdf4); }
    .top-2 { background: linear-gradient(135deg, #fef3c7, #fffbeb); }
    .top-3 { background: linear-gradient(135deg, #ede9fe, #f5f3ff); }
    .info-card div { display: flex; flex-direction: column; }
    .info-card strong { font-size: 0.8rem; color: #64748b; font-weight: 500; }
    .info-card span { font-weight: 600; color: #1a1a2e; font-size: 0.9rem; }
    .why-box { background: #f8fafc; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; }
    .why-box h3 { font-size: 0.95rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.75rem; }
    .why-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
    .why-box li { font-size: 0.88rem; color: #374151; }
    .whatsapp-card { display: flex; align-items: center; gap: 1rem; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 1rem 1.25rem; text-decoration: none; transition: background 0.2s; }
    .whatsapp-card:hover { background: #dcfce7; }
    .whatsapp-card span:first-child { font-size: 1.75rem; }
    .whatsapp-card div { flex: 1; display: flex; flex-direction: column; }
    .whatsapp-card strong { font-size: 0.9rem; color: #14532d; }
    .whatsapp-card div span { font-size: 0.78rem; color: #16a34a; }
    .arrow { color: #16a34a; font-size: 1.25rem; }
    .form-col { background: white; border-radius: 14px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border: 1px solid #f1f5f9; }
    .form h2 { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-bottom: 1.5rem; }
    .field { margin-bottom: 1.25rem; }
    .field label { display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 0.4rem; }
    input, textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; transition: border-color 0.2s; box-sizing: border-box; }
    input:focus, textarea:focus { outline: none; border-color: #0d47a1; }
    input.invalid, textarea.invalid { border-color: #ef4444; }
    textarea { min-height: 200px; resize: vertical; }
    .err { color: #ef4444; font-size: 0.78rem; margin-top: 0.25rem; display: block; }
    .error-banner { background: #fef2f2; color: #ef4444; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.88rem; }
    .btn-submit { width: 100%; padding: 0.9rem; background: #0d47a1; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.2s; }
    .btn-submit:hover { background: #1565c0; }
    .btn-submit:disabled { background: #93c5fd; cursor: not-allowed; }
    .success-card { text-align: center; padding: 3rem 2rem; }
    .success-icon { font-size: 4rem; margin-bottom: 1rem; }
    .success-card h3 { font-size: 1.5rem; color: #14532d; margin-bottom: 0.5rem; }
    .success-card p { color: #64748b; margin-bottom: 1.5rem; }
    .btn-reset { padding: 0.75rem 1.5rem; background: #0d47a1; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; }
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
export class ContactComponent {
  nom = '';
  email = '';
  contenu = '';
  loading = signal(false);
  success = signal(false);
  erreur = signal('');
  submitted = false;

  constructor(private messageService: MessageService) {}

  onPaste(event: ClipboardEvent) {
    const target = event.target as HTMLTextAreaElement;
    setTimeout(() => {
      this.contenu = target.value;
    }, 200);
  }

  envoyer() {
    this.submitted = true;
    if (!this.nom.trim() || !this.email.trim() || !this.contenu.trim()) return;
    this.loading.set(true);
    this.erreur.set('');
    this.messageService.envoyerMessage({
      nomExpediteur: this.nom.trim(),
      email: this.email.trim(),
      contenu: this.contenu.trim()
    }).subscribe({
      next: () => { this.loading.set(false); this.success.set(true); },
      error: (err) => {
        this.loading.set(false);
        console.error('Erreur:', err);
        this.erreur.set("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    });
  }

  reset() {
    this.nom = ''; this.email = ''; this.contenu = '';
    this.submitted = false; this.success.set(false);
  }
}
