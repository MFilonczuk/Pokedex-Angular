import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PokemonDetailsService } from 'src/services/pokemon-details.service';
import { IPokemonDetails } from '../interfaces/IPokemon-details';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  sub!: Subscription;
  pokemonId: string | any = '1';

  pokemonDetails: IPokemonDetails = {
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

  constructor(
    private router: Router,
    private pokemonDetailsService: PokemonDetailsService
  ) {}

  ngOnInit(): void {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.pokemonId = snapshot.url.split('/').pop();

    this.sub = this.pokemonDetailsService
      .getPokemonDetails(this.pokemonId)
      .subscribe((response) => {
        const pokemon$: Observable<any>[] | any = [];
        pokemon$.push(response);

        this.pokemonDetails.id = pokemon$[0].id;
        this.pokemonDetails.name = pokemon$[0].forms[0].name;
        this.pokemonDetails.type = pokemon$[0].types[0].type.name;
        this.pokemonDetails.abilities = pokemon$[0].abilities;
        this.pokemonDetails.img = pokemon$[0].sprites.front_default;
        this.pokemonDetails.hp = pokemon$[0].stats[0].base_stat;
        this.pokemonDetails.atk = pokemon$[0].stats[1].base_stat;
        this.pokemonDetails.def = pokemon$[0].stats[2].base_stat;
        this.pokemonDetails.weight = pokemon$[0].weight;
        this.pokemonDetails.xp = pokemon$[0].base_experience;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
