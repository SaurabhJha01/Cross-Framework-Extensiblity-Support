import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-accord',
  templateUrl: './accord.component.html',
  styleUrls: ['./accord.component.css']
})
export class AccordComponent {
  @Input()  geometries: any;
  @Output() closePanel$: EventEmitter<void>

  constructor() {
    this.closePanel$ = new EventEmitter<void>();
  }

  closePanel() {
    this.closePanel$.emit();
  }

}
