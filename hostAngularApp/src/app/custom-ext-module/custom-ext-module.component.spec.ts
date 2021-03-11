import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExtModuleComponent } from './custom-ext-module.component';

describe('CustomExtModuleComponent', () => {
  let component: CustomExtModuleComponent;
  let fixture: ComponentFixture<CustomExtModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomExtModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomExtModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
