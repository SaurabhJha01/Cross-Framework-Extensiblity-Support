

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AddLayerAction, AddVectorLayerAction } from 'base-app-lib';


@Injectable()
export class MapEffects {

    mapEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AddVectorLayerAction.type),
            mergeMap(({ vectorSource }) => {
                const payload = { source: vectorSource };
                return of(AddLayerAction({ payload }));
            })
        )
    }
    );

    constructor(private actions$: Actions) { }
}