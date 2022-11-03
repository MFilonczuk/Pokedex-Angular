import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { PokemonDataService } from 'src/services/pokemon-data.service';
import { PokemonTableService } from 'src/services/pokemon-table.service';
import { IPokemon } from '../interfaces/IPokemon';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { PokemonCompareService } from '../../services/pokemon-compare.service';
import { IPokemonCompare } from '../interfaces/IPokemonCompare';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css'],
})
export class PokemonTableComponent implements OnInit {
  totalRecords!: number;
  cols!: any[];
  pokemonArray: IPokemon[] = [];
  length: number = 10;
  pageSize: number = 10;
  sub!: Subscription;
  rowsNumber: number = 10;
  lowerBound: number | any = 0;
  loading!: boolean;
  selectAll: boolean = false;
  displayModal: boolean = false;
  spellsArray: any[] = [];
  selectedPokemons: IPokemonCompare[] = [];

  // @ts-ignore
  @Input() element: IPokemon;

  constructor(
    private pokemonToCompareService: PokemonCompareService,
    private pokemonTableService: PokemonTableService,
    private pokemonDataService: PokemonDataService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  isCheckboxChecked(elementId: string): boolean {
    return !!this.selectedPokemons.find(
      (selectedPokemon) => selectedPokemon.id === elementId
    );
  }

  isCheckboxDisabled(elementId: string): boolean {
    return this.isCheckboxChecked(elementId)
      ? false
      : this.selectedPokemons.length === 2;
  }

  selectPokemonToCompare(
    isChecked: boolean,
    elementId: string,
    elementName: string
  ): void {
    if (isChecked) {
      this.pokemonToCompareService.selectPokemonToCompare(
        elementId,
        elementName
      );
    } else {
      this.pokemonToCompareService.removePokemonFromCompare(elementId);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.pokemonToCompareService.selectedPokemons$.subscribe(
      (selectedPokemons) => {
        this.selectedPokemons = selectedPokemons;
      }
    );
  }

  goToPokemonDetails(id: string): void {
    console.log(id);
    this.router.navigate([`/details/${id}`]);
  }

  pokemonAbilitiesText(abilitiesArrayLength: number): string {
    let modalText = '';
    if (abilitiesArrayLength > 2) {
      modalText = `${abilitiesArrayLength - 1} more abilities`;
    } else if (abilitiesArrayLength == 2) {
      modalText = `${abilitiesArrayLength - 1} more ability`;
    }
    return modalText;
  }

  showModalDialog(abilitiesArray: any[]) {
    this.displayModal = true;
    this.spellsArray = [];
    abilitiesArray.forEach((ability) => {
      this.spellsArray.push(ability);
    });
  }

  loadPokemons(event: LazyLoadEvent) {
    this.loading = true;
    this.lowerBound = event?.first;
    this.pokemonArray = [];
    this.sub = this.pokemonTableService
      .getPokemons(this.lowerBound, this.rowsNumber)
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
