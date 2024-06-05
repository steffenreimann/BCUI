import sass from "rollup-plugin-sass";
import { terser } from "rollup-plugin-terser";

const dev = {
  input: "src/script/index.js",
  external: ['moment'],
  output: {
    name: "bcui",
    file: "dist/bcui.js",
    format: 'cjs',
    external: ['moment'],
    sourcemap: true,
    format: "iife",
  },
  plugins: [
    sass({
      output: true,
    }),
  ],
};
const prod = {
  input: "src/script/index.js",
  output: {
    name: "bcui",
    file: "dist/bcui.min.js",
    sourcemap: true,
    format: "iife",
  },
  plugins: [
    sass({
      output: true,
      options: {
        outputStyle: "compressed",
      },
    }),
    terser(),
  ],
};

export default [dev, prod];
