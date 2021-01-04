export const api = {
  hostname: "localhost",
  port: 8080,
  global: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "content-type": "application/json; charset=utf-8",
    },
  },
  routes: [
    {
      method: "GET",
      url: "/ping",
      response: {
        status: 200,
        body: "pong",
      },
    },
  ],
  not_found: {
    status: 404,
    body: "not found",
  },
};
