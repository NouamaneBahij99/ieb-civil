import { createAction, props } from '@ngrx/store';
import { ServiceCivil } from '../../core/models/projet.model';
import { Page } from '../../core/services/projet.service';

export const loadServices = createAction(
  '[Services] Load Services',
  props<{ page: number; size: number; search: string }>()
);

export const loadServicesSuccess = createAction(
  '[Services] Load Services Success',
  props<{ data: Page<ServiceCivil> }>()
);

export const loadServicesFailure = createAction(
  '[Services] Load Services Failure',
  props<{ error: string }>()
);
