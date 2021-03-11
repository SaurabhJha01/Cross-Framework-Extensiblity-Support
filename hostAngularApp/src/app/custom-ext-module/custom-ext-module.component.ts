import { Component, Injector, ComponentFactoryResolver, ElementRef, ViewContainerRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CustomModulesCollectionService } from '../custom-modules-collection.service';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { BaseAppLibService, OlMapState } from 'base-app-lib';
import { Store } from '@ngrx/store';

/**
 * Every component in the base application just has to put app-custom-ext-module entry into its html for this extensible component.
 * This component based on custom moudle config json file entries takes decision whether the extensible component needs to
 * be loaded into the parent componet which has app-custom-ext-module and then loads it.
 * Similary, it first checks whether the corresponding component inside its parent component or some other element needs to be removed
 * based on custom config json file and then deletes after verifying.
 */


/**
 * This component needs to be put without any container div inside its parent component.
 * Otherwise, this.el.nativeElement.parentElement will return the container div instead of the parent component dom .
*/
@Component({
  selector: 'app-custom-ext-module',
  templateUrl: './custom-ext-module.component.html',
  styleUrls: ['./custom-ext-module.component.css']
})
export class CustomExtModuleComponent implements AfterViewInit {

  constructor(private el: ElementRef, private vcr: ViewContainerRef, private renderer: Renderer2,
    private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver,
    private customModulesCollectionService: CustomModulesCollectionService,
    private store: Store<OlMapState>,
    private baseAppLibService: BaseAppLibService) { }

  ngAfterViewInit(): void {
    for (let i = 0; i < this.customModulesCollectionService.customModuleJsonData.length; i++) {
      const customModuleJsonData = this.customModulesCollectionService.customModuleJsonData[i];
      this.handleBaseApplicationComponentDeletion(this.el.nativeElement.parentElement, customModuleJsonData);
      this.handleExtensibleComponentInsertion(this.el.nativeElement.parentElement, customModuleJsonData);
    }
  }

  private handleBaseApplicationComponentDeletion(elem$, customModuleJsonData) {
    let removePlaceholderElem = null;
    if (customModuleJsonData.remove_Placeholder) {
      if (elem$.tagName.toLowerCase() === customModuleJsonData.remove_Placeholder.toLowerCase()) {
        removePlaceholderElem = elem$;
      } else if (elem$.querySelector(customModuleJsonData.remove_Placeholder)) {
        // Check for element or component tag
        removePlaceholderElem = elem$.querySelector(customModuleJsonData.remove_Placeholder);
      } else if (elem$.querySelector("#" + customModuleJsonData.remove_Placeholder)) {
        // Check for element or component id
        removePlaceholderElem = elem$.querySelector("#" + customModuleJsonData.remove_Placeholder);
      } else if (elem$.querySelector("." + customModuleJsonData.remove_Placeholder)) {
        // Check for element or component class
        removePlaceholderElem = elem$.querySelector("." + customModuleJsonData.remove_Placeholder);
      }
      if (removePlaceholderElem) {
        this.renderer.removeChild(elem$, removePlaceholderElem);
      }
    }
  }

  private handleExtensibleComponentInsertion(elem$, customModuleJsonData) {
    const insertionPlaceholderOptions = this.checkForInsertion(elem$, customModuleJsonData);
    if (insertionPlaceholderOptions && insertionPlaceholderOptions.parentPlaceHolderElem) {
      loadRemoteModule({
        remoteEntry: 'http://localhost:3000/' + customModuleJsonData.modulePath,
        remoteName: customModuleJsonData.name,
        exposedModule: customModuleJsonData.moduleName
      })
        .then(module => {
          if (customModuleJsonData.webElement_name) {
            this.processNonAngularExtensibleComponent(customModuleJsonData, insertionPlaceholderOptions);
          }
          else {
            this.processAngularExtensibleComponent(module, customModuleJsonData, insertionPlaceholderOptions);
          }
        })
    }
  }

  private processAngularExtensibleComponent(module, customModuleJsonData, insertionPlaceholderOptions) {
    /**
     * Whenever we make any change in React application
     * Build the React application and copy the content of dist folder to C:\code\customerconfigurations\extensions\extCompReact
     * We only need to run npm run build for this apporach and NOT npm run build && npm run package
     */
    const componentType = module[customModuleJsonData.moduleName].getComponent()
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const comp = this.vcr.createComponent(componentFactory, null, this.injector);
    // Inject extensible component at a spepcified location 
    this.renderer.insertBefore(insertionPlaceholderOptions.parentPlaceHolderElem, comp.location.nativeElement,
      insertionPlaceholderOptions.siblingtPlaceHolderElem);

  }

  private processNonAngularExtensibleComponent(customModuleJsonData, insertionPlaceholderOptions) {
    //<mfe4-element></mfe4-element>
    const element = document.createElement(customModuleJsonData.webElement_name);
    element.objInput = {
      map: this.baseAppLibService.getMap(),
      store: this.store
    };
    insertionPlaceholderOptions.parentPlaceHolderElem.appendChild(element);
  }

  private checkForInsertion(elem$, customModuleJsonData) {
    let parentPlaceHolderElem = null, siblingtPlaceHolderElem = null;
    if (customModuleJsonData.parent_Placeholder) {
      if (elem$.querySelector("#" + customModuleJsonData.parent_Placeholder)) {
        // Check for element or component id
        parentPlaceHolderElem = elem$.querySelector("#" + customModuleJsonData.parent_Placeholder);
      } else if (elem$.querySelector("." + customModuleJsonData.parent_Placeholder)) {
        // Check for element or component class
        parentPlaceHolderElem = elem$.querySelector("." + customModuleJsonData.parent_Placeholder);
      }
    }

    if (customModuleJsonData.sibling_Placeholder) {
      if (elem$.querySelector("#" + customModuleJsonData.sibling_Placeholder)) {
        // Check for element or component id
        siblingtPlaceHolderElem = elem$.querySelector("#" + customModuleJsonData.sibling_Placeholder);
      } else if (elem$.querySelector("." + customModuleJsonData.sibling_Placeholder)) {
        // Check for element or component class
        siblingtPlaceHolderElem = elem$.querySelector("." + customModuleJsonData.sibling_Placeholder);
      }
    }

    if (parentPlaceHolderElem) {
      return {
        parentPlaceHolderElem: parentPlaceHolderElem,
        siblingtPlaceHolderElem: siblingtPlaceHolderElem
      }
    } else {
      return false;
    }
  }

}
