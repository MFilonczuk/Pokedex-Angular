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
  pokemonArray: IPokemon[] = [];
  displayedColumns: string[] = ['id', 'name', 'types', 'abilities', 'actions'];
  length: number = 10;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  sub!: Subscription;
  rowsNumber: number = 10;
  upperBound: number | any = 10;
  lowerBound: number | any = 0;
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
    this.loading = true;
  }

  goToPokemonDetails(id: string): void {
    console.log(id);
    this.router.navigate([`/details/${id}`]);
  }

  pokemonAbilitiesText(abilitiesArrayLength: number) {
    let modalText = '';
    if (abilitiesArrayLength > 2) {
      modalText = `${abilitiesArrayLength - 1} more abilities`;
    } else if (abilitiesArrayLength == 2) {
      modalText = `${abilitiesArrayLength - 1} more ability`;
    }

    return modalText;
  }

  loadPokemons(event: LazyLoadEvent) {
    this.loading = true;
    this.lowerBound = event?.first;
    this.upperBound = 10;

    this.pokemonArray = [];
    this.sub = this.pokemonTableService
      .getPokemons(this.lowerBound, this.upperBound)
      .subscribe((response) => {
        this.length = response.count;
        const pokemonList$: Observable<any>[] = [];

        response.results.forEach((poke) => {
          pokemonList$.push(this.pokemonDataService.getPokemonsData(poke.url));
        });
        forkJoin(pokemonList$).subscribe((response) => {
          response.forEach((pokemonDetails) => {
            const pokemon = {
              id: pokemonDetails.id,
              name: pokemonDetails.forms[0].name,
              type: pokemonDetails.types[0].type.name,
              abilities: pokemonDetails.abilities,
            };

            this.pokemonArray.push(pokemon);
          });
          console.log(this.pokemonArray);
          this.loading = false;
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
