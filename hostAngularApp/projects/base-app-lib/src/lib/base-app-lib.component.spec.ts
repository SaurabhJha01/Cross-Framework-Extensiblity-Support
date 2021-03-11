import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAppLibComponent } from './base-app-lib.component';

describe('BaseAppLibComponent', () => {
  let component: BaseAppLibComponent;
  let fixture: ComponentFixture<BaseAppLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAppLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAppLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
