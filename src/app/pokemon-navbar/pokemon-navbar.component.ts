import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-navbar',
  templateUrl: './pokemon-navbar.component.html',
  styleUrls: ['./pokemon-navbar.component.css'],
})
export class PokemonNavbarComponent implements OnInit {
  pageTitle: string = 'POKEDEX';

  constructor() {}

  ngOnInit(): void {}
}
