import { Component, OnInit } from '@angular/core';
import { PokemonCompareService } from '../../services/pokemon-compare.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPokemonCompare } from '../interfaces/IPokemonCompare';

@Component({
  selector: 'app-pokemon-navbar',
  templateUrl: './pokemon-navbar.component.html',
  styleUrls: ['./pokemon-navbar.component.css'],
})
export class PokemonNavbarComponent implements OnInit {
  pageTitle: string = 'POKEDEX';
  sub: Subscription = new Subscription();
  selectedPokemons: IPokemonCompare[] = [];

  constructor(
    private pokemonToCompare: PokemonCompareService,
    private router: Router
  ) {}

  get isButtonDisabled(): boolean {
    return this.selectedPokemons.length < 2;
  }

  ngOnInit(): void {
    this.sub = this.pokemonToCompare.selectedPokemons$.subscribe(
      (selectedPokemons) => {
        this.selectedPokemons = selectedPokemons;
      }
    );
  }

  removePokemon(id: string): void {
    this.pokemonToCompare.removePokemonFromCompare(id);
  }

  goToDetails(): void {
    this.router.navigate([`/compare`]);
  }
}
