import { TestBed } from '@angular/core/testing';

import { StripeApiService } from './stripe-api.service';

describe('StripeApiService', () => {
  let service: StripeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
