import { parse } from "https://deno.land/std/flags/mod.ts";
import { existsSync } from "https://deno.land/std/fs/exists.ts";

const { build, env, cwd, exit, run, args, watchFs } = Deno;

const cmd = [
  "deno",
  "run",
  "--allow-net",
  "--allow-read",
  "server.ts",
  ...args,
];
const carg = parse(args)?.["c"];

if (carg && typeof carg !== "string") {
  const api = `${cwd()}/api.ts`;
  console.log(`Opening ${api}`);
  try {
    run({ cmd: ["code", api] });
  } catch (error) {
    if (/^NotFound/.test(String(error))) {
      console.warn("code not found in path, opening with default editor...");
      const editor =
        env.get("VISUAL") ||
        env.get("EDITOR") ||
        (/windows/.test(build.target) &&
        !existsSync("C:\\Program Files\\Git\\usr\\bin\\vim.exe")
          ? "notepad"
          : "vim");
      try {
        run({ cmd: [editor, api] });
      } catch (error) {
        console.error(editor, error);
      }
    }
  }
  exit();
}

let process = run({ cmd });
const watcher = watchFs([".", ...(carg ? [carg] : [])]);
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
    setTimeout(() => (reloading = false), 1500);
  }
}
