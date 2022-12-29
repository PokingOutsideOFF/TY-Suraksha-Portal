import { TestBed } from '@angular/core/testing';

import { ClienthealthcareService } from './clienthealthcare.service';

describe('ClienthealthcareService', () => {
  let service: ClienthealthcareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienthealthcareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
