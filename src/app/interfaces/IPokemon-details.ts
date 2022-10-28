export interface IPokemonDetails {
  id: string;
  name: string;
  img: string;
  type: string;
  abilities: spellsArray[];
  hp: string;
  atk: string;
  def: string;
  weight: string;
  xp: string;
}

export interface spellsArray {
  ability: any;
}

export interface IPokemonCompare {
  PokemonCompareArray: IPokemonDetails[];
}
