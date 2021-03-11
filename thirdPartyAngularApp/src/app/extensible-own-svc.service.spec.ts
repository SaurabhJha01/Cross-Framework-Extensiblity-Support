import { TestBed } from '@angular/core/testing';

import { ExtensibleOwnSvcService } from './extensible-own-svc.service';

describe('ExtensibleOwnSvcService', () => {
  let service: ExtensibleOwnSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtensibleOwnSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
