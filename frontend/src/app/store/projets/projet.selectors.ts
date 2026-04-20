import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjetState } from './projet.reducer';

export const selectProjetState = createFeatureSelector<ProjetState>('projets');

export const selectProjets = createSelector(
  selectProjetState,
  state => state.data?.content ?? []
);

export const selectProjetPage = createSelector(
  selectProjetState,
  state => state.data
);

export const selectProjetsLoading = createSelector(
  selectProjetState,
  state => state.loading
);

export const selectProjetsError = createSelector(
  selectProjetState,
  state => state.error
);
