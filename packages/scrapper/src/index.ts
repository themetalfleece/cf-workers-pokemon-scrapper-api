import { setPokemon } from './pokemon.model';
import { scrapeAllPokemon } from './scrapper.util';

export interface Env {
  POKEMON: KVNamespace;
}

export default {
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<void> {
    const allPokemon = await scrapeAllPokemon();

    await Promise.all(
      allPokemon.map((pokemon) => setPokemon(env.POKEMON, pokemon)),
    );
  },
};
