import { Injectable } from '@angular/core';
import { ol } from 'ol/Map';

@Injectable({
  providedIn: 'root'
})
export class BaseAppLibService {
  private map: ol.Map;
  setMap(map: ol.Map): void {
    this.map = map;
  }

  getMap(): ol.Map {
    return this.map;
  }
}
