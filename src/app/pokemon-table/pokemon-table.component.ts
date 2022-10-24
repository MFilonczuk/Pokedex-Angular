import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { PokemonDataService } from 'src/services/pokemon-data.service';
import { PokemonTableService } from 'src/services/pokemon-table.service';
import { IPokemon } from '../interfaces/IPokemon';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css'],
})
export class PokemonTableComponent {
  @ViewChild(Table) test: any;

  totalRecords!: number;

  cols!: any[];

  pokemon: IPokemon = {
    id: '',
    name: '',
    type: '',
    abilities: [],
  };
  pokemonArray: IPokemon[] = [];
  displayedColumns: string[] = ['id', 'name', 'types', 'abilities', 'actions'];
  length: number = 10;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  sub!: Subscription;
  rowsNumber: number = 10;
  upperBound: number = 10;
  lowerBound: number = 0;
  last: number = 10;
  temp: string = '';
  first: number = 0;
  loading!: boolean;
  selectAll: boolean = false;
  displayModal: boolean = false;
  spellsArray: any[] = [];

  constructor(
    private pokemonTableService: PokemonTableService,
    private pokemonDataService: PokemonDataService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  showModalDialog(abilitiesArray: any[]) {
    this.displayModal = true;
    this.spellsArray = [];
    abilitiesArray.forEach((ability) => {
      this.spellsArray.push(ability);
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  goToPokemonDetails(id: number): void {
    this.router.navigate([`/details/${id}`]);
  }

  loadPokemons(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.sub = this.pokemonTableService
        .getPokemons(this.lowerBound, this.upperBound)
        .subscribe((response) => {
          this.length = response.count;
          const pokemonList$: Observable<any>[] = [];
          this.first = this.last / this.rowsNumber;
          this.lowerBound = this.first * 10;
          this.upperBound = this.lowerBound + 10;
          this.pokemonArray = [];

          response.results.forEach((poke) => {
            pokemonList$.push(
              this.pokemonDataService.getPokemonsData(poke.url)
            );
          });
          forkJoin(pokemonList$).subscribe((response) => {
            response.forEach((pokemonDetails) => {
              this.pokemon = {
                id: '',
                name: '',
                type: '',
                abilities: [],
              };

              this.pokemon.id = pokemonDetails.id;
              this.pokemon.name = pokemonDetails.forms[0].name;
              this.pokemon.type = pokemonDetails.types[0].type.name;
              this.pokemon.abilities = pokemonDetails.abilities;
              this.pokemonArray.push(this.pokemon);
              this.last = parseInt(
                this.pokemonArray[this.pokemonArray.length - 1].id
              );
            });
            console.log(this.pokemonArray);
            this.loading = false;
            console.log('Current page is ' + this.first);
          });
        });

      console.log('lower ' + this.lowerBound);
      console.log('upper ' + this.upperBound);
      console.log('last number ' + this.last);
    }, 500);
  }

  //////////////////////////////////////////////////////

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
