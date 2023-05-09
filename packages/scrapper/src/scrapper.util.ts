import { load } from 'cheerio';

const getGenerationUrl = (generation = 1) =>
  `https://pokemondb.net/pokedex/stats/gen${generation}`;

export const scrapper = async () => {
  const response = await fetch(getGenerationUrl());

  const html = await response.text();

  const tree = load(html);

  tree('table#pokedex tbody tr').each((index, element) => {
    const imageUrl = tree(element).find('td.cell-num span img').attr('src');
    const number = tree(element).find('td.cell-num').find('span').eq(1).text();
    const name = tree(element).find('td.cell-name a.ent-name').text();
    const hp = tree(element).find('td.cell-num').eq(1).text();
    const attack = tree(element).find('td.cell-num').eq(2).text();
    const defense = tree(element).find('td.cell-num').eq(3).text();
    const spAttack = tree(element).find('td.cell-num').eq(4).text();
    const spDefense = tree(element).find('td.cell-num').eq(5).text();
    const speed = tree(element).find('td.cell-num').eq(6).text();
    const total = tree(element).find('td.cell-total').text();
  });
};
