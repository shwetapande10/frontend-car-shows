import { TestBed } from '@angular/core/testing';

import { CarsShowHierarchyService } from './cars-show-hierarchy.service';

describe('CarsShowHierarchyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarsShowHierarchyService = TestBed.get(CarsShowHierarchyService);
    expect(service).toBeTruthy();
  });
});
