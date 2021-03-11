import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { BaseAppLibService } from 'base-app-lib';
import { CustomModulesCollectionService } from './custom-modules-collection.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAddPanelOpen: boolean;
  isLegendPanelOpen: boolean;


  constructor(private baseAppLibService: BaseAppLibService,
    private customModulesCollectionService: CustomModulesCollectionService) { }

  ngOnInit() {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        })],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.baseAppLibService.setMap(map);
    this.customModulesCollectionService.readCustomAnalystModuleConfig();
    this.customModulesCollectionService.loadBrandCss('http://localhost:3000/getBrandCss');  
  }

  openAddPanel() {
    this.isAddPanelOpen = !this.isAddPanelOpen;
    this.isLegendPanelOpen = false;
  }

  openLegendPanel() {
    this.isLegendPanelOpen = !this.isLegendPanelOpen;
    this.isAddPanelOpen = false;   
  }

}



