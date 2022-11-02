import { TestBed } from '@angular/core/testing';

import { PokemonCompareGuard } from './pokemon-compare.guard';

describe('PokemonCompareGuard', () => {
  let guard: PokemonCompareGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PokemonCompareGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
