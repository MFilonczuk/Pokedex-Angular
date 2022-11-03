import { BehaviorSubject } from 'rxjs';
import { IPokemonCompare } from '../app/interfaces/IPokemonCompare';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonCompareService {
  private selectedPokemons = new BehaviorSubject<IPokemonCompare[]>([]);

  selectedPokemons$ = this.selectedPokemons.asObservable();

  selectPokemonToCompare(id: string, name: string): void {
    const selectedPokemons = this.selectedPokemons.getValue();
    if (selectedPokemons.length == 2) return;

    selectedPokemons.push({ id, name });
    this.selectedPokemons.next(selectedPokemons);
  }

  removePokemonFromCompare(id: string): void {
    const selectedPokemons = this.selectedPokemons.getValue();
    const newSelectedPokemons = selectedPokemons.filter(
      (selectedPokemons: any) => selectedPokemons.id !== id
    );
    this.selectedPokemons.next(newSelectedPokemons);
    console.log(selectedPokemons);
  }
}
