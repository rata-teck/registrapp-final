import { TestBed } from '@angular/core/testing';

import { PuenteService } from './puente.service';

describe('PuenteService', () => {
  let service: PuenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
