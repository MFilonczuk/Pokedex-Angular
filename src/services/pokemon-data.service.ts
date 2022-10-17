import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon } from 'src/app/interfaces/IPokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  constructor(private http: HttpClient) {}

  getPokemonsData(url: string) {
    return this.http.get<IPokemon>(url);
  }
}
