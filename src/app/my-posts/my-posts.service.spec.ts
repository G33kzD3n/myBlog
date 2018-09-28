import { TestBed, inject } from '@angular/core/testing';

import { MyPostsService } from './my-posts.service';

describe('MyPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPostsService]
    });
  });

  it('should be created', inject([MyPostsService], (service: MyPostsService) => {
    expect(service).toBeTruthy();
  }));
});
