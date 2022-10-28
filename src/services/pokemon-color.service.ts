import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonColorService {
  private colorType: any = {
    normal: '#97966d',
    fire: '#ef6b06',
    water: '#618ff3',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
  };

  getColor(type: string): string {
    return this.colorType[type] || '#727171';
  }
}
