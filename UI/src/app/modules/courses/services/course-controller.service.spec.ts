import { TestBed } from '@angular/core/testing';

import { CourseControllerService } from './course-controller.service';

describe('CourseControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseControllerService = TestBed.get(CourseControllerService);
    expect(service).toBeTruthy();
  });
});
