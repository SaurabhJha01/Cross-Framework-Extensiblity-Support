import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtService {
  tempData: any

  constructor() { }

  setTempData(data) {
    this.tempData = data;
  }
}
