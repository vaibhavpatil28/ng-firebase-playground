import { TestBed } from '@angular/core/testing';

import { SenderApiService } from './sender-api.service';

describe('SenderApiService', () => {
  let service: SenderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
