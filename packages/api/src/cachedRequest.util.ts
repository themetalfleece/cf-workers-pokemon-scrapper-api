/** try to fetch the response to the given request from cache */
export const getCachedResponse = async (request: Request) => {
  const cacheUrl = new URL(request.url);

  const cacheKey = new Request(cacheUrl.toString(), request);
  const cache = caches.default;

  return {
    cache,
    cacheKey,
    response: await cache.match(cacheKey),
  };
};

/** set the required headers to the response to cache the data */
export const setCacheHeaders = (response: Response, maxAge = 10) => {
  response.headers.append('Cache-Control', `s-maxage=${maxAge}`);
};

/** wait until cache is set before proceeding */
export const cacheWaitUntil = (
  cache: Cache,
  ctx: ExecutionContext,
  cacheKey: Request,
  response: Response,
) => {
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
};
