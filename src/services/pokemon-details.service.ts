import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonDetails } from 'src/app/interfaces/IPokemon-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsService {
  constructor(private http: HttpClient) {}

  getPokemonDetails(id: string) {
    return this.http.get<IPokemonDetails>(environment.apiUrl + `pokemon/${id}`);
  }
}
