
## Cloudflare Setup

1. Create a `POKEMON` KV namespace: `wrangler kv:namespace create "POKEMON"` and `wrangler kv:namespace create POKEMON --preview`.
2. Replace the keys in `packages/scrapper/wrangler.toml` file with the ones you got from these commands.
