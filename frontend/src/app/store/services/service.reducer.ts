import { createReducer, on } from '@ngrx/store';
import { ServiceCivil } from '../../core/models/projet.model';
import { Page } from '../../core/services/projet.service';
import { loadServices, loadServicesSuccess, loadServicesFailure } from './service.actions';

export interface ServiceState {
  data: Page<ServiceCivil> | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ServiceState = {
  data: null,
  loading: false,
  error: null
};

export const serviceReducer = createReducer(
  initialState,
  on(loadServices, state => ({ ...state, loading: true, error: null })),
  on(loadServicesSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(loadServicesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
