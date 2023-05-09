# scrapper

### Install dependencies
Run `yarn`.

### Run locally
Run `wrangler dev --local`.
To triggered the scheduled event, run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"`.

### Publish

Run `wrangler publish --name pokemon-database-scrapper`.

## Cloudflare Setup

- Create a `POKEMON` KV namespace.
