import { Component, OnInit } from '@angular/core';
import { BaseAppLibService } from 'base-app-lib';
import { ExtService } from './ext.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import Polygon from 'ol/geom/Polygon';
import Draw, {
  createBox,
  createRegularPolygon,
} from 'ol/interaction/Draw';
import { Store } from '@ngrx/store';
import { OlMapState, getOlMapState, AddVectorLayerAction } from 'base-app-lib';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  draw: any;
  geometries: any;
  time: any;
  constructor(private baseAppLibService: BaseAppLibService, private extService: ExtService,
    private store: Store<OlMapState>) {
    this.geometries = [];
  }

  ngOnInit() {
    this.store.select(getOlMapState).subscribe((olMapState: any) => {
      if (olMapState.data.vectorLayers && olMapState.data.vectorLayers.length) {
        const layer = olMapState.data.vectorLayers[0];
        const vectorFeatures = layer.getSource().getFeatures();
        for (let i = 0; i < vectorFeatures.length; i++)
          this.geometries.push(vectorFeatures[i].getGeometry());
      }
    });

    this.time = new Observable<string>((observer: Observer<string>) => {
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
  }

  addVectorLayer(): void {
    const featuresList = this.getFeatures();
    const vectorSource: VectorSource = new VectorSource({
      features: featuresList
    });
    this.store.dispatch(AddVectorLayerAction({ vectorSource }));
  }

  addBaseLayer() {
    const map = this.baseAppLibService.getMap();
    const layer = new TileLayer({
      source: new OSM(),
    })
    map.addLayer(layer);
  }

  removeAllLayers(): void {
    const map = this.baseAppLibService.getMap();
    const layers = [...map.getLayers().getArray()];
    layers.forEach((layer) => map.removeLayer(layer));
    this.geometries = [];
  }

  closePanel() {
    this.geometries = [];
  }

  addInteractionForAnnotation() {
    const map = this.baseAppLibService.getMap();
    const source = new VectorSource({ wrapX: false });

    const annotationLayer = new VectorLayer({
      source: source,
    });
    map.addLayer(annotationLayer);
    this.addInteraction(source, map);
  }

  removeInteractionForAnnotation() {
    const map = this.baseAppLibService.getMap();
    map.removeInteraction(this.draw);
  }

  private addInteraction(source, map) {
    this.draw = new Draw({
      source: source,
      type: 'Circle',
      geometryFunction: createBox(),
    });
    map.addInteraction(this.draw);
  }

  /**
   * It returns the ol features
   */
  private getFeatures(): Feature[] {
    const feature1 = new Feature({
      geometry: new Point(olProj.fromLonLat([4.35247, 50.84673]))
    });
    const feature2 = new Feature({
      geometry: new Point(olProj.fromLonLat([9.35247, 55.84673]))
    });
    const feature3 = new Feature({
      geometry: new Point(olProj.fromLonLat([14.35247, 60.84673]))
    });
    const feature4 = new Feature({
      geometry: new Point(olProj.fromLonLat([4.35247, 55.84673]))
    });
    const feature5 = new Feature({
      geometry: new Point(olProj.fromLonLat([9.35247, 60.84673]))
    });
    const feature6 = new Feature({
      geometry: new Point(olProj.fromLonLat([14.35247, 65.84673]))
    });
    const feature7 = new Feature({
      geometry: new Point(olProj.fromLonLat([19.35247, 50.84673]))
    });
    const feature8 = new Feature({
      geometry: new Point(olProj.fromLonLat([24.35247, 55.84673]))
    });
    const feature9 = new Feature({
      geometry: new Point(olProj.fromLonLat([29.35247, 60.84673]))
    });

    return [feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9];
  }
}
