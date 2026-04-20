import { createAction, props } from '@ngrx/store';
import { Projet } from '../../core/models/projet.model';
import { Page } from '../../core/services/projet.service';

// Load Projets
export const loadProjets = createAction(
  '[Projets] Load Projets',
  props<{ page: number; size: number; search: string }>()
);

export const loadProjetsSuccess = createAction(
  '[Projets] Load Projets Success',
  props<{ data: Page<Projet> }>()
);

export const loadProjetsFailure = createAction(
  '[Projets] Load Projets Failure',
  props<{ error: string }>()
);
