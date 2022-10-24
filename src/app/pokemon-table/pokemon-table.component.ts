import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { PokemonDataService } from 'src/services/pokemon-data.service';
import { PokemonTableService } from 'src/services/pokemon-table.service';
import { IPokemon } from '../interfaces/IPokemon';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css'],
})
export class PokemonTableComponent {
  @ViewChild(Table) currentPageReportTemplate: any;

  totalRecords!: number;

  cols!: any[];

  rowsNumber: number = 10;

  upperBound: number = 10;

  lowerBound: number = 0;

  last: number = 10;

  temp: string = '';

  pageNumber: number = 1;

  first: number = 1;

  loading!: boolean;

  selectAll: boolean = false;

  displayModal: boolean = false;

  @Input() abilitiesArray!: any[];

  showModalDialog() {
    this.displayModal = true;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  testowa(): any {
    return 'xD';
  }

  loadPokemons(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.sub = this.pokemonTableService
        .getPokemons(this.lowerBound, this.upperBound)
        .subscribe((response) => {
          this.length = response.count;
          const pokemonList$: Observable<any>[] = [];

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
                img: '',
                type: '',
                abilities: [],
              };
              this.pokemon.id = pokemonDetails.id;
              this.pokemon.name = pokemonDetails.forms[0].name;
              this.pokemon.img = pokemonDetails.sprites.front_default;
              this.pokemon.type = pokemonDetails.types[0].type.name;
              this.pokemon.abilities = pokemonDetails.abilities;
              this.pokemonArray.push(this.pokemon);
              // console.log(this.pokemonArray);
              this.last = parseInt(
                this.pokemonArray[this.pokemonArray.length - 1].id
              );
            });
            console.log('last number ' + this.last);
            console.log(this.pokemonArray);

            this.first = this.last / this.rowsNumber;
            this.lowerBound = this.pageNumber * 10;
            this.upperBound = this.lowerBound + 10;
            this.loading = false;
          });
        });

      console.log('pageNumber ' + this.first);
      console.log('lower ' + this.lowerBound);
      console.log('upper ' + this.upperBound);
    }, 500);
  }

  //////////////////////////////////////////////////////

  pokemon: IPokemon = {
    id: '',
    name: '',
    img: '',
    type: '',
    abilities: [],
  };
  pokemonArray: IPokemon[] = [];
  displayedColumns: string[] = ['id', 'name', 'types', 'abilities', 'actions'];
  length: number = 10;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  sub!: Subscription;

  constructor(
    private pokemonTableService: PokemonTableService,
    private pokemonDataService: PokemonDataService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
