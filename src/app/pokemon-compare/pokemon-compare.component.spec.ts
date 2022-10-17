import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCompareComponent } from './pokemon-compare.component';

describe('PokemonCompareComponent', () => {
  let component: PokemonCompareComponent;
  let fixture: ComponentFixture<PokemonCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
