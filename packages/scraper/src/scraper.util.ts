import { Cheerio, load } from 'cheerio';
import { PokemonI } from '../../common/src/pokemon.model';

const MIN_GENERATION = 1;
const MAX_GENERATION = 9;

const getGenerationUrl = (generation = 1) =>
  `https://pokemondb.net/pokedex/stats/gen${generation}`;

const pasePokemonHtml = (html: string) => {
  const tree = load(html);

  return tree('table#pokedex tbody tr')
    .map((_, element) => {
      const subtext = tree(element).find('td.cell-name small').text();

      if (subtext) {
        // in case of a subtext (like a regional Forme), ignore this pokemon
        return null;
      }

      const imageUrl = tree(element).find('td.cell-num span img').attr('src');
      const number = tree(element)
        .find('td.cell-num')
        .find('span')
        .eq(1)
        .text();
      const name = tree(element).find('td.cell-name a.ent-name').text();
      const hp = tree(element).find('td.cell-num').eq(1).text();
      const attack = tree(element).find('td.cell-num').eq(2).text();
      const defense = tree(element).find('td.cell-num').eq(3).text();
      const spAttack = tree(element).find('td.cell-num').eq(4).text();
      const spDefense = tree(element).find('td.cell-num').eq(5).text();
      const speed = tree(element).find('td.cell-num').eq(6).text();
      const total = tree(element).find('td.cell-total').text();
      const type1 = tree(element).find('td.cell-icon').text();
      const type2 = tree(element).find('td.cell-icon').eq(1).text();

      return {
        number: +number,
        name,
        hp: +hp,
        attack: +attack,
        defense: +defense,
        spAttack: +spAttack,
        spDefense: +spDefense,
        speed: +speed,
        total: +total,
        imageUrl,
        types: [type1, type2].filter((type) => !!type),
      } satisfies PokemonI;
    })
    .filter((pokemon) => pokemon !== null);
};

const scrapGeneration = async (generation: number) => {
  const response = await fetch(getGenerationUrl(generation));

  const html = await response.text();

  return pasePokemonHtml(html);
};

export const scrapeAllPokemon = async () => {
  const generationPromises: Array<Promise<Cheerio<PokemonI>>> = [];

  for (let i = MIN_GENERATION; i <= MAX_GENERATION; i++) {
    generationPromises.push(scrapGeneration(i));
  }

  const allPokemon = (await Promise.all(generationPromises)).flatMap(
    (pokemon) => pokemon.toArray(),
  );

  return allPokemon;
};
