import slug from 'slug';

export interface PokemonI {
  number: number;
  name: string;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  total: number;
  imageUrl: string | undefined;
}

export const getPokemon = (namespace: KVNamespace, pokemonName: string) => {
  return namespace.get(slug(pokemonName));
};

export const setPokemon = (namespace: KVNamespace, pokemon: PokemonI) => {
  return namespace.put(slug(pokemon.name), JSON.stringify(pokemon));
};
