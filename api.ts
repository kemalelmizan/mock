export const api = {
  "hostname": "localhost",
  "port": 8080,
  "routes": [
    {
      "method": "GET",
      "url": "/test",
      "response": {
          "status": 200,
          "body": ["ssass"],
      },
    },
  ],
  "not_found": {
    "status": 404,
    "body": "not found",
  },
}
