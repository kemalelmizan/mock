export const api = {
  "hostname": "localhost",
  "port": 8080,
  "routes": [
    {
      "method": "GET",
      "url": "/ping",
      "response": {
          "status": 200,
          "body": "pong",
      },
    },
  ],
  "not_found": {
    "status": 404,
    "body": "not found",
  },
}
