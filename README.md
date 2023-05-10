# Cloudflare Workers Pokemon Scraper & API

## Description
This is an example project of a web scraper which runs with a cron job on Cloudflare Workers, and an API worker which accompanies it.

Upon scraping data, they get inserted to a KV namespace so they are on the edge and easily available.

Then, the API worker is ready to fetch data from that KV namespace and serve them. It also lives on the edge, offering blazingly fast response times. Cloudflare cache is also used per request.

Given that both workers are on the edge and get executed only when needed, this project scales very well.

Typescript was used for both workers.

## Cloudflare Setup

1. Create a `POKEMON` KV namespace: `wrangler kv:namespace create "POKEMON"` and `wrangler kv:namespace create POKEMON --preview`.
2. Replace the keys in the `packages/scraper/wrangler.toml` and `packages/api/wrangler.toml` files with the ones you got from these commands.
3. Head to each project's README.

## Example API usage

[https://poke-api.athanasoglou.gr/?name=raikou](https://poke-api.athanasoglou.gr/?name=raikou)

For Pokemon with symbols, spaces, etc, you can use a slug like:

[https://poke-api.athanasoglou.gr/?name=iron-moth](https://poke-api.athanasoglou.gr/?name=iron-moth)

[https://poke-api.athanasoglou.gr/?name=mr-mine](https://poke-api.athanasoglou.gr/?name=mr-mine)

## Running commands

You can run package commands directly from the root directory, like:
```
yarn api dev
```
or
```
yarn scraper deploy
```
