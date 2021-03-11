import { Component, ViewChild, ViewContainerRef, Compiler, Injector, NgModuleRef, OnInit } from '@angular/core';
import { CustomModulesCollectionService } from '../custom-modules-collection.service';
import { Store } from '@ngrx/store';
import { OlMapState, getOlMapState, AddVectorLayerAction, BaseAppLibService} from 'base-app-lib';

declare const SystemJS: any;



@Component({
  selector: 'app-legend-panel',
  templateUrl: './legend-panel.component.html',
  styleUrls: ['./legend-panel.component.css']
})
export class LegendPanelComponent implements OnInit {
  customTemplateType: string;
  @ViewChild('vcr', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private customModulesCollectionService: CustomModulesCollectionService, 
    private baseAppLibService: BaseAppLibService,
    private store: Store<OlMapState>,
    private _compiler: Compiler, private _injector: Injector,  
    private moduleRef:  NgModuleRef<any>) {
    this.customTemplateType = 'Select';    
  }

  ngOnInit() {
    this.store.select(getOlMapState).subscribe((olMapState: any) => {
      const map = this.baseAppLibService.getMap();
      if (olMapState.data.vectorLayers && olMapState.data.vectorLayers.length) {
        const layer = olMapState.data.vectorLayers[0];
        map.addLayer(layer);
      }
    });
  }

  changeCustomTemplate() {
    this.loadCustomTemplateViaSystemJS();
    //this.loadCustomTemplateViaAngularHtmlOnly();

  }

  /**
 * It loads the google chart custom angular template
 */
  private getChartCustomTemplateOptions() {
    return {
      url: 'http://localhost:3000/getChartCustomTemplate',
      data: {
        chartData: this.customModulesCollectionService.getBarChartData()
      },
      vcr: this.container
    }

  }
  /**
   * It loads the generic custom angular template
   * Custom template styling option can also be passed as shown below
   * Style.css of base apllication and brand.css can be used to style custom template.
   * However, the styles defined in component's css file of base application cannot be used to style custom template
   */

  private getColumnLabelCustomTemplateOptions() {
    return {
      url: 'http://localhost:3000/getColumnLabelCustomTemplate',
      data: {
        hasFeatureValue: true,
        value: 30
      },
      vcr: this.container,
      styles: [`
     .customColor {
         background-color: silver
      }
     .column-info {
       position: relative;
       height: 200px;
       width: 200px;
       background-color: white
     }
  `]
    }
  }

  private loadCustomTemplateViaAngularHtmlOnly() {
    let customTemplateOptions;
    if (this.customModulesCollectionService.cmpRef) {
      this.customModulesCollectionService.cmpRef.destroy();
    }
    switch (this.customTemplateType) {
      case 'Pie Chart':
        customTemplateOptions = this.getChartCustomTemplateOptions();
        break;
      case 'Column Label':
        customTemplateOptions = this.getColumnLabelCustomTemplateOptions();
        break;
    }
    this.customModulesCollectionService.readCustomTemplates(customTemplateOptions);

  }

  private async loadCustomTemplateViaSystemJS() {
    // To load ts file
    const pathToExternalModule = "http://localhost:3000/customerconfigurations/theme/infotemplates/google-chart/chart-template.module.ts";
    SystemJS.config({
      packages: {
        "ts": {
          "main": "lib/plugin.js"
        },
        "typescript": {
          "main": "lib/typescript.js",
          "meta": {
            "lib/typescript.js": {
              "exports": "ts"
            }
          }
        }
      },
      map: {
        "ts": "https://npmcdn.com/plugin-typescript@8.0.0",
        "typescript": "https://npmcdn.com/typescript@4.1.3"
      },
      transpiler: 'ts'
    });

    const module = await SystemJS.import(pathToExternalModule);
    this._compiler.compileModuleAndAllComponentsAsync(module['ChartTemplateModule'])
    .then((factories) => {
      const f = factories.componentFactories[0];
      const cmpRef = f.create(this._injector, [], null, this.moduleRef);
      const data = {
        chartData: {
          title: 'Population (in millions)',
          type: 'BarChart',
          data: [
            ["2012", 900],
            ["2013", 1000],
            ["2014", 1170],
            ["2015", 1250],
            ["2016", 1530]
          ],
          columnNames: ['Year', 'Asia'],
          options: {
          },
          width: 550,
          height: 400
        }
      }
      Object.assign(cmpRef.instance, data);
      cmpRef.changeDetectorRef.detectChanges();
      this.container.insert(cmpRef.hostView);
    });

   // 2nd approach to compile

    // const moduleFactory = await this._compiler
    //   .compileModuleAsync<any>(module["PluginAModule"]);


    // const moduleRef = moduleFactory.create(this._injector);

    // //get the custom made provider name 'plugins' 
    // const componentProvider = moduleRef.injector.get('plugins');

    // //from plugins array load the component on position 0 
    // const componentFactory = moduleRef.componentFactoryResolver
    //   .resolveComponentFactory<any>(
    //     componentProvider[0][0].component
    //   );
    // const pluginComponent = this.container.createComponent(componentFactory);

    // pluginComponent.instance.chartData = {
    //   title: 'Population (in millions)',
    //   type: 'BarChart',
    //   data: [
    //     ["2012", 900],
    //     ["2013", 1000],
    //     ["2014", 1170],
    //     ["2015", 1250],
    //     ["2016", 1530]
    //   ],
    //   columnNames: ['Year', 'Asia'],
    //   options: {
    //   },
    //   width: 550,
    //   height: 400
    // };

    //accessing the component template view
    //(pluginComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

}
