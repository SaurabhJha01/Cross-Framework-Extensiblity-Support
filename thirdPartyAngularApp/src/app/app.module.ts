
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseAppLibModule } from 'base-app-lib';
import { AccordComponent } from './accord/accord.component';
import { AccordionModule } from 'primeng/accordion';
/**
 * If we import something at the top and then don't include inside the ngModule below, sometimes the module fedeartion throws error 
 * when we load this extensible application into base application.
 * Also, it makes no sence importing anything at the top but not inlcuding in the ngModule below.
 */

@NgModule({
  declarations: [
    AppComponent,
    AccordComponent
  ],
  imports: [CommonModule,
    BaseAppLibModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ExtModule { 
  static getComponent() {
    return AppComponent
  }
}
