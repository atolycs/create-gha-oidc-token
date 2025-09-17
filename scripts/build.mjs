import esbuild from "esbuild";
import { sync } from "glob";

const entryPoints = sync("./src/*.ts", {
  ignore: ["./src/**/*.d.ts"],
});

await esbuild.build({
  bundle: true,
  outdir: "./dist",
  platform: "node",
  logLevel: "info",
  entryPoints,
});
