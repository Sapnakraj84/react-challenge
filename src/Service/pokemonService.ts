import {  useQuery } from '@tanstack/react-query'; // Or 'react-query' for older versions
import { POKEMON_URL,MAX_LIMIT } from 'Constants/pokemonConstant';
import { IPokemon, IPokemonAbility, IPokemonDetails } from 'Interface/pokemonModel';

// Fetch list of pokemons with limit and offset  
const fetchPokemons = async (context: { queryKey: [string, number, number] }) => {
  const [_, limit, offset] = context.queryKey;
  const response = await fetch(POKEMON_URL + "limit=" + limit + "&offset=" + offset);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  // Assigning unique IDs to each pokemon based on their index
  const newData = {
    ...data,
    count: Math.min(data.count, MAX_LIMIT), //We are restricting the count to 250 to match the sample image
    results: data.results.map((item: IPokemon, index: number) => ({
      ...item,
      id: `${item.name}-${index + 1}`,
    })),
  };
  return newData;
};

export const usePokemons = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pokemons', limit, offset],
    queryFn: fetchPokemons,
    placeholderData: (previousData) => previousData
  });
};

const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: IPokemonDetails = await response.json();
  // Fetch and assign descriptions to each ability
  // using promise.all to handle multiple async calls
  if (data.abilities && data.abilities.length > 0) {
    await Promise.all(
      data.abilities.map(async (element: IPokemonAbility) => {
        const abilityData = await fetchPokemonAbilities(element.ability.url);
        element.ability.description = abilityData.effect;
      })
    );
  }
  //adding description to each ability and assigning unique ids
  const newData = {
    ...data,
    abilities: data.abilities.map((item: IPokemonAbility, index: number) => ({
      ...item,
      ability: {
        ...item.ability,
        description: item.ability.description || 'No description available',
      },
      id: `${item.ability.name}-${index + 1}`,
    })),
  };
  return newData;
};

export const usePokemonDetails = (url: string) => {
  return useQuery({
    queryKey: ['pokemonDetails', url],
    queryFn: () => fetchPokemonDetails(url),
  });
};

const fetchPokemonAbilities = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const pokemonAbilitiesData = await response.json();
  const newData = {
    effect: pokemonAbilitiesData.effect_entries.find((entry: any) => entry.language.name === 'en')?.effect || 'No effect description available',
  };
  return newData;
};

export const usePokemonAbilities = (url: string) => {
  return useQuery({
    queryKey: ['pokemonAbilities', url],
    queryFn: () => fetchPokemonAbilities(url),
  });
};