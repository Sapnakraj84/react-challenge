export interface IPokemons {
  count: number;
  next: string;
  previous: string | null;
  results: Array<IPokemon>;
}

export interface IPokemon {
    id: number|null;
    name: string;
    url: string;
}
export interface IPokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: Array<IPokemonAbility>;
    selectedPokemonAbility : Array<IPokemonAbility>| null;
}

export interface IPokemonAbility {
    ability: {
        name: string;
        url: string;
        effect: string | null;
        description : string |null;
    };
    ishidden: boolean;
    slot: number;
}