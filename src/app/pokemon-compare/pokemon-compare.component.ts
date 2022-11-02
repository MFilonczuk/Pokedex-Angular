import { Component } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { PokemonDetailsService } from '../../services/pokemon-details.service';
import { PokemonCompareService } from '../../services/pokemon-compare.service';
import { IPokemonDetails } from '../interfaces/IPokemon-details';

@Component({
  selector: 'app-pokemon-compare',
  templateUrl: './pokemon-compare.component.html',
  styleUrls: ['./pokemon-compare.component.css'],
})
export class PokemonCompareComponent {
  sub: Subscription = new Subscription();
  firstPokemonDetails: IPokemonDetails = {
    id: '',
    name: '',
    img: '',
    type: '',
    abilities: [],
    hp: '',
    atk: '',
    def: '',
    weight: '',
    xp: '',
  };
  secondPokemonDetails: IPokemonDetails = {
    id: '',
    name: '',
    img: '',
    type: '',
    abilities: [],
    hp: '',
    atk: '',
    def: '',
    weight: '',
    xp: '',
  };

  tempArray: any[] = [];

  constructor(
    private pokemonDetailsService: PokemonDetailsService,
    private pokemoncompareService: PokemonCompareService
  ) {}

  get firstType(): string {
    return this.firstPokemonDetails.type;
  }

  get secondType(): string {
    return this.secondPokemonDetails.type;
  }

  ngOnInit() {
    this.sub = this.pokemoncompareService.selectedPokemons$.subscribe(
      (selectedPokemons) => {
        forkJoin([
          this.pokemonDetailsService.getPokemonDetails(selectedPokemons[0].id),
          this.pokemonDetailsService.getPokemonDetails(selectedPokemons[1].id),
        ]).subscribe((response: any[]) => {
          this.firstPokemonDetails.id = response[0].id;
          this.firstPokemonDetails.name = response[0].name;
          this.firstPokemonDetails.type = response[0].types[0].type.name;
          this.firstPokemonDetails.abilities = response[0].abilities;
          this.firstPokemonDetails.img = response[0].sprites.front_default;
          this.firstPokemonDetails.hp = response[0].stats[0].base_stat;
          this.firstPokemonDetails.atk = response[0].stats[1].base_stat;
          this.firstPokemonDetails.def = response[0].stats[2].base_stat;
          this.firstPokemonDetails.weight = response[0].weight;
          this.firstPokemonDetails.xp = response[0].base_experience;

          this.secondPokemonDetails.id = response[1].id;
          this.secondPokemonDetails.name = response[1].name;
          this.secondPokemonDetails.type = response[1].types[0].type.name;
          this.secondPokemonDetails.abilities = response[1].abilities;
          this.secondPokemonDetails.img = response[1].sprites.front_default;
          this.secondPokemonDetails.hp = response[1].stats[0].base_stat;
          this.secondPokemonDetails.atk = response[1].stats[1].base_stat;
          this.secondPokemonDetails.def = response[1].stats[2].base_stat;
          this.secondPokemonDetails.weight = response[1].weight;
          this.secondPokemonDetails.xp = response[1].base_experience;

          this.tempArray.push(this.firstPokemonDetails.type);
          this.tempArray.push(this.secondPokemonDetails.type);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
