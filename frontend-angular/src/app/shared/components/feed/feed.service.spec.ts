import { TestBed } from '@angular/core/testing';

import { FeedServiceService } from './feed.service';

describe('FeedServiceService', () => {
  let service: FeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
