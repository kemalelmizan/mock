import { serve } from "https://deno.land/std/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const { cwd, args } = Deno;
const { api } = await import(
  `file:///${parse(args)?.["c"] ?? `${cwd()}/api.ts`}`
);

const server = serve({ hostname: api.hostname, port: api.port });
console.log(api, args);

for await (const request of server) {

  // preflight
  if (request.method === "OPTIONS") {
    request.respond({
      headers: new Headers({
        ...api?.global?.headers,
      }),
      status: 204,
    });
    continue;
  }

  const route = api.routes.filter(
    (route: { url: string; method: string }) =>
      route.method === request.method && route.url === request.url
  );
  const response = route.length === 0 ? api?.not_found : route?.[0]?.response;
  response.body =
    typeof response.body === "string"
      ? response.body
      : JSON.stringify(response.body) + "\n";
  response.headers = new Headers({
    ...api?.global?.headers,
    ...response.headers,
  });
  console.log(`${new Date()}`, request.method, request.url, ">", response);
  request.respond({ ...response });
}
