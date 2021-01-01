import { serve } from "https://deno.land/std/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const { args } = Deno
const { api } = await import(parse(args)?.["c"] ?? "./api.ts")

const server = serve({ hostname: api.hostname, port: api.port });
console.log(api, args);

for await (const request of server) {
  const route = api.routes.filter((route: {
    url: string;
    method: string;
  }) => route.method === request.method && route.url === request.url)
  const response = route.length === 0 ? api?.not_found : route?.[0]?.response;
  response.body = typeof response.body === "string" ? response.body : JSON.stringify(response.body)
  console.log(`${new Date()}`, request.method, request.url, '>', response);
  request.respond({ ...response })
}
