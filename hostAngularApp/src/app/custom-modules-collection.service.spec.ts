import { TestBed } from '@angular/core/testing';

import { CustomModulesCollectionService } from './custom-modules-collection.service';

describe('CustomModulesCollectionService', () => {
  let service: CustomModulesCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomModulesCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
