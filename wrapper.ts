import { parse } from "https://deno.land/std/flags/mod.ts";

const { cwd, exit, run, args, watchFs } = Deno

const cmd = ["deno", "run", "--allow-net", "--allow-read", "server.ts", ...args]
const carg = parse(args)?.["c"]

if (carg && typeof carg !== "string") {
    const api = `${cwd()}\\api.ts`
    console.log(`Opening ${api}`)
    try {
        run({ cmd: ["${EDITOR:-${VISUAL:-code}}", api] })
        run({ cmd: ["code", api] })
    } catch (error) {
        console.error("Some error occured: ", error)
    }
    exit()
}

let process = run({ cmd })
const watcher = watchFs(".");
let reloading = false;

for await (const event of watcher) {
    if (!reloading && event.kind === "modify") {
        reloading = true;
        console.log("Reloading", process);
        process.close();
        try {
            process = run({ cmd });
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => reloading = false, 1500)
    }
}
