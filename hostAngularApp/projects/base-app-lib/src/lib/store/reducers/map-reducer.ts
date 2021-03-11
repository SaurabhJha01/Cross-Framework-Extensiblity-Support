
import * as mapActions from '../actions/map-action';
import { OlMapState, initialOlMapState } from '../state/map-state';
import { createReducer, on } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export const addLayerReducer = createReducer(
    initialOlMapState,
    on(mapActions.AddLayerAction, (state, { payload }) => {
        const layer = new VectorLayer({
            source: payload.source
        });
        return {
            ...state,
            vectorLayers: [layer]
        }
    }
    )
)
export const getOlMapState = (state: OlMapState) => {
    return state;
};






