# mock

No-dependency api server in your local machine with 1 file route configuration.
Live-reloads the mock server if API config changes.

## Prerequisite
[Deno 1.6.x](https://deno.land/#installation)

## Installation
```
git clone https://github.com/kemalelmizan/mock.git
echo "function mock() { cd $(pwd)/mock && deno run --allow-read --allow-run ./wrapper.ts \$@ || cd -; }" >> ~/.bashrc # or ~/.zshrc
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
- [ ] documentation
