import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServiceState } from './service.reducer';

export const selectServiceState = createFeatureSelector<ServiceState>('services');

export const selectServices = createSelector(
  selectServiceState,
  state => state.data?.content ?? []
);

export const selectServicePage = createSelector(
  selectServiceState,
  state => state.data
);

export const selectServicesLoading = createSelector(
  selectServiceState,
  state => state.loading
);
