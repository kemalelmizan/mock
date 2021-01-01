const { run, exit, args, watchFs } = Deno

const cmd = ["deno", "run", "--allow-net", "--allow-read", "server.ts", ...args]

let p = run({
    cmd,
});

console.log(p)

const watcher = watchFs(".");
for await (const event of watcher) {
    p.close()
    console.log(event);
    p = run({
        cmd,
    });
}
