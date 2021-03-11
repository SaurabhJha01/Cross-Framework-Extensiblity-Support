import { createAction, props } from '@ngrx/store';
import VectorSource from 'ol/source/Vector';

  export const AddVectorLayerAction = createAction(
    'addVectorLayer',
    props<{vectorSource: VectorSource}>()
  )
  
  export const AddLayerAction = createAction(
    'addLayer',
    props<{payload: any}>()
  )


  