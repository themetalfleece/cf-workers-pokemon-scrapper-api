import { scrapper } from './scrapper.util';

export interface Env {
  POKEMON: KVNamespace;
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    await scrapper();
  },
};
