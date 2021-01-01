# mock

## Prerequisite
[Deno 1.6.x](https://deno.land/#installation)

## Installation
```
git clone https://github.com/kemalelmizan/mock.git
echo "alias mock=\"cd $(pwd)/mock && deno run --allow-read --allow-run ./wrapper.ts\"" >> ~/.bashrc # or ~/.zshrc
source ~/.bashrc # or ~/.zshrc
```

## Usage

### Opening `api.ts`
```
mock -c
```

### Running server
```
mock
```
Test by curl-ing ping endpoint on another terminal window
```
curl localhost:8080/ping
```

## Checklist
- [x] mocking api.ts
- [x] live-reload with wrapper
- [x] open api.ts file
- [ ] documentation
