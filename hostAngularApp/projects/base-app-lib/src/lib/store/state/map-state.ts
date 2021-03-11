import VectorLayer from 'ol/layer/Vector';
export interface OlMapState {
  vectorLayers: VectorLayer[];
  };

 

  /**
 * Initial Meta data State of ol map object
 */
export const initialOlMapState: OlMapState = {
   vectorLayers: []
};