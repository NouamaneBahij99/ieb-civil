import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">🏗️</div>
          <h1>Bureau d'Etudes IEB</h1>
          <p>Espace Administration</p>
        </div>

        <form (ngSubmit)="onLogin()" class="form">
          <div class="field">
            <label>Nom d'utilisateur</label>
            <input [(ngModel)]="username" name="username" placeholder="admin" required />
          </div>
          <div class="field">
            <label>Mot de passe</label>
            <input [(ngModel)]="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          @if (error()) {
            <div class="error-banner">❌ {{ error() }}</div>
          }

          <button type="submit" [disabled]="loading()">
            {{ loading() ? '⏳ Connexion...' : '🔐 Se connecter' }}
          </button>
        </form>

        <div class="login-footer">
          <a routerLink="/projets">← Retour au site</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0d47a1, #1976d2, #42a5f5); padding: 1rem; }
    .login-card { background: white; border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 420px; box-shadow: 0 25px 50px rgba(0,0,0,0.25); }
    .login-header { text-align: center; margin-bottom: 2rem; }
    .logo { font-size: 3rem; margin-bottom: 0.5rem; }
    .login-header h1 { font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-bottom: 0.25rem; }
    .login-header p { color: var(--text-muted); font-size: 0.9rem; }
    .field { margin-bottom: 1.25rem; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; color: var(--text); margin-bottom: 0.4rem; }
    input { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.95rem; transition: border-color 0.2s; font-family: inherit; }
    input:focus { outline: none; border-color: var(--primary); }
    .error-banner { background: #ffebee; color: var(--danger); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
    button { width: 100%; padding: 0.9rem; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: inherit; margin-top: 0.5rem; }
    button:hover { background: var(--primary-dark); }
    button:disabled { background: #90caf9; cursor: not-allowed; }
    .login-footer { text-align: center; margin-top: 1.5rem; }
    .login-footer a { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }
    .login-footer a:hover { color: var(--primary); }
  `]
})
export class LoginComponent {
  username = ''; password = '';
  loading = signal(false);
  error = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.loading.set(true);
    this.error.set('');
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => { this.loading.set(false); this.router.navigate(['/admin/projets']); },
      error: () => { this.loading.set(false); this.error.set('Identifiants incorrects'); }
    });
  }
}
