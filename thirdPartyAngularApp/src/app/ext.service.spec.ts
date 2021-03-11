import { TestBed } from '@angular/core/testing';

import { ExtService } from './ext.service';

describe('ExtService', () => {
  let service: ExtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
