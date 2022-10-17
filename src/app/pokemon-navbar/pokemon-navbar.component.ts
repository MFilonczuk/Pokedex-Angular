import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../interfaces/IPokemon';

@Component({
  selector: 'app-pokemon-navbar',
  templateUrl: './pokemon-navbar.component.html',
  styleUrls: ['./pokemon-navbar.component.css'],
})
export class PokemonNavbarComponent implements OnInit {
  pageTitle: string = 'POKEDEX';
  pokemonName: string = '';
  pokemon: IPokemon = {
    id: '',
    name: '',
    img: '',
    type: '',
    abilities: [],
  };
  pokemonArray: IPokemon[] = [];

  constructor() {}

  ngOnInit(): void {}

  findPokemon(name: string): void {
    // this.pokemon = {
    //   id: '',
    //   name: '',
    //   img: '',
    //   type: '',
    //   abilities: [],
    // };
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.pokemon.name = data.forms[0].name;
    //     this.pokemon.img = data.sprites.front_default;
    //     this.pokemon.type = data.types[0].type.name;
    //     this.pokemon.abilities = data.abilities;
    //     this.pokemonArray.push(this.pokemon);
    //   })
    //   .catch((error) => console.log(error));
    // fetch(`https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.results[0].url);
    //     const url = data.results[0].url;
    //     fetch(url)
    //       .then((rep) => rep.json())
    //       .then((bigData) => {
    //         console.log(bigData);
    //       });
    //   });
    // console.log(this.pokemonArray);
  }
}
