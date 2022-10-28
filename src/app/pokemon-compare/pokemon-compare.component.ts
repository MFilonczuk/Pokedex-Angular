import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { IPokemonDetails } from '../interfaces/IPokemon-details';
import { PokemonDetailsService } from '../../services/pokemon-details.service';
import { PokemonCompareService } from '../../services/pokemon-compare.service';
import { IPokemonCompare } from '../interfaces/IPokemonCompare';

@Component({
  selector: 'app-pokemon-compare',
  templateUrl: './pokemon-compare.component.html',
  styleUrls: ['./pokemon-compare.component.css'],
})
export class PokemonCompareComponent implements OnInit {
  sub: Subscription = new Subscription();
  firstPokemondDetails!: IPokemonDetails;
  secondPokemonDetails!: IPokemonDetails;

  pokemonCompareArray: IPokemonCompare[] = [];

  constructor(
    private pokemonDetailsService: PokemonDetailsService,
    private pokemoncompareService: PokemonCompareService
  ) {}

  ngOnInit() {
    console.log(this.pokemonCompareArray);
    this.sub = this.pokemoncompareService.selectedPokemons$.subscribe(
      (selectedPokemons) => {
        forkJoin([
          this.pokemonDetailsService.getPokemonDetails(selectedPokemons[0].id),
          this.pokemonDetailsService.getPokemonDetails(selectedPokemons[1].id),
        ]).subscribe((response) => {
          this.firstPokemondDetails = response[0];
          this.secondPokemonDetails = response[1];
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
