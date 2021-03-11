import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OlMapState, getOlMapState, AddVectorLayerAction, BaseAppLibService} from 'base-app-lib';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.css']
})
export class AddPanelComponent implements OnInit {
  showWebMap: boolean;
  emittedWebComponentValue: any;
  webComponentInput: any;
  playersList: any;
  name: any;
  favoriteColor: string;

  constructor(private baseAppLibService: BaseAppLibService, private store: Store<OlMapState>) {
    this.playersList = ["Sachin", "Dravid", "Ganguly", "Laxman"];
    this.name = new FormControl('Saurabh'); 
    this.favoriteColor = "RED";
  }

  ngOnInit() {
    this.store.select(getOlMapState).subscribe((olMapState: any) => {
      const map = this.baseAppLibService.getMap();
      if (olMapState.data.vectorLayers && olMapState.data.vectorLayers.length) {
        const layer = olMapState.data.vectorLayers[0];
        map.addLayer(layer);
      }
    });

      /**
        * We can also pass input to Angular web componet by taking its dom element  and attached input object directly
        * to the element as how we do in custommodule component when we want to pass input to react web component.
        * This dom appraoch is exactly similar in whichever framework web components we work with and hence makes
        * life easier as nothing new has to be done to pass inout whether we want to pass input to angular web component
        * or to react web componet or to any web componet 
              
        *  The below way of pasisng input to angul;ar web component from angular application holds true only for
        *  angular web componet where in html, we have the angular syntaxx of wraaping it inside [] to pass.
        * The below way can also be used tp pass input to angular web component from React application but then 
        * in react we don't have this [] sysntax to pass inputs. So, there
        * we have to stringify the input object inside React and pass it inside {} which is React way of passing input and 
        * then angular web component  has to use JSON.parse.
        * The drawbacks of the below approach is that we can see it is a bit different the way it is passed. 
        * [] way in angular and {} in react. So, it is not similar and hence have to evaluate in each framework how to pass
        * inputs.
        * The other drawback is JSON.stringiy removes the method of json object so, this way can't be used to pass open layer map
        * or ng/rx store instance as input.
        
       *So the best way is to grand the dom element of corresponding web component and attach all the inputs to that dom element.
       * Every part of object will be avaliable as no stringy and parse would be required and it would be same in all the framewroks
       * the way they get handled as they are pure dom manipulations
      
        */
       const featuresList = this.getFeatures();
       const vectorSource: VectorSource = new VectorSource({
         features: featuresList
       });

    this.webComponentInput = { 
      map: this.baseAppLibService.getMap(),
      store: this.store,
      vectorSource: vectorSource
     }
  }

  
  readFromWebComponent($event) {
    // Angular 11 $event.originalEvent.detail
    this.emittedWebComponentValue = $event.detail.key1;
    const svcInstanceFromWebComponent = $event.detail.svcInstance;
    /**
     * Usage of singleton service
     * But we can't use methods of service as we can pass data only after stringifying and receive via JSON.parse which removes the methods
     * and only retains the data  members */ 
    svcInstanceFromWebComponent.framework = "Change Angular Web component SVC memeber from Angular host application"; 
    this.baseAppLibService.getMap().addLayer($event.detail.layer);   
  }

  addVectorLayer() {
    const featuresList = this.getFeatures();
    const vectorSource: VectorSource = new VectorSource({
      features: featuresList
    });
    this.store.dispatch(AddVectorLayerAction({ vectorSource }));
  }

  addWebElementMap() {
    this.showWebMap = true; 
  }

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

  ngOnDestroy() {}
}




