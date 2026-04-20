import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'projets', loadComponent: () => import('./pages/projets/projets.component').then(m => m.ProjetsComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'projets', loadComponent: () => import('./pages/admin/projets/admin-projets.component').then(m => m.AdminProjetsComponent) },
      { path: 'services', loadComponent: () => import('./pages/admin/services/admin-services.component').then(m => m.AdminServicesComponent) },
      { path: 'messages', loadComponent: () => import('./pages/admin/messages/admin-messages.component').then(m => m.AdminMessagesComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
