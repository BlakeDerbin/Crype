import { TestBed } from '@angular/core/testing';

import { CurrencyrateControllerService } from './currencyrate-controller.service';

describe('CurrencyrateControllerService', () => {
  let service: CurrencyrateControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyrateControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
