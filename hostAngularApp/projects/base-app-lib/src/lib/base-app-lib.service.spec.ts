import { TestBed } from '@angular/core/testing';

import { BaseAppLibService } from './base-app-lib.service';

describe('BaseAppLibService', () => {
  let service: BaseAppLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseAppLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
