import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemon } from 'src/app/interfaces/IPokemon';
import { IPokemonApiResponse } from 'src/app/interfaces/IPokemon-api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonTableService {
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<IPokemonApiResponse> {
    return this.http.get<IPokemonApiResponse>(
      environment.apiUrl + `pokemon/?offset=0&limit=10`
    );
  }
}
