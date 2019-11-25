import { TestBed } from '@angular/core/testing';

import { CoursesDataService } from './courses-data.service';

describe('CoursesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesDataService = TestBed.get(CoursesDataService);
    expect(service).toBeTruthy();
  });
});
