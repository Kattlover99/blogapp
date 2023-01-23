import { TestBed } from '@angular/core/testing';

import { InstagramApiService } from './instagram-api.service';

describe('InstagramApiService', () => {
  let service: InstagramApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstagramApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
