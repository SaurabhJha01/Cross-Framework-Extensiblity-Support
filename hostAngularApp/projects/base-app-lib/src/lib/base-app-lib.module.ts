import { NgModule } from '@angular/core';
import { BaseAppLibComponent } from './base-app-lib.component';
import { CommonModule } from '@angular/common';
// import { StoreModule } from '@ngrx/store';
// import { addLayerReducer } from './store/reducers/map-reducer';

@NgModule({
  declarations: [BaseAppLibComponent],
  imports: [CommonModule],   
  // StoreModule.forRoot({test: addLayerReducer})],
  exports: [BaseAppLibComponent]
})
export class BaseAppLibModule { }
