import { serve } from "https://deno.land/std/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const { cwd, args } = Deno;
const { api } = await import(
  `file:///${parse(args)?.["c"] ?? `${cwd()}/api.ts`}`
);

const server = serve({ hostname: api.hostname, port: api.port });
// const server = Deno.listenTls({
//   hostname: api.hostname,
//   port: api.port,
//   alpnProtocols: ["h2", "http/1.1"],
// });
console.log(api, args);
const decoder = new TextDecoder();

for await (const request of server) {
  const bodyBuf = await Deno.readAll(request.body);
  const requestBody = decoder.decode(bodyBuf);
  let requestBodyObject:any = requestBody;
  try {
    requestBodyObject = JSON.parse(requestBody)
  }
  catch(e){
    console.log(e)
  }

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

  // filter routes with same URL and methods
  const routesWithSameURLMethods = api.routes.filter(
    (route: { url: string; method: string }) =>
      route.method === request.method && route.url === request.url
  );

  let response = api?.not_found;

  if (routesWithSameURLMethods.length > 0) {
    let chosenRoute: any;
    let foundChosenRouteWithBody: boolean = false;

    routesWithSameURLMethods.map(
      (route: { url: string; method: string, body: string }) => {
        if (route.body && JSON.stringify(route.body) === JSON.stringify(requestBodyObject)) {
          foundChosenRouteWithBody = true;
          chosenRoute = route;
        }
      });
    if (!foundChosenRouteWithBody) chosenRoute = routesWithSameURLMethods.filter((route: { body: any }) => route.body === undefined)[0];

    response = chosenRoute === undefined
      ? api?.not_found
      : chosenRoute?.response;
  }

  response.headers = new Headers(Object
    .assign(response?.headers || {},
      api?.global?.headers))

  if (response.body)
    response.body =
      typeof response.body === "string"
        ? response.body
        : JSON.stringify(response.body) + "\n";

  console.log(`${new Date()}\n`,
    request.method, request.url, "\n",
    // decoder.decode(await Deno.readAll(request.r)), "\n",
    request.headers, "\n",
    requestBody, "\n",
    ">", response);
  request.respond({ ...response });
  // request.end()
}
