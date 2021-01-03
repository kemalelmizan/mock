import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";

const { test, run } = Deno;

test({
  name: "mock -c",
  async fn() {
    const p = run({
      cmd: ["deno", "run", "--allow-all", "wrapper.ts", "-c"],
      stdout: "piped",
    });
    const status = await p.status();
    const output = String.fromCharCode.apply(null, [...(await p.output())]);
    console.log(p, status, output);
    p.close();
    assertEquals(status.success, true);
    assertStringIncludes(output, "Opening");
  },
});
