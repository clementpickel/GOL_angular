import { TestBed } from '@angular/core/testing';

import { GolService } from './gol.service';

describe('GolService', () => {
  let service: GolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
