import { TestBed, inject } from '@angular/core/testing';

import { ActivityTikerService } from './activity-tiker.service';

describe('ActivityTikerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityTikerService]
    });
  });

  it('should be created', inject([ActivityTikerService], (service: ActivityTikerService) => {
    expect(service).toBeTruthy();
  }));
});
