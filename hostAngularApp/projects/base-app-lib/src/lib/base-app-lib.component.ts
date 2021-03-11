import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { BaseAppLibService } from './base-app-lib.service';

@Component({
  selector: 'lib-baseAppLib',
  template: `
  <div class="lib-accord" *ngFor="let item of collection; let i = index">
      <button class="accordion" #btn>"{{collectionName}} {{i}}"</button>
        <div class="panel"> {{item | json}} </div>   
  </div>
  `,
  styleUrls: ['./base-app-lib.component.css']
})
export class BaseAppLibComponent implements OnInit, AfterViewInit {
  @Input() collection: any[];
  @Input() collectionName: string;
  constructor(private el: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const acc = this.el.nativeElement.querySelectorAll(".accordion");
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }
}
