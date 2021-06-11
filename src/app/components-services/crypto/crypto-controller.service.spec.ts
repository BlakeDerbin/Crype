import { TestBed } from '@angular/core/testing';

import { CryptoControllerService } from './crypto-controller.service';

describe('CryptoControllerService', () => {
  let service: CryptoControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
