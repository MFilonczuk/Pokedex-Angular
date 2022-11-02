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

export interface IPokemonCompareDetails {
  id: number;
  name: string;
  abilities: string[];
  baseExperience: number;
  height: number;
  weight: number;
  stats: Stat[];
  types: string[];
  sprite?: string | null;
}

export interface Stat {
  name: string;
  stat: number;
}
