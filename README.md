# mock
![ci](https://github.com/kemalelmizan/mock/workflows/ci/badge.svg?branch=main)


No-dependency api server in your local machine with 1 file route configuration.
Live-reloads the mock server if API config changes.

## Prerequisite
[Deno 1.6.x](https://deno.land/#installation)

## Installation
```
git clone https://github.com/kemalelmizan/mock.git
cp mock/api_sample.ts mock/api.ts
echo "function mock() { cd $(pwd)/mock && deno run --allow-env --allow-read --allow-run ./wrapper.ts \$@ || cd -; }" >> ~/.bashrc # or ~/.zshrc
source ~/.bashrc # or ~/.zshrc
```

## Usage

### Opening `api.ts`
```
mock -c
```

### Running server
Using default `api.ts` in project directory
```
mock
```
Using custom `api.ts`
```
mock -c /path/to/api.ts
```
Test by curl-ing ping endpoint on another terminal window
```
curl localhost:8080/ping
```

## Todo
- [x] mocking api.ts
- [x] live-reload with wrapper
- [x] open `api.ts` file
- [x] use custom `api.ts` file
- [x] use custom body matcher with fallback
- [ ] use custom header matcher with fallback
- [ ] use [`deno bundle`](https://deno.land/manual@v1.6.3/tools/bundler) and [`deno install`](https://deno.land/manual/tools/script_installer) instead of appending to .bashrc
- [ ] documentation

## License
[MIT](./LICENSE)
