import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ServiceCivilService } from '../../core/services/service-civil.service';
import { loadServices, loadServicesSuccess, loadServicesFailure } from './service.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ServiceEffects {

  loadServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadServices),
      switchMap(({ page, size, search }) =>
        this.serviceCivilService.getServices(page, size, search).pipe(
          map(data => loadServicesSuccess({ data })),
          catchError(error => of(loadServicesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private serviceCivilService: ServiceCivilService
  ) {}
}
