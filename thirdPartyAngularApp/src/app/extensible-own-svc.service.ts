import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtensibleOwnSvcService {
  rootInjectorSvc: boolean

  constructor() {
    this.rootInjectorSvc = true;
   }
}
