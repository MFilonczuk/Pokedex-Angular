import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { PokemonDataService } from 'src/services/pokemon-data.service';
import { PokemonTableService } from 'src/services/pokemon-table.service';
import { IPokemon } from '../interfaces/IPokemon';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css'],
})
export class PokemonTableComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pokemon: IPokemon = {
    id: '',
    name: '',
    img: '',
    type: '',
    abilities: [],
  };
  pokemonArray: IPokemon[] = [];
  dataSource: IPokemon[] = [];
  displayedColumns: string[] = ['id', 'name', 'types', 'abilities', 'actions'];
  length: number = 10;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  temp: any[] = [];
  sub!: Subscription;

  constructor(
    private pokemonTableService: PokemonTableService,
    private pokemonDataService: PokemonDataService
  ) {}

  ngAfterViewInit(): void {
    this.sub = this.pokemonTableService.getPokemons().subscribe((response) => {
      this.length = response.count;

      const pokemonList$: Observable<any>[] = [];

      response.results.forEach((poke) => {
        pokemonList$.push(this.pokemonDataService.getPokemonsData(poke.url));
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
          this.dataSource = this.pokemonArray;
          console.log(this.dataSource);
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
