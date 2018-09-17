import { TestBed, inject } from '@angular/core/testing';

import { PostDetailService } from './post-detail.service';

describe('PostDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostDetailService]
    });
  });

  it('should be created', inject([PostDetailService], (service: PostDetailService) => {
    expect(service).toBeTruthy();
  }));
});
