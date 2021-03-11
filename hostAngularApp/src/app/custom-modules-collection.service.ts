import {Component, Compiler,Inject, Injector, Injectable, NgModule, NgModuleRef, ViewContainerRef } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class CustomModulesCollectionService {
  customModuleJsonData: any[];
  cmpRef: any;

  constructor(private compiler: Compiler, 
    private injector: Injector,
    private moduleRef: NgModuleRef<any>,
    @Inject(DOCUMENT) private document: Document,) {
    this.customModuleJsonData = [];
  }

  /**
   * It reads the customModule config file
   */
  readCustomAnalystModuleConfig() {
    const xhttp = new XMLHttpRequest();
    const that = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // parse customModuleAnalyst json file
        const customModuleJsonData = JSON.parse(this.responseText);
        that.customModuleJsonData = customModuleJsonData;
      }
    };
    xhttp.open("GET", "http://localhost:3000/metaData", false);
    xhttp.send();
  }
 /**
  * It injects the info templates
  * @param template 
  * @param vcr 
  * @param properties 
  */
 readCustomTemplates(options) {
  const xhttp = new XMLHttpRequest();
  const that = this; 
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      that.injectCustomTemplate(this.responseText, options.vcr, options.data, options.styles);
    }
  };
  xhttp.open("GET", options.url, false);
  xhttp.send();
} 


  loadBrandCss(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  getPieChartData() {
    return {
      title : 'Browser market shares at a specific website, 2014',
      type : 'PieChart',
      data : [
         ['Firefox', 45.0],
         ['IE', 26.8],
         ['Chrome', 12.8],
         ['Safari', 8.5],
         ['Opera', 6.2],
         ['Others', 0.7] 
      ],
      columnNames : ['Browser', 'Percentage'],
      options : {          
      },
      width : 550,
      height : 400
    }
  }

  getBarChartData() {
    return {
      title : 'Population (in millions)',
      type : 'BarChart',
      data : [
        ["2012", 900],
        ["2013", 1000],
        ["2014", 1170],
        ["2015", 1250],
        ["2016", 1530]
      ],
      columnNames : ['Year', 'Asia'],
      options : {          
      },
      width : 550,
      height : 400
    }
  }


  private injectCustomTemplate(template: any,  vcr: ViewContainerRef, properties?: any, styles?: any) {
    const tmpCmp = Component({ template, styles })(class { });
    // Now, also create a dynamic module.
    const tmpModule = NgModule({
      declarations: [tmpCmp],
      imports: [BrowserModule, CommonModule, GoogleChartsModule]
    })(class { });

    /**
     * Since we are using JIT compilation in AOT compiled host application, it will work with dev build using ng build --aot
     * But, it will throw error when we use ng build --prod that JIT compilation failed and Use AOT instead. This a feature provided by IVY to make sure we don't have JIT compilation inside AOT compiled application
     * However, our use case demands to have JIT compilation mixed with AOT for custom templates, hence to make ng build --prod to work, we need to set optimization flag to false inside angular.json.
     * This flag helps in tree shaking, css and font inlining. So, the trade off is that to get JIT work with AOT in IVY production mode,
     * We have to leave these optimizations. 
  
     * Error: Angular JIT compilation failed: '@angular/compiler' not loaded!
     * JIT compilation is discouraged for production use-cases! Consider AOT mode instead.
     * Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?
     */
    this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        this.cmpRef = f.create(this.injector, [], null, this.moduleRef);
        Object.assign(this.cmpRef.instance, properties);
        this.cmpRef.changeDetectorRef.detectChanges();
        vcr.insert(this.cmpRef.hostView);
      });
  }

}
