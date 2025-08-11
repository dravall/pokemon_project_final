import { TestBed } from '@angular/core/testing';

import { Poke } from './poke';

describe('Poke', () => {
  let service: Poke;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Poke);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
