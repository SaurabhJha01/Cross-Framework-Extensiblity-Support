
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { GoogleChartsModule } from 'angular-google-charts';

declare const SystemJS;
import * as angularCore from '@angular/core';
import * as angularCommon from '@angular/common';

import * as formsModule from '@angular/forms';
import * as ngRxStore from '@ngrx/store';
import * as angularGoogleCharts from 'angular-google-charts';
import * as baseAppLib from 'base-app-lib';
import * as rxjs from 'rxjs';
import * as operators from 'rxjs/operators';
import * as tsLib from 'tsLib';

SystemJS.set('@angular/core', SystemJS.newModule(angularCore));
SystemJS.set('@angular/common', SystemJS.newModule(angularCommon));
SystemJS.set('@angular/forms', SystemJS.newModule(formsModule));
SystemJS.set('@ngrx/store', SystemJS.newModule(ngRxStore));
SystemJS.set('angular-google-charts', SystemJS.newModule(angularGoogleCharts));
SystemJS.set('base-app-lib', SystemJS.newModule(baseAppLib));
SystemJS.set('rxjs', SystemJS.newModule(rxjs));
SystemJS.set('rxjs/operators', SystemJS.newModule(operators));
SystemJS.set('tsLib', SystemJS.newModule(tsLib));


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
