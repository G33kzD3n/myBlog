import { TestBed, inject } from '@angular/core/testing';

import { HotTopicsService } from './hot-topics.service';

describe('HotTopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotTopicsService]
    });
  });

  it('should be created', inject([HotTopicsService], (service: HotTopicsService) => {
    expect(service).toBeTruthy();
  }));
});
