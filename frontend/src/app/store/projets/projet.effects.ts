import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjetService } from '../../core/services/projet.service';
import { loadProjets, loadProjetsSuccess, loadProjetsFailure } from './projet.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProjetEffects {

  loadProjets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjets),
      switchMap(({ page, size, search }) =>
        this.projetService.getProjets(page, size, search).pipe(
          map(data => loadProjetsSuccess({ data })),
          catchError(error => of(loadProjetsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projetService: ProjetService
  ) {}
}
