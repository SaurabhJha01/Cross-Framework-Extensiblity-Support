import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseAppLibModule, addLayerReducer } from 'base-app-lib';
import { AddPanelComponent } from './add-panel/add-panel.component';
import { StoreModule } from '@ngrx/store'; 
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './Effects/map-effects';
import { LegendPanelComponent } from './legend-panel/legend-panel.component';
import { VideoComponent } from './video/video.component';
import { CustomExtModuleComponent } from './custom-ext-module/custom-ext-module.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    AddPanelComponent,
    LegendPanelComponent,
    VideoComponent,
    CustomExtModuleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,    
    GoogleChartsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BaseAppLibModule,
    StoreModule.forRoot({data: addLayerReducer},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false
        },
      }),
    EffectsModule.forRoot([MapEffects]),
  ],
  exports: [CommonModule, BrowserModule],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }


