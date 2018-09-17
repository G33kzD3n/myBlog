import { TestBed, inject } from '@angular/core/testing';

import { StorecommentService } from './storecomment.service';

describe('StorecommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorecommentService]
    });
  });

  it('should be created', inject([StorecommentService], (service: StorecommentService) => {
    expect(service).toBeTruthy();
  }));
});
