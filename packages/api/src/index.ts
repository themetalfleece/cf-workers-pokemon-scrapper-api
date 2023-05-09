import {
  cacheWaitUntil,
  getCachedResponse,
  setCacheHeaders,
} from './cachedRequest.util';
import { getPokemon } from '../../common/src/pokemon.model';

const cacheSeconds = 60 * 60 * 24;

export interface Env {
  POKEMON: KVNamespace;
}

const handler = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const cacheData = await getCachedResponse(request);
    let { response } = cacheData;
    const { cacheKey, cache } = cacheData;

    const params = new URL(request.url).searchParams;
    const pokemonName = params.get('name');

    if (!pokemonName) {
      return new Response(
        'No pokemon name provided via search params. Please use it with the format ?name=raikou',
        {
          status: 400,
        },
      );
    }

    if (!response) {
      const pokemonData = await getPokemon(env.POKEMON, pokemonName);
      console.log(pokemonData);

      if (!pokemonData) {
        return new Response(`Pokemon ${pokemonName} not found`, {
          status: 404,
        });
      }

      response = new Response(pokemonData, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });

      setCacheHeaders(response, cacheSeconds);

      cacheWaitUntil(cache, ctx, cacheKey, response);
    }

    return response;
  },
};

export default handler;
