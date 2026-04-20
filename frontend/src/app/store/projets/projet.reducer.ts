import { createReducer, on } from '@ngrx/store';
import { Projet } from '../../core/models/projet.model';
import { Page } from '../../core/services/projet.service';
import { loadProjets, loadProjetsSuccess, loadProjetsFailure } from './projet.actions';

export interface ProjetState {
  data: Page<Projet> | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProjetState = {
  data: null,
  loading: false,
  error: null
};

export const projetReducer = createReducer(
  initialState,
  on(loadProjets, state => ({ ...state, loading: true, error: null })),
  on(loadProjetsSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(loadProjetsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
