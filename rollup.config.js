import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "src/main.js",
  output: {
    file: "./dist/web-front-end-record.js",
    format: "cjs",
  },
  plugins: [
    json(),
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),
    babel({
      exclude: "node_modules/**",
    }),
  ],
  external: [],
};
