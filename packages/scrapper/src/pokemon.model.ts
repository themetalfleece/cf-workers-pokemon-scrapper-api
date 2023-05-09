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

export const setPokemon = (namespace: KVNamespace, pokemon: PokemonI) => {
  return namespace.put(pokemon.name.toLowerCase(), JSON.stringify(pokemon));
};
